import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useSubmit } from "../hooks/useSubmit";
import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";
import SectionHeading from "../components/SectionHeading";
import FadeIn from "../components/FadeIn";

const MAPS_URL = "https://maps.app.goo.gl/CVupFTzgSk3Diy7p8";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3531815236306!2d-69.82783992399423!3d18.467654670786864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87eb62dd5dc9%3A0x122a3ca21abfed08!2sCentro%20Educativo%20Villa%20de%20Angeles!5e0!3m2!1sen!2sdo!4v1735766717122!5m2!1sen!2sdo";

interface FormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

const emptyForm: FormData = {
  name: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const { handleSubmit, isSubmitting, submitStatus } = useSubmit<FormData>();
  const STAGE = import.meta.env.VITE_STAGE;
  const { t } = useTranslation("contact");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit({
      url: `${import.meta.env.VITE_BASE_EMAIL_ENDPOINT}/${STAGE}/email-handler-${STAGE}`,
      formData,
      formSource: "contacto",
      onSuccess: () => {
        setFormData(emptyForm);
      },
    });
  };

  const fieldClass =
    "mt-1 block w-full border-0 border-b border-blue-900/40 bg-transparent px-1 py-2 text-sm text-blue-950 outline-none transition-colors focus:border-amber-500";

  return (
    <div className="pb-28 md:pb-32">
      <section className="relative h-64 w-full md:h-80 lg:h-96">
        <iframe
          title="Google Maps"
          src={MAP_EMBED}
          className="h-full w-full border-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-amber-500 px-4 py-2 text-sm font-semibold text-blue-900 shadow-md transition-colors hover:bg-amber-400"
        >
          <i className="fas fa-map-location-dot" aria-hidden />
          {t("openInMaps")}
        </a>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <FadeIn>
          <SectionHeading title={t("title")} icon="fa-address-book" />
        </FadeIn>

        <FadeIn delayMs={80}>
          <ul className="mb-10 space-y-4">
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-location-dot" />
              </span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed transition-colors hover:text-blue-800"
              >
                {FULL_ADDRESS}
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-phone" />
              </span>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}
                className="leading-relaxed transition-colors hover:text-blue-800"
              >
                {PHONE_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-envelope" />
              </span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="leading-relaxed transition-colors hover:text-blue-800"
              >
                {EMAIL_ADDRESS}
              </a>
            </li>
          </ul>
        </FadeIn>

        <FadeIn delayMs={140}>
          <form
            onSubmit={onSubmit}
            className="relative space-y-6 border border-amber-700/20 bg-[#fbf7f0] px-5 py-8 shadow-[0_18px_50px_-28px_rgba(30,58,138,0.45)] md:px-8 md:py-10"
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5 bg-amber-500"
              aria-hidden
            />
            <h2 className="font-title text-xl font-bold text-blue-900 md:text-2xl">
              {t("formTitle")}
            </h2>

            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-blue-900"
              >
                {t("form.name")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-blue-900"
              >
                {t("form.phone")} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="text-sm font-medium text-blue-900"
              >
                {t("form.subject")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-blue-900"
              >
                {t("form.message")} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`${fieldClass} resize-y`}
              />
            </div>

            {submitStatus === "success" && (
              <div className="text-center text-green-700">
                {t("successMessage")}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-center text-red-600">
                {t("errorMessage")}
              </div>
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
        </FadeIn>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default Contact;
