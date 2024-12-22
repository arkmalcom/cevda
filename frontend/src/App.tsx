import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import Accordion from "./components/Accordion";
import Footer from "./components/Footer";
import GridComponent from "./components/Grid";

import pic1 from "./assets/pic1.jpg";
import pic2 from "./assets/pic2.jpg";

function App() {
  const accordionItems = [
    { "title": "Misión", "content": "El Centro Educativo Villa de Ángeles tiene como misión educar, formar niños exitosos, con excelencia académica y humana y pleno respeto a su dignidad, que les permita conformar su propia y esencial identidad. Orientamos a nuestros alumnos en forma sistemática a construir los cimientos necesarios para que se extiendan en su vida, profesional y personal, siempre asumiendo sus responsabilidades con la familia, su entorno social, el medio ambiente y con la República Dominicana." },
    { "title": "Visión", "content": "Padres de familia, directivos, maestros y demás miembros de la comunidad educativa, sólidamente unidos integrando un equipo para cumplir con su misión, inculcando en los niños una participación consiente y activa en su proceso de formación como líderes y agentes de cambio social." },
    { "title": "Valores", "content": "Amor: Sentimiento de vivo afecto e inclinación hacia una persona o cosa a la que se le desea todo lo bueno. La Fe: Basada en conocer a Dios y basar sus metas en él. Felicidad: Proporcionada por cumplir sus objetivos. Respeto: obteniendo una comunidad cortés. Integración: de las diferentes culturas. Creatividad: Potenciar las habilidades de transformar. Solidaridad: Apoyo a diferentes causas donde puede mostrar su colaboración." }
  ]

  const gridItems = [
    { title: 'Nivel inicial', description: 'This is the first item in the grid.' },
    { title: 'Nivel primario', description: 'This is the second item in the grid.' },
  ];

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="flex flex-col lg:w-1/2 items-center lg:justify-center lg:mx-auto">
        <div className="my-4 w-full">
          <Carousel images={[pic1, pic2, pic1]} />
        </div>
        <div className="my-4 w-full">
          <Accordion items={accordionItems} />
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center text-blue-800">Oferta academica</h1>
          <GridComponent items={gridItems} />
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center text-blue-800">Requisitos de Admision</h1>
          <p>Texto</p>
        </div>
      </div>
      <div className="fixed bottom-24 lg:right-10 right-6">
        <a href="#">
          <i className="fab fa-whatsapp text-4xl text-green-500"></i>
        </a>
      </div>
      <div className="py-8">
        <Footer />
      </div>
    </>
  );
}

export default App;
