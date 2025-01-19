import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import careers from "../assets/careers/careers.jpg";

const Careers: React.FC = () => {
  const { t } = useTranslation("careers");
  const STAGE = import.meta.env.VITE_STAGE;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert(t("form.noFileSelected"));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert(t("form.fileTooLarge"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64File = (reader.result as string).split(",")[1];

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/${STAGE}/email-handler-${STAGE}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              formSource: "carreras",
              file: base64File,
              filename: selectedFile.name,
            }),
          },
        );

        const responseData = await response.json();

        if (response.ok) {
          alert(t("form.successMessage"));
        } else {
          alert(responseData.message || t("form.errorMessage"));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(t("form.errorMessage"));
      }
    };
  };

  return (
    <div>
      <div className="flex max-lg:flex-col max-lg:space-y-2 lg:space-x-2 p-1 text-justify">
        <div className="flex flex-col space-y-2 rounded-md border-amber-500 border-2 p-1 lg:w-1/2">
          <h1 className="text-center text-3xl text-blue-800">
            {t("careers.title")}
          </h1>
          <img src={careers} alt="careers" className="w-auto h-1/2 mx-auto" />
          <p>{t("careers.description")}</p>
          <input
            type="file"
            accept=".pdf, .docx"
            onChange={handleFileChange}
            className="block w-full text-center"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 w-52 mx-auto rounded hover:bg-blue-600"
          >
            {t("submit", { ns: "common" })}
          </button>
        </div>
        <div className="rounded-md border-amber-200 bg-amber-500 border-2 p-1">
          <h1>{t("aboutUs.title")}</h1>
          <p>{t("aboutUs.description")}</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
