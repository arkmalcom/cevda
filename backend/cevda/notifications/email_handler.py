import logging
import json
import os
import requests
from typing import Dict, Any

import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

DEFAULT_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
}


def validate_email_data(data: Dict[str, Any]) -> bool:
    """Validate required fields in the email data."""
    required_fields = ["name", "phone", "subject", "message", "captchaToken"]
    return all(field in data and data[field] for field in required_fields)


def is_valid_recaptcha(captcha_token: str) -> bool:
    """Validate reCAPTCHA v3 token with Google's API."""
    RECAPTCHA_SECRET_KEY = os.environ["RECAPTCHA_SECRET_KEY"]
    RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify"

    logger.info("Validating reCAPTCHA token...")

    try:
        response = requests.post(
            RECAPTCHA_URL,
            data={"secret": RECAPTCHA_SECRET_KEY, "response": captcha_token},
        )
        response_data = response.json()
        logger.info(f"reCAPTCHA response: {response_data}")

        success = response_data.get("success", False)
        score = response_data.get("score", 0)
        response_action = response_data.get("action", "")

        logger.info(
            f"reCAPTCHA v3 validation result - success: {success}, score: {score}, action: {response_action}"
        )

        return success and score >= 0.5
    except requests.RequestException as e:
        logger.error(f"Error validating reCAPTCHA: {e}")
        return False


def send_email(data: Dict[str, Any], source: str) -> Dict[str, Any]:
    """Send email using AWS SES with dynamic fields."""
    SENDER = os.environ["SENDER_EMAIL"]
    RECIPIENT = os.environ["RECIPIENT_EMAIL"]

    ses = boto3.client("ses")

    # Dynamically generate the message body
    message_body = "\n".join([f"{key}: {value}" for key, value in data.items()])

    try:
        response = ses.send_email(
            Source=SENDER,
            Destination={"ToAddresses": [RECIPIENT]},
            Message={
                "Subject": {
                    "Data": f"Nuevo Mensaje Del Formulario De {source.title()}"
                },
                "Body": {
                    "Text": {
                        "Data": f"""
Nuevo mensaje:

{message_body}
                        """
                    }
                },
            },
        )
        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Email sent successfully",
                    "messageId": response["MessageId"],
                }
            ),
        }
    except ClientError as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to send email", "error": str(e)}),
        }


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Main Lambda handler function."""
    if event["requestContext"]["http"]["method"] == "OPTIONS":
        logger.info("Received OPTIONS preflight request.")
        return {
            "statusCode": 200,
            "headers": DEFAULT_HEADERS,
            "body": "",
        }

    try:
        body = json.loads(event["body"])
        logger.info(f"Received notification email data: {body}")

        if not validate_email_data(body):
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing required fields"}),
                "headers": DEFAULT_HEADERS,
            }

        if not is_valid_recaptcha(body["captchaToken"]):
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Invalid reCAPTCHA token"}),
                "headers": DEFAULT_HEADERS,
            }

        email_source = body.get("source", "contacto")

        result = send_email(body, email_source)

        result["headers"] = DEFAULT_HEADERS
        logger.info(f"Email sent successfully: {result}")

        return result

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Invalid JSON body"}),
            "headers": DEFAULT_HEADERS,
        }
