import { describe, expect, it } from "vitest";
import { attachmentContentType, careersEmail, examEmail, formEmail } from "../src/email-content";

describe("formEmail", () => {
  it("labels known contact fields and title-cases the subject", () => {
    const email = formEmail("contacto", { name: "Ana", phone: "809", subject: "Hola", message: "Texto" });
    expect(email.subject).toBe("Nuevo Mensaje Del Formulario De Contacto");
    expect(email.text).toBe("Nuevo mensaje:\n\nNombre: Ana\nTeléfono: 809\nAsunto: Hola\nMensaje: Texto\n");
  });

  it("handles the accented admisión source and unknown keys", () => {
    const email = formEmail("admisión", { studentNames: "Luis", extra: 1 });
    expect(email.subject).toBe("Nuevo Mensaje Del Formulario De Admisión");
    expect(email.text).toContain("Nombres de Estudiante: Luis");
    expect(email.text).toContain("extra: 1");
  });
});

describe("examEmail", () => {
  it("renders per-question results", () => {
    const email = examEmail({
      name: "Ana",
      email: "a@b.c",
      phone: "+1809",
      score: 50,
      results: [
        { prompt: "Q1", answered: true, correct: true, selected_text: "x" },
        { prompt: "Q2", answered: true, correct: false, selected_text: "y" },
        { prompt: "Q3", answered: false, correct: false, selected_text: null },
      ],
    });
    expect(email.subject).toBe("Resultado de Examen de Inglés");
    expect(email.text).toContain("Puntaje: 50/100");
    expect(email.text).toContain("- Q1\n  Respuesta seleccionada: x\n  Resultado: CORRECTA");
    expect(email.text).toContain("- Q2\n  Respuesta seleccionada: y\n  Resultado: INCORRECTA");
    expect(email.text).toContain("- Q3\n  Resultado: NO RESPONDIDA");
  });
});

describe("careersEmail / attachmentContentType", () => {
  it("builds an attachment email", () => {
    const email = careersEmail("QUJD", "cv.pdf");
    expect(email.subject).toBe("Nueva Solicitud de Empleo");
    expect(email.attachment).toEqual({ filename: "cv.pdf", base64: "QUJD" });
  });

  it("maps extensions", () => {
    expect(attachmentContentType("CV.PDF")).toBe("application/pdf");
    expect(attachmentContentType("cv.docx")).toContain("wordprocessingml");
    expect(attachmentContentType("cv.bin")).toBe("application/octet-stream");
  });
});
