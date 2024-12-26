import React, { useState } from "react";

import Input from "../components/Input";
import InputGroup from "../components/InputGroup";

import countryOptions from "../utils/Constants";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Backend logic to email form data
  };

  return (
    <div className="flex flex-col items-center lg:w-1/2 mx-auto mt-8 mb-16">
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
        onSubmit={handleSubmit}
        className="w-full space-y-3 p-2 m-2 border border-gray-300"
      >
        <h2 className="text-lg font-bold text-blue-800">
          Información del estudiante
        </h2>
        <div>
          <InputGroup
            inputs={[
              {
                id: "names",
                label: "Nombre",
                subtext: "Nombres",
                required: true,
              },
              {
                id: "firstSurname",
                subtext: "Primer Apellido",
                required: true,
              },
              {
                id: "secondSurname",
                subtext: "Segundo Apellido",
                required: true,
              },
            ]}
          />
        </div>
        <div>
          <Input
            id="gender"
            label="Género"
            required
            as="select"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
            ]}
          />
        </div>
        <div>
          <Input
            id="dob"
            label="Fecha de nacimiento"
            as="date"
            placeholder="Seleccione una fecha"
            required
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
          />
        </div>
        <div>
          <InputGroup
            inputs={[
              {
                id: "streetAddress",
                label: "Dirección",
                subtext: "Calle",
                required: true,
              },
              { id: "city", subtext: "Ciudad" },
              { id: "postalCode", subtext: "Código postal" },
              {
                id: "country",
                subtext: "País",
                required: true,
                as: "select",
                options: countryOptions,
                placeholder: "DO",
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
          />
        </div>
        <div>
          <InputGroup
            inputs={[
              {
                id: "firstName",
                label: "Nombre",
                subtext: "Primer nombre",
                required: true,
              },
              { id: "secondName", subtext: "Segundo Nombre" },
              { id: "lastNames", subtext: "Apellidos", required: true },
            ]}
          />
        </div>
        <div>
          <Input
            id="gender"
            label="Género"
            required
            as="select"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
            ]}
          />
        </div>
        <div>
          <InputGroup
            inputs={[
              {
                id: "streetAddress",
                label: "Dirección",
                subtext: "Calle",
                required: true,
              },
              { id: "city", subtext: "Ciudad" },
              { id: "postalCode", subtext: "Código postal" },
              {
                id: "country",
                subtext: "País",
                required: true,
                as: "select",
                options: countryOptions,
                placeholder: "DO",
              },
            ]}
          />
        </div>
        <div>
          <Input id="homePhone" label="Teléfono de casa" />
        </div>
        <div>
          <Input id="mobilePhone" label="Teléfono celular" required />
        </div>
        <div>
          <Input id="email" label="Correo electrónico" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Admission;
