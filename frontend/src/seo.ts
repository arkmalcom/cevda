// Per-page <title> and meta description. The build-time prerender (scripts/prerender.mjs)
// writes the Spanish values into each page's HTML; Layout keeps document.title in sync
// on client-side navigation and language changes.

import { CALENDAR_ENABLED } from "./features";

export const SITE_URL = "https://cevda.com.do";

type Meta = { title: string; description: string };
type PageMeta = { es: Meta; en: Meta; noindex?: boolean };

const NAME = "Centro Educativo Villa de Ángeles";

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    es: {
      title: `Colegio en Santo Domingo Este | ${NAME}`,
      description:
        "Colegio privado en Tropical del Este, Santo Domingo Este. Nivel Inicial (45 días a 5 años) y Nivel Primario (6 a 10 años) con robótica, inglés, ballet y flauta.",
    },
    en: {
      title: `School in Santo Domingo Este | ${NAME}`,
      description:
        "Private school in Tropical del Este, Santo Domingo Este. Early education (45 days to 5 years) and primary school (6 to 10 years) with robotics, English, ballet and flute.",
    },
  },
  "/admision": {
    es: {
      title: `Admisión y pre-inscripción | ${NAME}`,
      description:
        "Pre-inscriba a su hijo en nuestro colegio en Santo Domingo Este. Complete el formulario en línea y le contactaremos con toda la información.",
    },
    en: {
      title: `Admission and pre-enrollment | ${NAME}`,
      description:
        "Pre-enroll your child at our school in Santo Domingo Este. Fill out the online form and we will contact you with all the details.",
    },
  },
  "/caracteristicas": {
    es: {
      title: `Servicios y beneficios | ${NAME}`,
      description:
        "Horario extendido de 7:00 a. m. a 6:00 p. m., guardería los fines de semana, campamento de verano y de Navidad, sala de tareas y estimulación temprana en Santo Domingo Este.",
    },
    en: {
      title: `Services and benefits | ${NAME}`,
      description:
        "Extended hours from 7:00 AM to 6:00 PM, weekend daycare, summer and Christmas camps, a homework room and early stimulation in Santo Domingo Este.",
    },
  },
  "/infotep": {
    es: {
      title: `Cursos INFOTEP gratuitos | ${NAME}`,
      description:
        "Cursos gratuitos para adultos avalados por INFOTEP los fines de semana en Santo Domingo Este, como Auxiliar de Farmacia y Visitador a Médico.",
    },
    en: {
      title: `Free INFOTEP courses | ${NAME}`,
      description:
        "Free weekend courses for adults certified by INFOTEP in Santo Domingo Este, including Pharmacy Assistant and Medical Sales Representative.",
    },
  },
  ...(CALENDAR_ENABLED
    ? {
        "/calendario": {
          es: {
            title: `Calendario escolar y avisos | ${NAME}`,
            description:
              "Calendario escolar, días sin clases, reuniones de padres y avisos del Centro Educativo Villa de Ángeles. Suscríbase desde su teléfono por curso.",
          },
          en: {
            title: `School calendar and notices | ${NAME}`,
            description:
              "School calendar, days off, parent meetings and notices from Centro Educativo Villa de Ángeles. Subscribe from your phone by grade.",
          },
        },
      }
    : {}),
  "/carreras": {
    es: {
      title: `Oportunidades de empleo | ${NAME}`,
      description:
        "Buscamos maestros(as) de nivel inicial y básica y personal administrativo en Santo Domingo Este. Envíe su currículum en línea.",
    },
    en: {
      title: `Careers | ${NAME}`,
      description:
        "We are looking for early education and primary teachers and administrative staff in Santo Domingo Este. Send us your résumé online.",
    },
  },
  "/contacto": {
    es: {
      title: `Contacto y ubicación | ${NAME}`,
      description:
        "Visítenos en Calle 1ra #2, Tropical del Este, Santo Domingo Este. Llámenos o escríbanos por WhatsApp al (849) 886-8485.",
    },
    en: {
      title: `Contact and location | ${NAME}`,
      description:
        "Visit us at Calle 1ra #2, Tropical del Este, Santo Domingo Este. Call or message us on WhatsApp at (849) 886-8485.",
    },
  },
  // The exam is shared directly with families; keep it out of search results so
  // strangers don't submit attempts.
  "/examen-ingles": {
    noindex: true,
    es: {
      title: `Examen de inglés | ${NAME}`,
      description: "Examen de inglés en línea del Centro Educativo Villa de Ángeles.",
    },
    en: {
      title: `English exam | ${NAME}`,
      description: "Online English exam of Centro Educativo Villa de Ángeles.",
    },
  },
};

export const NOT_FOUND_META: PageMeta = {
  noindex: true,
  es: {
    title: `Página no encontrada | ${NAME}`,
    description: "La página que busca no existe o fue movida.",
  },
  en: {
    title: `Page not found | ${NAME}`,
    description: "The page you're looking for doesn't exist or has moved.",
  },
};

export const getPageMeta = (pathname: string, lang: "es" | "en"): Meta =>
  (PAGE_META[pathname] ?? NOT_FOUND_META)[lang];
