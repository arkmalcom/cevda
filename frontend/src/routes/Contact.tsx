import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useSubmit } from "../hooks/useSubmit";
import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";

interface FormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { handleSubmit, isSubmitting, submitStatus } = useSubmit<FormData>();
  const STAGE = import.meta.env.VITE_STAGE;

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
        setFormData({ name: "", phone: "", subject: "", message: "" });
      },
    });
  };

  const { t } = useTranslation("contact");

  return (
    <div className="flex flex-col h-screen text-sm">
      <div className="flex-1">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3531815236306!2d-69.82783992399423!3d18.467654670786864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87eb62dd5dc9%3A0x122a3ca21abfed08!2sCentro%20Educativo%20Villa%20de%20Angeles!5e0!3m2!1sen!2sdo!4v1735766717122!5m2!1sen!2sdo"
          className="w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex flex-col p-1">
        <div className="flex-1 lg:pr-5 justify-center my-auto text-center">
          <p className="font-bold">{FULL_ADDRESS}</p>
          <p>
            {t("phone", { ns: "common" })}: {PHONE_NUMBER}
          </p>
          <p>
            {t("email", { ns: "common" })}: {EMAIL_ADDRESS}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex-1 lg:w-1/2 mx-auto">
          <form onSubmit={onSubmit} className="space-y-2">
            <div>
              <label htmlFor="name">{t("form.name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="phone">{t("form.phone")}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="subject">{t("form.subject")}</label>
              <textarea
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              ></textarea>
            </div>
            <div>
              <label htmlFor="message">{t("form.message")}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              ></textarea>
            </div>
            {submitStatus === "success" && (
              <div className="text-green-600 text-center">
                {t("successMessage")}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 text-center">
                {t("errorMessage")}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mt-2 w-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("submitting", { ns: "common" })
                  : t("submit", { ns: "common" })}
              </button>
            </div>
          </form>
        </div>
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
