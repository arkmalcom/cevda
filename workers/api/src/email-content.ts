export const COLUMN_MAPPING: Record<string, Record<string, string>> = {
  "admisión": {
    studentNames: "Nombres de Estudiante",
    studentFirstSurname: "Primer Apellido del Estudiante",
    studentSecondSurname: "Segundo Apellido del Estudiante",
    studentGender: "Género del Estudiante",
    studentDob: "Fecha de Nacimiento del Estudiante",
    enteringYear: "Año de Ingreso",
    studentStreetAddress: "Dirección del Estudiante",
    studentCity: "Ciudad del Estudiante",
    studentPostalCode: "Código Postal del Estudiante",
    studentCountry: "País del Estudiante",
    relationToStudent: "Relación con el Estudiante",
    guardianFirstName: "Primer Nombre del Representante",
    guardianMiddleName: "Segundo Nombre del Representante",
    guardianLastNames: "Apellidos del Representante",
    guardianStreetAddress: "Dirección del Representante",
    guardianCity: "Ciudad del Representante",
    guardianPostalCode: "Código Postal del Representante",
    guardianCountry: "País del Representante",
    guardianHomePhone: "Teléfono de Casa del Representante",
    guardianMobilePhone: "Teléfono Móvil del Representante",
    guardianEmail: "Correo Electrónico del Representante",
  },
  contacto: {
    name: "Nombre",
    phone: "Teléfono",
    subject: "Asunto",
    message: "Mensaje",
  },
};

export interface Attachment {
  filename: string;
  base64: string;
}

export interface OutgoingEmail {
  subject: string;
  text: string;
  attachment?: Attachment;
}

export interface ExamResultLine {
  prompt: string;
  answered: boolean;
  correct: boolean;
  selected_text?: string | null;
}

function titleCase(s: string): string {
  return s.replace(/(^|\s)(\S)/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

export function formEmail(source: string, data: Record<string, unknown>): OutgoingEmail {
  const labels = COLUMN_MAPPING[source] ?? {};
  const lines = Object.entries(data).map(([key, value]) => `${labels[key] ?? key}: ${String(value ?? "")}`);
  return {
    subject: `Nuevo Mensaje Del Formulario De ${titleCase(source)}`,
    text: `Nuevo mensaje:\n\n${lines.join("\n")}\n`,
  };
}

export function careersEmail(base64: string, filename: string): OutgoingEmail {
  return {
    subject: "Nueva Solicitud de Empleo",
    text: "Adjunto el CV.",
    attachment: { filename, base64 },
  };
}

export function examEmail(data: Record<string, unknown>): OutgoingEmail {
  const results = Array.isArray(data.results) ? (data.results as ExamResultLine[]) : [];
  const lines = [
    `Nombre: ${data.name ?? "N/A"}`,
    `Email: ${data.email ?? "N/A"}`,
    `Teléfono: ${data.phone ?? "N/A"}`,
    "",
    `Puntaje: ${data.score ?? "N/A"}/100`,
    "",
    "Resultados por pregunta:",
    "",
  ];

  for (const r of results) {
    const status = !r.answered ? "NO RESPONDIDA" : r.correct ? "CORRECTA" : "INCORRECTA";
    lines.push(`- ${r.prompt}`);
    if (r.selected_text) lines.push(`  Respuesta seleccionada: ${r.selected_text}`);
    lines.push(`  Resultado: ${status}`, "");
  }

  return { subject: "Resultado de Examen de Inglés", text: lines.join("\n") };
}

export function attachmentContentType(filename: string): string {
  const ext = filename.toLowerCase().split(".").pop();
  if (ext === "pdf") return "application/pdf";
  if (ext === "docx") return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (ext === "doc") return "application/msword";
  return "application/octet-stream";
}
