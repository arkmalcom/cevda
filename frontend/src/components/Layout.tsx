import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = () => {
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
      <Footer />
    </>
  );
};

export default Layout;
