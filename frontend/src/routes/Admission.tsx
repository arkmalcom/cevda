import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";

import { useSubmit } from "../hooks/useSubmit";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";

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

const AdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionFormData>({
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
  });

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
      url: `${import.meta.env.VITE_BASE_API_URL}/${STAGE}/email-handler-${STAGE}`,
      formData,
      formSource: "admisión",
      onSuccess: () => {
        setFormData({
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
        });
      },
    });
  };

  const disableField = submitStatus === "success";
  const { t } = useTranslation();

  const translateCountries = (countries: { value: string; label: string }[]) =>
    countries.map((country) => {
      return {
        value: country.value,
        label: t(country.value, { ns: "countries" }),
      };
    });

  const translatedCountryOptions = translateCountries(countryOptions);

  return (
    <div className="p-2 flex flex-col items-center mx-auto lg:w-5/6">
      <h1 className="lg:text-3xl text-2xl font-bold text-blue-800 mb-4">
        {t("title", { ns: "admission" })}
      </h1>
      <div className="p-3 text-center max-lg:text-sm text-blue-800 space-y-2">
        <p>{t("content", { ns: "admission" })}</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full space-y-3 p-2 m-2 border border-gray-300"
      >
        <h2 className="text-lg font-bold text-blue-800">
          {t("form.studentInfo.title", { ns: "admission" })}
        </h2>
        <div>
          <InputGroup
            inputs={[
              {
                id: "studentNames",
                label: t("form.studentInfo.name", { ns: "admission" }),
                subtext: t("form.studentInfo.names", { ns: "admission" }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentFirstSurname",
                subtext: t("form.studentInfo.firstSurname", {
                  ns: "admission",
                }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentSecondSurname",
                subtext: t("form.studentInfo.secondSurname", {
                  ns: "admission",
                }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </div>
        <div>
          <Input
            id="studentGender"
            label={t("form.gender.title", { ns: "admission" })}
            required
            as="select"
            options={[
              {
                value: "male",
                label: t("form.gender.male", { ns: "admission" }),
              },
              {
                value: "female",
                label: t("form.gender.female", { ns: "admission" }),
              },
            ]}
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="studentDob"
            label={t("form.studentInfo.dob", { ns: "admission" })}
            as="date"
            placeholder={t("form.selectDate", { ns: "admission" })}
            required
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="entering-year"
            label={t("form.studentInfo.enteringYear", { ns: "admission" })}
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
        <div>
          <InputGroup
            inputs={[
              {
                id: "studentStreetAddress",
                label: t("form.address.title", { ns: "admission" }),
                subtext: t("form.address.street", { ns: "admission" }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentCity",
                subtext: t("form.address.city", { ns: "admission" }),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentPostalCode",
                subtext: t("form.address.postalCode", { ns: "admission" }),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentCountry",
                subtext: t("form.address.country", { ns: "admission" }),
                required: true,
                as: "select",
                options: translatedCountryOptions,
                placeholder: "DO",
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </div>
        <h2 className="text-lg font-bold text-blue-800">
          {t("form.guardianInfo.title", { ns: "admission" })}
        </h2>
        <div>
          <Input
            id="relationToStudent"
            label={t("form.guardianInfo.relationToStudent.title", {
              ns: "admission",
            })}
            as="select"
            options={[
              {
                value: "mother",
                label: t("form.guardianinfo.relationToStudent.mother", {
                  ns: "admission",
                }),
              },
              {
                value: "father",
                label: t("form.guardianinfo.relationToStudent.father", {
                  ns: "admission",
                }),
              },
              {
                value: "guardian",
                label: t("form.guardianinfo.relationToStudent.guardian", {
                  ns: "admission",
                }),
              },
              {
                value: "other",
                label: t("form.guardianinfo.relationToStudent.other", {
                  ns: "admission",
                }),
              },
            ]}
            required
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <InputGroup
            inputs={[
              {
                id: "guardianFirstName",
                label: t("form.guardianInfo.firstName", { ns: "admission" }),
                subtext: "Primer nombre",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianMiddleName",
                subtext: t("form.guardianInfo.middleName", { ns: "admission" }),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianLastNames",
                subtext: t("form.guardianInfo.surnames", { ns: "admission" }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </div>
        <div>
          <Input
            id="guardianGender"
            label={t("form.gender.title", { ns: "admission" })}
            required
            as="select"
            options={[
              {
                value: "male",
                label: t("form.gender.male", { ns: "admission" }),
              },
              {
                value: "female",
                label: t("form.gender.female", { ns: "admission" }),
              },
            ]}
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <InputGroup
            inputs={[
              {
                id: "guardianStreetAddress",
                label: t("form.address.title", { ns: "admission" }),
                subtext: t("form.address.street", { ns: "admission" }),
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianCity",
                subtext: t("form.address.city", { ns: "admission" }),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianPostalCode",
                subtext: t("form.address.postalCode", { ns: "admission" }),
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianCountry",
                subtext: t("form.address.country", { ns: "admission" }),
                required: true,
                as: "select",
                options: translatedCountryOptions,
                placeholder: "DO",
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </div>
        <div>
          <Input
            id="guardianHomePhone"
            label={t("form.guardianInfo.homePhone", { ns: "admission" })}
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="guardianMobilePhone"
            label={t("form.guardianInfo.mobilePhone", { ns: "admission" })}
            required
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="guardianEmail"
            label={t("form.guardianInfo.email", { ns: "admission" })}
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        {submitStatus === "success" && (
          <div className="text-green-600 text-center">
            {t("form.successMessage", { ns: "admission" })}
          </div>
        )}
        {submitStatus === "error" && (
          <div className="text-red-600 text-center">
            {t("form.errorMessage", { ns: "admission" })}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 w-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t("form.submitting", { ns: "admission" })
            : t("form.submit", { ns: "admission" })}
        </button>
      </form>
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
