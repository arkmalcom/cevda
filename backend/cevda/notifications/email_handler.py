import json
import boto3
from botocore.exceptions import ClientError
import os
from typing import Dict, Any


def validate_email_data(data: Dict[str, Any]) -> bool:
    """Validate required fields in the email data."""
    required_fields = ["name", "phone", "subject", "message"]
    return all(field in data and data[field] for field in required_fields)


def send_email(data: Dict[str, Any]) -> Dict[str, Any]:
    """Send email using AWS SES."""
    SENDER = os.environ["SENDER_EMAIL"]
    RECIPIENT = os.environ["RECIPIENT_EMAIL"]

    ses = boto3.client("ses")

    try:
        response = ses.send_email(
            Source=SENDER,
            Destination={"ToAddresses": [RECIPIENT]},
            Message={
                "Subject": {"Data": f"New Contact Form Submission: {data['subject']}"},
                "Body": {
                    "Text": {
                        "Data": f"""
New message from contact form:

Name: {data["name"]}
Phone: {data["phone"]}
Subject: {data["subject"]}

Message:
{data["message"]}
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
    try:
        body = json.loads(event["body"])

        if not validate_email_data(body):
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing required fields"}),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "POST",
                },
            }

        result = send_email(body)

        result["headers"] = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST",
        }

        return result

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Invalid JSON body"}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST",
            },
        }
