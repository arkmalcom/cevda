import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import logo from "../assets/cevda_logo_tr.png";
import { useNavItems } from "../hooks/useNavItems";
import { TransitionLink, TransitionNavLink } from "./ui/TransitionLink";
import { stickerArt } from "./stickerArt";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
const HIDE_AFTER_PX = 140;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LanguageToggle: React.FC<{ tone?: "light" | "dark" }> = ({ tone = "dark" }) => {
  const { t, i18n } = useTranslation("nav");
  const isEnglish = i18n.language.startsWith("en");
  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(isEnglish ? "es" : "en")}
      aria-label={t("switchLanguage")}
      className={`flex h-11 items-center gap-2 rounded-full px-3 text-sm font-bold transition-colors duration-200 ${
        tone === "light"
          ? "text-white hover-fine:bg-white/10"
          : "text-blue-900 hover-fine:bg-blue-900/[0.06]"
      }`}
    >
      <img
        src={isEnglish ? "https://flagcdn.com/w40/do.png" : "https://flagcdn.com/w40/us.png"}
        alt=""
        width={24}
        height={16}
        className="h-4 w-6 rounded-[3px] object-cover"
      />
      <span>{isEnglish ? "ES" : "EN"}</span>
    </button>
  );
};

const Navigation: React.FC = () => {
  const { t } = useTranslation("nav");
  const navItems = useNavItems();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = current > previous;
    setIsHidden(scrollingDown && current > HIDE_AFTER_PX);
  });

  useEffect(() => {
    setIsMenuOpen(false);
    setIsHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (isMenuOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.18 } },
        exit: { opacity: 0, transition: { duration: 0.12 } },
      }
    : {
        initial: { clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" },
        animate: {
          clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)",
          transition: { duration: 0.55, ease: EASE_OUT },
        },
        exit: {
          clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)",
          transition: { duration: 0.3, ease: EASE_IN_OUT },
        },
      };

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary fixed left-4 top-4 z-[70] -translate-y-24 focus-visible:translate-y-0"
      >
        {t("skipToContent")}
      </a>

      <m.header
        className="fixed inset-x-3 top-3 z-50 mx-auto max-w-6xl md:inset-x-5"
        initial={false}
        animate={{ y: isHidden && !isMenuOpen ? -96 : 0 }}
        transition={{ duration: isHidden ? 0.25 : 0.4, ease: EASE_OUT }}
      >
        <nav
          aria-label={t("mainNav")}
          className="flex h-16 items-center gap-2 rounded-full bg-sheet/90 pl-2 pr-2 shadow-sheet ring-1 ring-blue-900/[0.07] backdrop-blur-md"
        >
          <TransitionLink
            to="/"
            className="flex min-w-0 items-center gap-2 rounded-full py-1 pl-1 pr-3"
          >
            <img src={logo} alt="" width={48} height={48} className="h-12 w-12 shrink-0" />
            <span translate="no" className="font-brand text-xl leading-none text-blue-900">
              <span className="xl:hidden">CEVDA</span>
              <span className="hidden whitespace-nowrap xl:inline">
                Centro Educativo Villa de Ángeles
              </span>
            </span>
          </TransitionLink>

          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <TransitionNavLink
                  to={item.to}
                  end={item.to === "/"}
                  className="relative flex h-11 items-center rounded-full px-3.5 text-[15px] font-semibold text-blue-900 transition-colors duration-200 hover-fine:text-blue-700"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <m.span
                          layoutId="nav-highlight"
                          className="absolute inset-x-0 inset-y-1.5 -z-10 rounded-full bg-amber-300"
                          transition={{ duration: 0.4, ease: EASE_OUT }}
                        />
                      )}
                      {item.label}
                    </>
                  )}
                </TransitionNavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 lg:ml-1">
            <LanguageToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-lg text-white transition-transform duration-150 active:scale-[0.97] lg:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <i className="fas fa-bars" aria-hidden />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("mainNav")}
            className="menu-panel surface-dark fixed inset-0 z-[60] flex min-h-[100dvh] flex-col overflow-y-auto overscroll-contain text-white lg:hidden"
            {...panelMotion}
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5">
                  <img src={logo} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="font-brand text-2xl leading-none">CEVDA</span>
              </div>
              <button
                type="button"
                autoFocus
                className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg text-blue-950 transition-transform duration-150 active:scale-[0.97]"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("closeMenu")}
              >
                <i className="fas fa-times" aria-hidden />
              </button>
            </div>

            <m.ul
              className="flex flex-1 flex-col justify-center gap-1 px-6 py-10"
              initial="hidden"
              animate="shown"
              variants={{
                hidden: {},
                shown: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
              }}
            >
              {navItems.map((item) => (
                <m.li
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                  }}
                >
                  <TransitionNavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `group flex min-h-14 items-center gap-3 font-display text-[2.1rem] font-extrabold leading-tight tracking-tight ${
                        isActive ? "text-amber-400" : "text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <img src={stickerArt.star} alt="" aria-hidden className="h-8 w-8" />
                        )}
                      </>
                    )}
                  </TransitionNavLink>
                </m.li>
              ))}
            </m.ul>

            <div className="flex items-center justify-between border-t border-white/15 px-5 py-4">
              <LanguageToggle tone="light" />
              <a
                href="https://wa.me/+18498868485"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-white"
              >
                <i className="fab fa-whatsapp text-lg" aria-hidden />
                {t("footer.whatsapp")}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
