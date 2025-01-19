import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
  guardianSecondName: string;
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
    guardianSecondName: "",
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
          guardianSecondName: "",
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

  return (
    <div className="p-2 flex flex-col items-center mx-auto lg:w-5/6">
      <h1 className="lg:text-3xl text-2xl font-bold text-blue-800 mb-4">
        Formulario de Pre-inscripción
      </h1>
      <div className="p-3 text-center max-lg:text-sm text-blue-800 space-y-2">
        <p>
          Es un placer para nosotros que nos consideren como pilar en la
          educación de sus hijos.
        </p>
        <p>
          Como primer paso, pueden llenar el formulario a continuación y nos
          pondremos en contacto con ustedes para enviarles información de una
          manera mas detallada y contestar sus preguntas.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full space-y-3 p-2 m-2 border border-gray-300"
      >
        <h2 className="text-lg font-bold text-blue-800">
          Información del estudiante
        </h2>
        <div>
          <InputGroup
            inputs={[
              {
                id: "studentNames",
                label: "Nombre",
                subtext: "Nombres",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentFirstSurname",
                subtext: "Primer Apellido",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentSecondSurname",
                subtext: "Segundo Apellido",
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
            label="Género"
            required
            as="select"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
            ]}
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="studentDob"
            label="Fecha de nacimiento"
            as="date"
            placeholder="Seleccione una fecha"
            required
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="entering-year"
            label="Año entrante"
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
                label: "Dirección",
                subtext: "Calle",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentCity",
                subtext: "Ciudad",
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentPostalCode",
                subtext: "Código postal",
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "studentCountry",
                subtext: "País",
                required: true,
                as: "select",
                options: countryOptions,
                placeholder: "DO",
                onChange: handleChange,
                disabled: disableField,
              },
            ]}
          />
        </div>
        <h2 className="text-lg font-bold text-blue-800">
          Información del representante
        </h2>
        <div>
          <Input
            id="relationToStudent"
            label="Relación con el estudiante"
            as="select"
            options={[
              { value: "mother", label: "Madre" },
              { value: "father", label: "Padre" },
              { value: "guardian", label: "Guardián Legal" },
              { value: "other", label: "Otro" },
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
                label: "Nombre",
                subtext: "Primer nombre",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianSecondName",
                subtext: "Segundo Nombre",
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianLastNames",
                subtext: "Apellidos",
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
            label="Género"
            required
            as="select"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
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
                label: "Dirección",
                subtext: "Calle",
                required: true,
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianCity",
                subtext: "Ciudad",
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianPostalCode",
                subtext: "Código postal",
                onChange: handleChange,
                disabled: disableField,
              },
              {
                id: "guardianCountry",
                subtext: "País",
                required: true,
                as: "select",
                options: countryOptions,
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
            label="Teléfono de casa"
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="guardianMobilePhone"
            label="Teléfono celular"
            required
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        <div>
          <Input
            id="guardianEmail"
            label="Correo electrónico"
            onChange={handleChange}
            disabled={disableField}
          />
        </div>
        {submitStatus === "success" && (
          <div className="text-green-600 text-center">
            ¡Formulario de admisión enviado con éxito!
          </div>
        )}
        {submitStatus === "error" && (
          <div className="text-red-600 text-center">
            Error al enviar el formulario. Por favor, intente nuevamente.
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 w-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
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
