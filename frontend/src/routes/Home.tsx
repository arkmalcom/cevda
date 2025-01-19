import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";

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
import welcomeBg from "../assets/welcome_bg.jpg";

import { useEffect } from "react";
import { AccordionItem } from "../components/Accordion";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadNamespace = async () => {
      await i18n.loadNamespaces(['home']);
    };
    loadNamespace();
  }, [i18n]);

  const accordionItems = t('accordionItems', { ns: 'home', returnObjects: true }) as AccordionItem[] || [];

  const nivelInicialContent = `
  En el Centro Educativo Villa de Ángeles, nuestro servicio de preescolar está diseñado para ser el inicio ideal en la formación de sus pequeños. 
  Contamos con maestras especializadas que trabajan con pasión y dedicación para fomentar la creatividad, la curiosidad y el amor por el aprendizaje desde una edad temprana. 
  Nuestro enfoque integral promueve el desarrollo físico, emocional y social de los niños, en un ambiente seguro, estimulante y lleno de actividades que potencian sus habilidades y refuerzan su confianza. 
  Aquí, cada niño es único, y nuestro compromiso es acompañarlos en sus primeros pasos hacia un futuro brillante.
  `;

  const nivelPrimarioContent = `
  En el Centro Educativo Villa de Ángeles, nuestro nivel primario está diseñado para formar estudiantes preparados para los desafíos del mundo actual. 
  Integramos la tecnología como parte esencial del aprendizaje, ofreciendo clases de Programación, 
  Robótica e Informática que estimulan el pensamiento lógico y la creatividad. Además, 
  fortalecemos el desarrollo integral de nuestros estudiantes con clases de inglés, 
  para potenciar sus habilidades comunicativas, y flauta, fomentando la sensibilidad artística y musical. 
  Todo esto en un ambiente dinámico y participativo, donde cada niño encuentra las herramientas para destacar y crecer en todas las áreas.
  `;

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center lg:mx-auto">
        <div className="w-full space-y-6">
          <div>
            <Carousel
              images={[carousel1, carousel2, carousel3, carousel4, carousel5]}
            />
          </div>
          <div
            className="h-auto bg-contain flex flex-col space-y-2"
            style={{ backgroundImage: `url(${welcomeBg})` }}
          >
            <div className="p-2 bg-amber-500 h-full bg-opacity-70 rounded-md p-2 space-y-3">
              <h1 className="font-title text-xl text-blue-800">
                Centro Educativo Villa de Ángeles
              </h1>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                Bienvenidos al Centro Educativo Villa de Ángeles, un espacio
                dedicado al aprendizaje y al desarrollo integral de sus hijos.
              </p>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                Somos un colegio comprometido con la excelencia educativa,
                ofreciendo servicios desde el nivel inicial hasta el nivel
                primario, complementados con clases extracurriculares diseñadas
                para potenciar las habilidades de nuestros estudiantes. Además,
                contamos con un sistema de seminternado que garantiza un
                ambiente seguro y enriquecedor. Nuestro enfoque intensivo está
                en brindar una educación de calidad y un cuidado excepcional,
                priorizando siempre el bienestar y el crecimiento de nuestros
                alumnos.
              </p>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                {" "}
                ¡Gracias por confiar en nosotros!
              </p>
            </div>
          </div>
          <div>
            <Accordion items={accordionItems} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-800">
              Oferta academica
            </h1>
            <div className="flex max-lg:flex-col max-lg:space-y-4 justify-evenly p-2">
              <Card
                title="Nivel inicial"
                subtext="2 a 5 años"
                content={nivelInicialContent}
              />
              <Card
                title="Nivel inicial"
                subtext="6 a 10 años"
                content={nivelPrimarioContent}
              />
            </div>
          </div>
          <h1 className="text-center text-3xl text-blue-800 font-bold p-2">
            Nuestros Servicios
          </h1>
          <div className="bg-blue-500 flex flex-col items-center">
            <div className="flex flex-col md:flex-row">
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
                    <i className="fas fa-child-dress text-blue-800 text-lg"></i>
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
