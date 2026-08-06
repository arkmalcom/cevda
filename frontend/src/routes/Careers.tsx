import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import useRecaptcha from "../hooks/useRecaptcha";
import SectionHeading from "../components/SectionHeading";
import FadeIn from "../components/FadeIn";

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
          `${import.meta.env.VITE_BASE_EMAIL_ENDPOINT}/${STAGE}/email-handler-${STAGE}`,
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
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-blue-900">
          {t("form.uploadLabel")}
        </span>
        <div className="flex flex-col items-center gap-3 border border-dashed border-amber-600/40 bg-amber-500/5 px-4 py-8 transition-colors hover:border-amber-500 hover:bg-amber-500/10 sm:flex-row sm:justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-blue-900">
            <i className="fas fa-file-arrow-up text-lg" aria-hidden />
          </span>
          <div className="text-center sm:text-left">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="block w-full max-w-xs text-sm text-slate-600 file:mr-3 file:border-0 file:bg-amber-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-900 hover:file:bg-amber-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              {t("form.uploadHint")}
            </p>
          </div>
        </div>
      </label>

      {selectedFile && (
        <p className="flex items-center justify-center gap-2 text-sm text-blue-800">
          <i className="fas fa-paperclip" aria-hidden />
          {selectedFile.name}
        </p>
      )}

      {submitStatus === "success" && (
        <div className="text-center text-green-700">
          {t("form.successMessage")}
        </div>
      )}
      {submitStatus === "error" && (
        <div className="text-center text-red-600">{t("form.errorMessage")}</div>
      )}

      <button
        type="submit"
        className="w-full bg-amber-500 px-4 py-3 text-sm font-semibold tracking-wide text-blue-900 transition-colors hover:bg-amber-400 disabled:opacity-50 md:text-base"
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
    <div className="pb-28 md:pb-32">
      <section className="chalkboard relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0, transparent 35%)",
          }}
        />
        <FadeIn>
          <SectionHeading
            title={t("careers.title")}
            icon="fa-briefcase"
            className="chalkboard-heading mx-auto max-w-3xl"
          />
        </FadeIn>
        <FadeIn delayMs={100}>
          <p className="relative mx-auto max-w-3xl text-center text-base leading-relaxed text-amber-50/95 md:text-lg">
            {t("careers.description")}
          </p>
        </FadeIn>
      </section>

      <div className="relative mx-auto -mt-8 max-w-xl px-4 md:-mt-10">
        <FadeIn delayMs={160}>
          <div className="border border-amber-700/20 bg-[#fbf7f0] px-5 py-8 shadow-[0_18px_50px_-28px_rgba(30,58,138,0.45)] md:px-8 md:py-10">
            <div className="mb-6 h-1.5 w-full bg-amber-500" aria-hidden />
            <h2 className="mb-2 text-center font-title text-xl font-bold text-blue-900 md:text-2xl">
              {t("form.sectionTitle")}
            </h2>
            <p className="mb-6 text-center text-sm text-slate-600">
              {t("form.sectionSubtitle")}
            </p>
            <GoogleReCaptchaProvider
              reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}
            >
              <CareerForm />
            </GoogleReCaptchaProvider>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Careers;
