import React from "react";

import characteristicsBg from "../assets/characteristics_bg.jpg";

const guarderiaContent = `
Un espacio seguro y acogedor diseñado para cuidar a los pequeños mientras los padres atienden compromisos laborales, personales o familiares. 
Los niños participan en actividades recreativas y educativas adaptadas a su edad, fomentando su desarrollo en un ambiente lleno de atención y calidez.
`;

const campContent = `
Programas especiales que combinan diversión y aprendizaje durante las vacaciones. 
Los niños disfrutan de actividades creativas, juegos, deportes y talleres que promueven habilidades sociales, 
trabajo en equipo y descubrimiento personal, todo en un entorno seguro y dinámico.
`;

const salaTareasContent = `
Un ambiente tranquilo y supervisado donde los estudiantes pueden realizar sus deberes escolares con la orientación de personal capacitado. 
Este servicio ayuda a reforzar sus conocimientos, resolver dudas y fomentar hábitos de estudio autónomos y responsables.
`;

const estimTempranaContent = `
Programas diseñados para potenciar el desarrollo integral de bebés desde los primeros días de vida. 
A través de actividades sensoriales, motoras y cognitivas, se estimula su curiosidad, 
coordinación y conexión emocional en un entorno especialmente preparado para su edad y necesidades.
`;

const extraClassContent = `
Un abanico de opciones para que los estudiantes desarrollen sus talentos e intereses. 
Música, deportes, idiomas, arte y más se ofrecen como oportunidades para complementar su educación y 
fortalecer habilidades importantes como la disciplina, la creatividad y el trabajo en equipo.
`;

const aireLibreContent = `
Áreas naturales diseñadas para el juego, la exploración y el aprendizaje. 
Los niños tienen la oportunidad de conectarse con la naturaleza, desarrollar habilidades motoras, 
liberar energía y fortalecer su bienestar físico y emocional en un entorno seguro y estimulante.
`;

const aprendizajeContent = `
Un enfoque pedagógico innovador que combina métodos prácticos e interactivos para hacer que el aprendizaje sea significativo y atractivo. 
A través de proyectos, experiencias grupales y actividades creativas, los estudiantes desarrollan pensamiento crítico, 
curiosidad y habilidades para la vida.
`;

const hoursContent = `
Ofrecemos un horario extendido como un servicio opcional para apoyar a las familias con horarios laborales exigentes. 
Las clases regulares comienzan a las 8:00 AM, pero desde las 6:00 AM, los niños pueden disfrutar de un espacio seguro con actividades 
supervisadas que facilitan su llegada gradual y cómoda al día escolar. 
Este servicio adicional brinda flexibilidad y tranquilidad para los padres que lo necesiten.
`;

interface Characteristic {
  icon: JSX.Element;
  text: string;
  content: string;
}

const characteristics: Characteristic[] = [
  {
    icon: <p className="text-3xl">🍼</p>,
    text: "Guardería fines de semana",
    content: guarderiaContent,
  },
  {
    icon: <p className="text-3xl">⏰</p>,
    text: "Abiertos de 6:00 AM a 6:00 PM",
    content: hoursContent,
  },
  {
    icon: <p className="text-3xl">🏐</p>,
    text: "Campamento de verano y de Navidad",
    content: campContent,
  },
  {
    icon: <p className="text-3xl">📚</p>,
    text: "Sala de tareas",
    content: salaTareasContent,
  },
  {
    icon: <p className="text-3xl">👶</p>,
    text: "Estimulación temprana desde los 45 días de edad",
    content: estimTempranaContent,
  },
  {
    icon: <p className="text-3xl">🎭</p>,
    text: "Clases extracurriculares",
    content: extraClassContent,
  },
  {
    icon: <p className="text-3xl">🌳</p>,
    text: "Espacios al aire libre",
    content: aireLibreContent,
  },
  {
    icon: <p className="text-3xl">💡</p>,
    text: "Aprendizaje dinámico",
    content: aprendizajeContent,
  },
];

const Characteristics: React.FC = () => {
  return (
    <div
      className="flex flex-col space-y-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${characteristicsBg})` }}
    >
      <h1 className="p-1 font-bold text-blue-800 text-center lg:text-xl font-welcome">
        Descubre los Servicios y Beneficios de Nuestro Centro Educativo
      </h1>
      <ul>
        {characteristics.map((item, index) => (
          <li key={index} className="flex flex-col">
            <span className="m-2 font-bold text-blue-800">
              {item.icon} {item.text}
            </span>
            <p className="m-2 text-justify">{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characteristics;
