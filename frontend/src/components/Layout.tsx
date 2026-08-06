import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="print:hidden">
        <Navigation />
      </div>
      <main className={isHome ? "" : "pt-16 print:pt-0"}>
        <Outlet />
      </main>
      <div className="fixed bottom-24 right-4 z-40 print:hidden lg:right-10">
        <a
          href="https://wa.me/+18498868485"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <i className="fab fa-whatsapp text-4xl text-green-500"></i>
        </a>
      </div>
      <div className="fixed top-20 right-4 z-40 flex items-center print:hidden lg:right-10">
        {i18n.language === "en" ? (
          <button
            onClick={() => changeLanguage("es")}
            aria-label="Cambiar Idioma a Español"
            className="rounded-sm bg-amber-500"
          >
            <img
              src="https://flagcdn.com/w40/do.png"
              alt="Dominican Republic Flag"
              className="h-6 w-10 rounded-sm hover:opacity-80"
            />
          </button>
        ) : (
          <button
            onClick={() => changeLanguage("en")}
            aria-label="Change Language to English"
            className="rounded-sm bg-amber-500"
          >
            <img
              src="https://flagcdn.com/w40/us.png"
              alt="US Flag"
              className="h-6 w-10 rounded-sm hover:opacity-80"
            />
          </button>
        )}
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
