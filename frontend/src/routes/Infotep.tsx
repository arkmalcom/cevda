import React from "react";
import infotepLogo from "../assets/infotep_logo.jpg";

const Infotep: React.FC = () => {
  return (
    <div className="flex flex-col text-justify">
      <div className="mx-auto">
        <img
          src={infotepLogo}
          alt="infotep-logo"
          className="lg:w-96 lg:h-96 w-64 h-64"
        />
      </div>
      <hr />
      <div className="space-y-4">
        <p>
          El Centro Educativo Villa de Ángeles tiene el agrado de ofrecer cursos
          gratuitos, avalados por el Instituto Nacional de Formación Técnico
          Profesional (INFOTEP), diseñados para adultos y disponibles durante
          los fines de semana. Entre las opciones destacan los programas de
          Auxiliar de Farmacia y Visitador a Médico, entre otros.
        </p>
        <p>Requisitos para inscripción:</p>
        <ul className="list-disc list-inside">
          <li>Copia de la cédula de identidad.</li>
          <li>Certificado de bachiller.</li>
        </ul>
        <p>
          Para inscribirte, puedes contactarnos a través de nuestro WhatsApp
          (849) 886-8485 o visitar nuestras oficinas en horario de 8:00 a. m. a
          3:00 p. m.
        </p>
        <p className="pb-2">¡Te esperamos!</p>
      </div>
    </div>
  );
};

export default Infotep;
