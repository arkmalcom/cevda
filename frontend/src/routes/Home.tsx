import { useState } from "react";

import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";
import GridComponent from "../components/Grid";

import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";

import ballet from "../assets/services/ballet.jpg";
import estimTemprana from "../assets/services/estim_temprana.jpg";
import flauta from "../assets/services/flauta.jpg";
import informatica from "../assets/services/informatica.jpg";
import carousel1 from "../assets/carousel/carousel1.jpg";
import carousel2 from "../assets/carousel/carousel2.jpg";
import carousel3 from "../assets/carousel/carousel3.jpg";
import carousel4 from "../assets/carousel/carousel4.jpg";
import carousel5 from "../assets/carousel/carousel5.jpg";
import robotica from "../assets/services/robotica.jpg";

const Home = () => {
  const accordionItems = [
    {
      title: "Misión",
      content:
        "El Centro Educativo Villa de Ángeles tiene como misión educar, formar niños exitosos, con excelencia académica y humana y pleno respeto a su dignidad, que les permita conformar su propia y esencial identidad. Orientamos a nuestros alumnos en forma sistemática a construir los cimientos necesarios para que se extiendan en su vida, profesional y personal, siempre asumiendo sus responsabilidades con la familia, su entorno social, el medio ambiente y con la República Dominicana.",
    },
    {
      title: "Visión",
      content:
        "Padres de familia, directivos, maestros y demás miembros de la comunidad educativa, sólidamente unidos integrando un equipo para cumplir con su misión, inculcando en los niños una participación consiente y activa en su proceso de formación como líderes y agentes de cambio social.",
    },
    {
      title: "Valores",
      content:
        "Amor: Sentimiento de vivo afecto e inclinación hacia una persona o cosa a la que se le desea todo lo bueno. La Fe: Basada en conocer a Dios y basar sus metas en él. Felicidad: Proporcionada por cumplir sus objetivos. Respeto: obteniendo una comunidad cortés. Integración: de las diferentes culturas. Creatividad: Potenciar las habilidades de transformar. Solidaridad: Apoyo a diferentes causas donde puede mostrar su colaboración.",
    },
  ];

  const [isServicesOpen, setServicesOpen] = useState(false);

  const toggleServices = () => {
    setServicesOpen(!isServicesOpen);
  };

  const gridItems = [
    { title: "Nivel inicial", description: "Aca va algo" },
    { title: "Nivel primario", description: "Aca va otra cosa" },
  ];

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center lg:mx-auto">
        <div className="w-full space-y-6">
          <div>
            <Carousel
              images={[carousel1, carousel2, carousel3, carousel4, carousel5]}
            />
          </div>
          <div>
            <Accordion items={accordionItems} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-800">
              Oferta academica
            </h1>
            <GridComponent items={gridItems} />
          </div>
          <h1 className="text-center text-3xl text-blue-800 font-bold p-2">
            Nuestros Servicios
          </h1>
          <div className="bg-blue-500 flex flex-col items-center p-1">
            <div className="flex flex-col lg:flex-row">
              <div className="items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={robotica}
                    alt="robotica"
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-robot text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">Robótica</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={estimTemprana}
                    alt="estimulacion temprana"
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-baby text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      Estimulación Temprana
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={ballet}
                    alt="ballet"
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-shoe-prints text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">Ballet</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={flauta}
                    alt="flauta"
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-music text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">Flauta</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={informatica}
                    alt="informatica"
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-laptop text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">Informatica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 text-justify lg:w-1/2 mx-auto">
            <h1 className="text-3xl font-bold text-center text-blue-800">
              Requisitos de Admision
            </h1>
            <ul className="my-4 list-disc list-inside">
              <li>Fotocopia de Acta de nacimiento</li>
              <li>Copia de la cédula o pasaporte de ambos padres.</li>
              <li>4 fotos 2x2 (recientes)</li>
              <li>Certificado médico</li>
              <li>Copia de seguro médico</li>
              <li>Llenar formulario de ingreso</li>
              <li>Firmar carta de comrpomiso de pago</li>
              <li>
                Si presenta algún problema de salud; presentar copia de su
                historial
              </li>
              <li>Uso correcto del uniforme (párvulos en adelante)</li>
              <li>Evaluación oftalmológica (preprimario en adelante)</li>
            </ul>
            <p className="my-4">
              Si el/la estudiante había estado en un centro educativo
              anteriormente:
            </p>
            <ul className="list-disc list-inside">
              <li>Llenar formulario de referencia (colegio de precedencia)</li>
              <li>Carta de saldo</li>
              <li>Carta de buena conducta</li>
              <li>Historial académico SIGERD</li>
              <li>Récord de notas</li>
              <li>Niños de primaria deben aplicar evaluación</li>
            </ul>
          </div>
          <div className="max-lg:text-sm mx-auto lg:w-1/2 p-2">
            <h1 className="text-blue-800 font-bold space-y-2 text-3xl text-center my-4">
              Contacto
            </h1>
            <p>{FULL_ADDRESS}</p>
            <p>Tel: {PHONE_NUMBER}</p>
            <p>Correo: {EMAIL_ADDRESS}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
