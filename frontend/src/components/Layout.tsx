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
      <div className="fixed bottom-24 lg:right-10 right-6">
        <a
          href="https://wa.me/+18498868485"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp text-4xl text-green-500"></i>
        </a>
      </div>
      <div className="fixed bottom-24 lg:left-10 left-6 flex items-center space-x-2">
        <button
          onClick={() => changeLanguage("es")}
          aria-label="Change to Spanish"
        >
          <img
            src="https://flagcdn.com/w40/do.png"
            alt="Dominican Republic Flag"
            className="w-10 h-10 rounded-full"
          />
        </button>
        <button
          onClick={() => changeLanguage("en")}
          aria-label="Change to English"
        >
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="US Flag"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
