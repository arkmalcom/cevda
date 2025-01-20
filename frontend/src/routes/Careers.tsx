import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import useRecaptcha from "../hooks/useRecaptcha";

import careers from "../assets/careers/careers.jpg";

const CareerForm: React.FC = () => {
  const { t } = useTranslation("careers");
  const STAGE = import.meta.env.VITE_STAGE;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const { verifyRecaptcha } = useRecaptcha();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!selectedFile) {
      alert(t("form.noFileSelected"));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert(t("form.fileTooLarge"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64File = (reader.result as string).split(",")[1];

      try {
        const captchaToken = await verifyRecaptcha();

        if (!captchaToken) {
          throw new Error("reCAPTCHA verification failed");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/${STAGE}/email-handler-${STAGE}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              formSource: "carreras",
              captchaToken,
              file: base64File,
              filename: selectedFile.name,
            }),
          },
        );

        const responseData = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          return responseData;
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 items-center text-center"
    >
      <input
        type="file"
        accept=".pdf, .docx"
        onChange={handleFileChange}
        className="block w-full text-center"
      />
      {submitStatus === "success" && (
        <div className="text-green-600 text-center">
          {t("form.successMessage")}
        </div>
      )}
      {submitStatus === "error" && (
        <div className="text-red-600 text-center">{t("form.errorMessage")}</div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-2 w-52 mx-auto disabled:opacity-50 hover:bg-blue-600 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t("submitting", { ns: "common" })
          : t("submit", { ns: "common" })}
      </button>
    </form>
  );
};

const Careers: React.FC = () => {
  const { t } = useTranslation("careers");

  return (
    <div>
      <div className="flex max-lg:flex-col max-lg:space-y-2 lg:space-x-2 p-1 text-justify">
        <div className="flex flex-col space-y-2 rounded-md border-amber-500 border-2 p-1 lg:w-1/2">
          <h1 className="text-center text-3xl text-blue-800">
            {t("careers.title")}
          </h1>
          <img src={careers} alt="careers" className="w-auto h-1/2 mx-auto" />
          <p>{t("careers.description")}</p>
          <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}
          >
            <CareerForm />
          </GoogleReCaptchaProvider>
        </div>
        <div className="rounded-md border-amber-200 bg-amber-500 border-2 p-1">
          <h1>{t("aboutUs.title")}</h1>
          <p>{t("aboutUs.description")}</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
