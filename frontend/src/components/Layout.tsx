import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Navigation />
      <div>
        <Outlet />
      </div>
      <div className="fixed bottom-24 lg:right-10 right-4">
        <a
          href="https://wa.me/+18498868485"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp text-4xl text-green-500"></i>
        </a>
      </div>
      <div className="fixed top-24 lg:right-10 right-4 flex items-center">
        {i18n.language === "en" ? (
          <button
            onClick={() => changeLanguage("es")}
            aria-label="Cambiar Idioma a Español"
            className="bg-amber-500 rounded-sm"
          >
            <img
              src="https://flagcdn.com/w40/do.png"
              alt="Dominican Republic Flag"
              className="w-10 h-6 rounded-sm hover:opacity-80"
            />
          </button>
        ) : (
          <button
            onClick={() => changeLanguage("en")}
            aria-label="Change Language to English"
            className="bg-amber-500 rounded-sm"
          >
            <img
              src="https://flagcdn.com/w40/us.png"
              alt="US Flag"
              className="w-10 h-6 rounded-sm hover:opacity-80"
            />
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
