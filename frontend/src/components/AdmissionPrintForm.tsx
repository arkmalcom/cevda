import React from "react";
import { useTranslation } from "react-i18next";

const PrintLine: React.FC<{ label: string; className?: string }> = ({
  label,
  className = "",
}) => (
  <div className={`flex min-w-0 flex-1 flex-col gap-1 ${className}`}>
    <div className="h-7 border-b border-black" />
    <span className="text-[10px] uppercase tracking-wide text-black">
      {label}
    </span>
  </div>
);

const PrintCheck: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-1.5 text-xs text-black">
    <span className="inline-block h-3.5 w-3.5 rounded-full border border-black" />
    {label}
  </span>
);

const AdmissionPrintForm: React.FC = () => {
  const { t } = useTranslation("admission");

  return (
    <div className="admission-print-only hidden print:block">
      <header className="mb-6 border-b-2 border-black pb-3 text-center">
        <p className="font-brand text-2xl text-black">
          Centro Educativo Villa de Ángeles
        </p>
        <h1 className="mt-1 text-lg font-bold uppercase tracking-wide text-black">
          {t("title")}
        </h1>
        <div className="mt-3 flex justify-end">
          <PrintLine label={t("print.date")} className="max-w-[10rem]" />
        </div>
      </header>

      <section className="mb-5">
        <h2 className="mb-3 border-b border-black pb-1 text-sm font-bold uppercase text-black">
          {t("form.studentInfo.title")}
        </h2>
        <div className="mb-3 flex gap-3">
          <PrintLine label={t("form.studentInfo.names")} />
          <PrintLine label={t("form.studentInfo.firstSurname")} />
          <PrintLine label={t("form.studentInfo.secondSurname")} />
        </div>
        <div className="mb-3 flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wide text-black">
              {t("form.gender.title")}
            </span>
            <div className="flex gap-4 py-1">
              <PrintCheck label={t("form.gender.male")} />
              <PrintCheck label={t("form.gender.female")} />
            </div>
          </div>
          <PrintLine
            label={t("form.studentInfo.dob")}
            className="max-w-[12rem]"
          />
          <PrintLine
            label={t("form.studentInfo.enteringYear")}
            className="max-w-[10rem]"
          />
        </div>
        <p className="mb-2 text-xs font-semibold text-black">
          {t("form.address.title")}
        </p>
        <div className="mb-3">
          <PrintLine label={t("form.address.street")} />
        </div>
        <div className="flex gap-3">
          <PrintLine label={t("form.address.city")} />
          <PrintLine label={t("form.address.postalCode")} />
          <PrintLine label={t("form.address.country")} />
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-3 border-b border-black pb-1 text-sm font-bold uppercase text-black">
          {t("form.guardianInfo.title")}
        </h2>
        <div className="mb-3 flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wide text-black">
              {t("form.guardianInfo.relationToStudent.title")}
            </span>
            <div className="flex flex-wrap gap-3 py-1">
              <PrintCheck
                label={t("form.guardianInfo.relationToStudent.mother")}
              />
              <PrintCheck
                label={t("form.guardianInfo.relationToStudent.father")}
              />
              <PrintCheck
                label={t("form.guardianInfo.relationToStudent.guardian")}
              />
              <PrintCheck
                label={t("form.guardianInfo.relationToStudent.other")}
              />
            </div>
          </div>
        </div>
        <div className="mb-3 flex gap-3">
          <PrintLine label={t("form.guardianInfo.firstName")} />
          <PrintLine label={t("form.guardianInfo.middleName")} />
          <PrintLine label={t("form.guardianInfo.surnames")} />
        </div>
        <div className="mb-3 flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wide text-black">
              {t("form.gender.title")}
            </span>
            <div className="flex gap-4 py-1">
              <PrintCheck label={t("form.gender.male")} />
              <PrintCheck label={t("form.gender.female")} />
            </div>
          </div>
        </div>
        <p className="mb-2 text-xs font-semibold text-black">
          {t("form.address.title")}
        </p>
        <div className="mb-3">
          <PrintLine label={t("form.address.street")} />
        </div>
        <div className="mb-3 flex gap-3">
          <PrintLine label={t("form.address.city")} />
          <PrintLine label={t("form.address.postalCode")} />
          <PrintLine label={t("form.address.country")} />
        </div>
        <div className="flex gap-3">
          <PrintLine label={t("form.guardianInfo.homePhone")} />
          <PrintLine label={t("form.guardianInfo.mobilePhone")} />
          <PrintLine label={t("form.guardianInfo.email")} />
        </div>
      </section>

      <section className="mt-8 flex gap-8">
        <PrintLine label={t("print.signature")} />
        <PrintLine label={t("print.date")} className="max-w-[10rem]" />
      </section>
    </div>
  );
};

export default AdmissionPrintForm;
