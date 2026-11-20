import { useTranslation } from "react-i18next";

export interface NavItem {
  to: string;
  label: string;
}

export function useNavItems(): NavItem[] {
  const { t } = useTranslation("nav");
  return [
    { to: "/", label: t("home") },
    { to: "/admision", label: t("admission") },
    { to: "/caracteristicas", label: t("features") },
    { to: "/calendario", label: t("calendar") },
    { to: "/infotep", label: "Infotep" },
    { to: "/carreras", label: t("careers") },
    { to: "/contacto", label: t("contact") },
  ];
}
