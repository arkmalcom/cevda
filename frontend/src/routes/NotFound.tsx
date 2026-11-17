import React from "react";
import { useTranslation } from "react-i18next";
import PageIntro from "../components/PageIntro";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <PageIntro title={t("notFound.title")} lead={t("notFound.lead")}>
      <div className="mt-10">
        <Button to="/" variant="light" icon="fa-house">
          {t("notFound.cta")}
        </Button>
      </div>
    </PageIntro>
  );
};

export default NotFound;
