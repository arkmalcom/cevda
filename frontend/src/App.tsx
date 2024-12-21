import Navigation from "./components/Navigation";
import Card from "./components/Card";
import Accordion from "./components/Accordion";

function App() {
  const accordionItems = [
    { "title": "Misión", "content": "El Centro Educativo Villa de Ángeles tiene como misión educar, formar niños exitosos, con excelencia académica y humana y pleno respeto a su dignidad, que les permita conformar su propia y esencial identidad. Orientamos a nuestros alumnos en forma sistemática a construir los cimientos necesarios para que se extiendan en su vida, profesional y personal, siempre asumiendo sus responsabilidades con la familia, su entorno social, el medio ambiente y con la República Dominicana." },
    { "title": "Visión", "content": "Padres de familia, directivos, maestros y demás miembros de la comunidad educativa, sólidamente unidos integrando un equipo para cumplir con su misión, inculcando en los niños una participación consiente y activa en su proceso de formación como líderes y agentes de cambio social." },
    { "title": "Valores", "content": "Amor: Sentimiento de vivo afecto e inclinación hacia una persona o cosa a la que se le desea todo lo bueno. La Fe: Basada en conocer a Dios y basar sus metas en él. Felicidad: Proporcionada por cumplir sus objetivos. Respeto: obteniendo una comunidad cortés. Integración: de las diferentes culturas. Creatividad: Potenciar las habilidades de transformar. Solidaridad: Apoyo a diferentes causas donde puede mostrar su colaboración." }
  ]
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="flex lg:flex-row max-lg:space-y-4 flex-col justify-between p-6">
        <Card
          title="Misión"
          content="El Centro Educativo Villa de Ángeles tiene como misión educar, formar niños exitosos, con excelencia académica y humana y pleno respeto a su dignidad, que les permita conformar su propia y esencial identidad. Orientamos a nuestros alumnos en forma sistemática a construir los cimientos necesarios para que se extiendan en su vida, profesional y personal, siempre asumiendo sus responsabilidades con la familia, su entorno social, el medio ambiente y con la República Dominicana."
        />
        <Card
          title="Visión"
          content="Padres de familia, directivos, maestros y demás miembros de la comunidad educativa, sólidamente unidos integrando un equipo para cumplir con su misión, inculcando en los niños una participación consiente y activa en su proceso de formación como líderes y agentes de cambio social."
        />
        <Card
          title="Valores"
          content="Amor: Sentimiento de vivo afecto e inclinación hacia una persona o cosa a la que se le desea todo lo bueno.
                  La Fe: Basada en conocer a Dios y basar sus metas en él.
                  Felicidad: Proporcionada por cumplir sus objetivos.
                  Respeto: obteniendo una comunidad cortés.
                  Integración: de las diferentes culturas.
                  Creatividad: Potenciar las habilidades de transformar.
                  Solidaridad: Apoyo a diferentes causas donde puede mostrar su colaboración."
        />
      </div>
      <div className="flex">
        <Accordion items={accordionItems} />
      </div>
    </>
  );
}

export default App;
