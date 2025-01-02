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
        <div className="w-full space-y-2">
          <div>
            <Carousel images={[carousel1, carousel2, carousel3, carousel4, carousel5]} />
          </div>
          <div>
            <Accordion items={accordionItems} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-800">
              Oferta academica
            </h1>
            <GridComponent items={gridItems} />
            <div className="flex flex-col p-2">
                <div className="my-1 rounded-md bg-blue-200">
                  <button
                    className="text-left flex items-center font-bold justify-between w-full p-2"
                    onClick={toggleServices}
                  >
                    <span className="text-blue-800">Nuestros Servicios</span>
                    <i
                      className={`fas ${
                        isServicesOpen ? "fa-caret-up" : "fa-caret-down"
                      } p-2 transition-transform`}
                    ></i>
                  </button>
                    {isServicesOpen && (
                      <div className="text-sm">
                        <div className="w-full border-t-2 border-amber-500"></div>
                        <div className="flex lg:flex-row max-lg:space-y-4 flex-col p-2 justify-center items-center text-center lg:justify-between">
                          <div>
                            <h1 className="text-xl p-2">Programación y Robótica</h1>
                            <img src={robotica} alt="Robotica" className="h-64 rounded-md border-2 border-amber-500 shadow-md" />
                          </div>
                          <div>
                            <h1 className="text-xl p-2">Ballet</h1>
                            <img src={ballet} alt="Ballet" className="h-64 rounded-md border-2 border-amber-500 shadow-md" />
                          </div>
                          <div>
                            <h1 className="text-xl p-2">Flauta</h1>
                            <img src={flauta} alt="flauta" className="h-64 rounded-md border-2 border-amber-500 shadow-md" />
                          </div>
                          <div>
                            <h1 className="text-xl p-2">Estimulación Temprana</h1>
                            <img src={estimTemprana} alt="estimulación temprana" className="h-64 rounded-md border-2 border-amber-500 shadow-md" />
                          </div>
                        </div>
                      </div>
                    )}
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
              <li>
                Niños de primaria deben aplicar evaluación
              </li>
            </ul>
          </div>
          <div className="max-lg:text-sm mx-auto lg:w-1/2 p-2">
            <h1 className="text-blue-800 font-bold space-y-2 text-3xl text-center my-4">Contacto</h1>
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
