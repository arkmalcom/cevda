import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useSubmit } from "../hooks/useSubmit";
import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import Button from "../components/ui/Button";
import { ErrorNote, SuccessNote } from "../components/StarBurst";

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

const fields: { id: keyof FormData; type: string; autoComplete?: string }[] = [
  { id: "name", type: "text", autoComplete: "name" },
  { id: "phone", type: "tel", autoComplete: "tel" },
  { id: "subject", type: "text" },
];

const ContactRow: React.FC<{ href: string; icon: string; children: React.ReactNode; external?: boolean }> = ({
  href,
  icon,
  children,
  external,
}) => (
  <li>
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group -mx-3 flex items-center gap-4 rounded-card px-3 py-2.5 text-[17px] text-ink transition-colors duration-200 hover-fine:bg-blue-50"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950 transition-transform duration-300 group-hover-fine:-rotate-12"
        aria-hidden
      >
        <i className={icon} />
      </span>
      <span className="min-w-0 break-words">{children}</span>
    </a>
  </li>
);

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const { handleSubmit, isSubmitting, submitStatus } = useSubmit<FormData>();
  const STAGE = import.meta.env.VITE_STAGE;
  const { t } = useTranslation("contact");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div>
      <PageIntro title={t("title")} stickers={["plane", "star"]} />

      <div className="relative mx-auto -mt-10 grid max-w-6xl gap-8 px-4 md:-mt-14 md:grid-cols-12 md:px-8">
        <Reveal className="flex flex-col gap-6 md:col-span-5">
          <div className="sheet p-6 md:p-8">
            <ul className="space-y-2">
              <ContactRow href={MAPS_URL} icon="fas fa-location-dot" external>
                {FULL_ADDRESS}
              </ContactRow>
              <ContactRow href={`tel:+1${PHONE_NUMBER.replace(/\D/g, "")}`} icon="fas fa-phone">
                {PHONE_NUMBER}
              </ContactRow>
              <ContactRow href={`mailto:${EMAIL_ADDRESS}`} icon="fas fa-envelope">
                {EMAIL_ADDRESS}
              </ContactRow>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-card shadow-sheet">
            <iframe
              title="Google Maps"
              src={MAP_EMBED}
              className="h-64 w-full border-0 md:h-80"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-3 right-3">
              <Button href={MAPS_URL} external variant="light" icon="fa-arrow-up-right-from-square">
                {t("openInMaps")}
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="md:col-span-7">
          <form onSubmit={onSubmit} className="sheet space-y-5 p-6 md:p-10">
            <h2 className="font-display text-2xl font-extrabold text-blue-900 md:text-3xl">
              {t("formTitle")}
            </h2>

            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="field-label">
                  {t(`form.${field.id}`)} <span className="text-red-600">*</span>
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  autoComplete={field.autoComplete}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="field-label">
                {t("form.message")} <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="field resize-y"
              />
            </div>

            {submitStatus === "success" && <SuccessNote>{t("successMessage")}</SuccessNote>}
            {submitStatus === "error" && <ErrorNote>{t("errorMessage")}</ErrorNote>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? t("submitting", { ns: "common" }) : t("submit", { ns: "common" })}
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default Contact;
