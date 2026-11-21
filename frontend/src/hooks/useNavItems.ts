import { useTranslation } from "react-i18next";

import { CALENDAR_ENABLED } from "../features";

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
    ...(CALENDAR_ENABLED ? [{ to: "/calendario", label: t("calendar") }] : []),
    { to: "/infotep", label: "Infotep" },
    { to: "/carreras", label: t("careers") },
    { to: "/contacto", label: t("contact") },
  ];
}
