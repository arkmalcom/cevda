import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import useRecaptcha from "../hooks/useRecaptcha";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import Button from "../components/ui/Button";
import { ErrorNote, SuccessNote } from "../components/StarBurst";

const CareerForm: React.FC = () => {
  const { t } = useTranslation("careers");
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
      setIsSubmitting(false);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert(t("form.fileTooLarge"));
      setIsSubmitting(false);
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
          `${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/email`,
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

        if (response.ok) {
          setSubmitStatus("success");
          setSelectedFile(null);
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

    reader.onerror = () => {
      setSubmitStatus("error");
      setIsSubmitting(false);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="group block">
        <span className="field-label">{t("form.uploadLabel")}</span>
        <div className="mt-2 flex flex-col items-center gap-4 rounded-card border-2 border-dashed border-blue-900/25 bg-blue-50/60 px-4 py-8 transition-colors duration-200 group-focus-within:border-blue-900 hover-fine:border-blue-900/50 sm:flex-row sm:justify-center">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950">
            <i className="fas fa-file-arrow-up text-xl" aria-hidden />
          </span>
          <div className="text-center sm:text-left">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="block w-full max-w-xs text-[15px] text-ink file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white"
            />
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{t("form.uploadHint")}</p>
          </div>
        </div>
      </label>

      {selectedFile && (
        <p className="flex items-center justify-center gap-2 text-[15px] font-semibold text-blue-900">
          <i className="fas fa-paperclip" aria-hidden />
          {selectedFile.name}
        </p>
      )}

      {submitStatus === "success" && <SuccessNote>{t("form.successMessage")}</SuccessNote>}
      {submitStatus === "error" && <ErrorNote>{t("form.errorMessage")}</ErrorNote>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t("submitting", { ns: "common" }) : t("submit", { ns: "common" })}
      </Button>
    </form>
  );
};

const Careers: React.FC = () => {
  const { t } = useTranslation("careers");

  return (
    <div>
      <PageIntro title={t("careers.title")} stickers={["pencil", "plane"]} />

      <div className="relative mx-auto -mt-10 grid max-w-6xl gap-8 px-4 md:-mt-14 md:grid-cols-12 md:px-8">
        <Reveal className="sheet p-6 md:col-span-7 md:p-10">
          <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink md:text-lg">
            {t("careers.description")}
          </p>
        </Reveal>

        <Reveal delayMs={100} className="sheet p-6 md:col-span-5 md:p-8">
          <h2 className="font-display text-2xl font-extrabold text-blue-900 md:text-3xl">
            {t("form.sectionTitle")}
          </h2>
          <p className="mb-6 mt-2 text-[15px] text-[var(--ink-soft)]">{t("form.sectionSubtitle")}</p>
          <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}>
            <CareerForm />
          </GoogleReCaptchaProvider>
        </Reveal>
      </div>
    </div>
  );
};

export default Careers;
