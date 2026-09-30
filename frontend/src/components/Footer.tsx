import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/cevda_logo_tr.png";
import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";
import { useNavItems } from "../hooks/useNavItems";
import { TransitionLink } from "./ui/TransitionLink";
import Sticker from "./Sticker";

const MAPS_URL = "https://maps.app.goo.gl/CVupFTzgSk3Diy7p8";
const WHATSAPP_URL = "https://wa.me/+18498868485";
const INSTAGRAM_URL = "https://www.instagram.com/centroeducativovilladeangeles/";

interface ContactRowProps {
  href: string;
  icon: string;
  label: string;
  value: string;
  external?: boolean;
  wide?: boolean;
}

const ContactRow: React.FC<ContactRowProps> = ({ href, icon, label, value, external, wide }) => (
  <li className={wide ? "sm:col-span-2" : undefined}>
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-start gap-4 rounded-card p-3 -m-3 transition-colors duration-200 hover-fine:bg-white/[0.06]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950 transition-transform duration-300 group-hover-fine:-rotate-12">
        <i className={`${icon} text-lg`} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-blue-200">{label}</span>
        <span className="block break-words text-[17px] leading-snug text-white">{value}</span>
      </span>
    </a>
  </li>
);

const Footer: React.FC = () => {
  const { t } = useTranslation("nav");
  const navItems = useNavItems();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-dark relative mt-20 overflow-hidden rounded-t-[2rem] bg-blue-900 text-white md:mt-24 md:rounded-t-[3rem]">
      <Sticker
        name="plane"
        rotate={-10}
        parallax={30}
        className="right-[6%] top-10 hidden h-28 w-28 md:block"
      />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-10 pt-16 md:grid-cols-12 md:px-8 md:pt-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-2 md:h-24 md:w-24">
              <img src={logo} alt="" width={96} height={96} className="h-full w-full object-contain" />
            </span>
            <p translate="no" className="font-brand text-[2rem] leading-[1.05] md:text-[2.6rem]">
              Centro Educativo
              <br />
              Villa de Ángeles
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-white/10 px-5 font-semibold text-white transition-colors duration-200 hover-fine:bg-white/20"
          >
            <i className="fab fa-instagram text-xl" aria-hidden />
            {t("footer.instagram")}
          </a>
        </div>

        <ul className="grid gap-7 sm:grid-cols-2 md:col-span-7">
          <ContactRow
            href={MAPS_URL}
            icon="fas fa-location-dot"
            label={t("footer.visit")}
            value={FULL_ADDRESS}
            external
            wide
          />
          <ContactRow
            href={`tel:+1${PHONE_NUMBER.replace(/\D/g, "")}`}
            icon="fas fa-phone"
            label={t("footer.call")}
            value={PHONE_NUMBER}
          />
          <ContactRow
            href={WHATSAPP_URL}
            icon="fab fa-whatsapp"
            label={t("footer.whatsapp")}
            value={PHONE_NUMBER}
            external
          />
          <ContactRow
            href={`mailto:${EMAIL_ADDRESS}`}
            icon="fas fa-envelope"
            label={t("footer.write")}
            value={EMAIL_ADDRESS}
            wide
          />
        </ul>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/15 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <nav aria-label={t("footer.pages")}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <TransitionLink
                  to={item.to}
                  className="inline-flex min-h-11 items-center text-[15px] font-semibold text-blue-100 transition-colors duration-200 hover-fine:text-amber-300"
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-blue-200">
          &copy; {currentYear} Centro Educativo Villa de Ángeles
        </p>
      </div>
    </footer>
  );
};

export default Footer;
