import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import Footer from "./Footer";
import MotionProvider from "./motion/MotionProvider";
import { getPageMeta } from "../seo";

const Layout = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("en") ? "en" : "es";
  }, [i18n.language]);

  useEffect(() => {
    const meta = getPageMeta(location.pathname, i18n.language.startsWith("en") ? "en" : "es");
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [location.pathname, i18n.language]);

  return (
    <MotionProvider>
      <div className="print:hidden">
        <Navigation />
      </div>
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <div className="fixed bottom-4 right-4 z-40 print:hidden lg:bottom-6 lg:right-6">
        <a
          href="https://wa.me/+18498868485"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-palm text-white shadow-lift ring-4 ring-white transition-transform duration-200 active:scale-[0.97] hover-fine:-rotate-6"
        >
          <i className="fab fa-whatsapp text-[1.75rem]" aria-hidden />
        </a>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </MotionProvider>
  );
};

export default Layout;
