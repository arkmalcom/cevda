import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";
import GridComponent from "../components/Grid";

import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";

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

  const gridItems = [
    { title: "Nivel inicial", description: "Aca va algo" },
    { title: "Nivel primario", description: "Aca va otra cosa" },
  ];

  return (
    <>
      <div className="flex flex-col lg:w-1/2 items-center lg:justify-center lg:mx-auto">
        <div className="w-full space-y-2">
          <div>
            <Carousel images={[pic1, pic2, pic1]} />
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
          <div>
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
                Niños de primaria deben aplicar evaluación (costo no
                reembolsable de $200)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
