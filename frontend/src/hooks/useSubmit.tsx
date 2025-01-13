import { useState } from "react";
import useRecaptcha from "./useRecaptcha";

export interface SubmitOptions<T> {
  url: string;
  formData: T;
  formSource: string;
  onSuccess?: (response: Response) => void;
  onError?: (error: unknown) => void;
}

export function useSubmit<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const { verifyRecaptcha } = useRecaptcha();

  const handleSubmit = async ({
    url,
    formData,
    formSource,
    onSuccess,
    onError,
  }: SubmitOptions<T>) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const captchaToken = await verifyRecaptcha();

      if (!captchaToken) {
        throw new Error("reCAPTCHA verification failed");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, formSource, captchaToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      onSuccess?.(response);
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitStatus("error");
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, submitStatus };
}
