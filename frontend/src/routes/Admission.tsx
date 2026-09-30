import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";

import { useSubmit } from "../hooks/useSubmit";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import PageIntro from "../components/PageIntro";
import Button from "../components/ui/Button";
import { ErrorNote, SuccessNote } from "../components/StarBurst";
import AdmissionPrintForm from "../components/AdmissionPrintForm";

import countryOptions from "../utils/Constants";

interface AdmissionFormData {
  studentNames: string;
  studentFirstSurname: string;
  studentSecondSurname: string;
  studentGender: string;
  studentDob: string;
  enteringYear: string;
  studentStreetAddress: string;
  studentCity: string;
  studentPostalCode: string;
  studentCountry: string;
  relationToStudent: string;
  guardianFirstName: string;
  guardianMiddleName: string;
  guardianLastNames: string;
  guardianStreetAddress: string;
  guardianCity: string;
  guardianPostalCode: string;
  guardianCountry: string;
  guardianHomePhone: string;
  guardianMobilePhone: string;
  guardianEmail: string;
}

const emptyForm: AdmissionFormData = {
  studentNames: "",
  studentFirstSurname: "",
  studentSecondSurname: "",
  studentGender: "",
  studentDob: "",
  enteringYear: "",
  studentStreetAddress: "",
  studentCity: "",
  studentPostalCode: "",
  studentCountry: "DO",
  relationToStudent: "",
  guardianFirstName: "",
  guardianMiddleName: "",
  guardianLastNames: "",
  guardianStreetAddress: "",
  guardianCity: "",
  guardianPostalCode: "",
  guardianCountry: "DO",
  guardianHomePhone: "",
  guardianMobilePhone: "",
  guardianEmail: "",
};

const AdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionFormData>(emptyForm);

  const { handleSubmit, isSubmitting, submitStatus } =
    useSubmit<AdmissionFormData>();
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
      formSource: "admisión",
      onSuccess: () => {
        setFormData(emptyForm);
      },
    });
  };

  const disableField = submitStatus === "success";
  const { t } = useTranslation("admission");

  const translateCountries = (countries: { value: string; label: string }[]) =>
    countries.map((country) => ({
      value: country.value,
      label: t(country.value, { ns: "countries" }),
    }));

  const translatedCountryOptions = translateCountries(countryOptions);

  return (
    <div className="admission-screen">
      <PageIntro title={t("title")} lead={t("content")} stickers={["crown", "pencil"]}>
        <div className="mt-8 print:hidden">
          <Button variant="light" icon="fa-print" onClick={() => window.print()}>
            {t("print.button")}
          </Button>
        </div>
      </PageIntro>

      <div className="relative mx-auto -mt-10 max-w-4xl px-4 md:-mt-14 md:px-6">
      <form
        onSubmit={onSubmit}
        className="admission-digital-form sheet relative mx-auto space-y-10 px-5 py-8 md:px-10 md:py-12"
      >

        <section>
          <h2 className="mb-6 flex items-center gap-3 border-b-2 border-dashed border-blue-900/15 pb-3 font-display text-2xl font-extrabold text-blue-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-base text-blue-950">
              <i className="fas fa-child" aria-hidden />
            </span>
            {t("form.studentInfo.title")}
          </h2>

          <InputGroup
            variant="paper"
            label={t("form.studentInfo.name")}
            inputs={[
              {
                id: "studentNames",
                subtext: t("form.studentInfo.names"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentFirstSurname",
                subtext: t("form.studentInfo.firstSurname"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentSecondSurname",
                subtext: t("form.studentInfo.secondSurname"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              variant="paper"
              id="studentGender"
              label={t("form.gender.title")}
              required
              as="select"
              options={[
                { value: "male", label: t("form.gender.male") },
                { value: "female", label: t("form.gender.female") },
              ]}
              onChange={handleChange}
              disabled={disableField}
            />
            <Input
              variant="paper"
              id="studentDob"
              label={t("form.studentInfo.dob")}
              as="date"
              placeholder={t("form.selectDate")}
              required
              onChange={handleChange}
              disabled={disableField}
            />
            <Input
              variant="paper"
              id="enteringYear"
              label={t("form.studentInfo.enteringYear")}
              as="select"
              required
              options={[
                { value: "2024-2025", label: "2024-2025" },
                { value: "2025-2026", label: "2025-2026" },
                { value: "2026-2027", label: "2026-2027" },
                { value: "2027-2028", label: "2027-2028" },
              ]}
              onChange={handleChange}
              disabled={disableField}
            />
          </div>

          <InputGroup
            variant="paper"
            label={t("form.address.title")}
            inputs={[
              {
                id: "studentStreetAddress",
                subtext: t("form.address.street"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
                wide: true,
              },
              {
                id: "studentCity",
                subtext: t("form.address.city"),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentPostalCode",
                subtext: t("form.address.postalCode"),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentCountry",
                subtext: t("form.address.country"),
                required: true,
                as: "select",
                options: translatedCountryOptions,
                placeholder: "DO",
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-3 border-b-2 border-dashed border-blue-900/15 pb-3 font-display text-2xl font-extrabold text-blue-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-base text-blue-950">
              <i className="fas fa-user-tie" aria-hidden />
            </span>
            {t("form.guardianInfo.title")}
          </h2>

          <div className="mb-4">
            <Input
              variant="paper"
              id="relationToStudent"
              label={t("form.guardianInfo.relationToStudent.title")}
              as="select"
              options={[
                {
                  value: "mother",
                  label: t("form.guardianInfo.relationToStudent.mother"),
                },
                {
                  value: "father",
                  label: t("form.guardianInfo.relationToStudent.father"),
                },
                {
                  value: "guardian",
                  label: t("form.guardianInfo.relationToStudent.guardian"),
                },
                {
                  value: "other",
                  label: t("form.guardianInfo.relationToStudent.other"),
                },
              ]}
              required
              onChange={handleChange}
              disabled={disableField}
            />
          </div>

          <InputGroup
            variant="paper"
            label={t("form.studentInfo.name")}
            inputs={[
              {
                id: "guardianFirstName",
                subtext: t("form.guardianInfo.firstName"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianMiddleName",
                subtext: t("form.guardianInfo.middleName"),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianLastNames",
                subtext: t("form.guardianInfo.surnames"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />

          <div className="mb-4">
            <Input
              variant="paper"
              id="guardianGender"
              label={t("form.gender.title")}
              required
              as="select"
              options={[
                { value: "male", label: t("form.gender.male") },
                { value: "female", label: t("form.gender.female") },
              ]}
              onChange={handleChange}
              disabled={disableField}
            />
          </div>

          <InputGroup
            variant="paper"
            label={t("form.address.title")}
            inputs={[
              {
                id: "guardianStreetAddress",
                subtext: t("form.address.street"),
                required: true,
                onChange: handleChange,
                disabled: disableField,
                wide: true,
              },
              {
                id: "guardianCity",
                subtext: t("form.address.city"),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianPostalCode",
                subtext: t("form.address.postalCode"),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianCountry",
                subtext: t("form.address.country"),
                required: true,
                as: "select",
                options: translatedCountryOptions,
                placeholder: "DO",
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              variant="paper"
              id="guardianHomePhone"
              label={t("form.guardianInfo.homePhone")}
              onChange={handleChange}
              disabled={disableField}
            />
            <Input
              variant="paper"
              id="guardianMobilePhone"
              label={t("form.guardianInfo.mobilePhone")}
              required
              onChange={handleChange}
              disabled={disableField}
            />
            <Input
              variant="paper"
              id="guardianEmail"
              label={t("form.guardianInfo.email")}
              type="email"
              onChange={handleChange}
              disabled={disableField}
            />
          </div>
        </section>

        {submitStatus === "success" && <SuccessNote>{t("form.successMessage")}</SuccessNote>}
        {submitStatus === "error" && <ErrorNote>{t("form.errorMessage")}</ErrorNote>}

        <Button type="submit" disabled={isSubmitting || disableField} className="w-full">
          {isSubmitting ? t("submitting", { ns: "common" }) : t("submit", { ns: "common" })}
        </Button>
      </form>
      </div>

      <AdmissionPrintForm />
    </div>
  );
};

const Admission: React.FC = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT}
    >
      <AdmissionForm />
    </GoogleReCaptchaProvider>
  );
};

export default Admission;
