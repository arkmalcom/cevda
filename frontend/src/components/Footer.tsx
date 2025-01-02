import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
}

const Footer: React.FC = () => {
  const currentYear = getCurrentYear();

  return (
    <div className="pt-12">
      <footer className="flex fixed bottom-0 p-2  bg-amber-500 text-white w-full items-center">
        <div className="lg:block hidden text-xs w-1/4">
          <p>&copy; {currentYear} Centro Educativo Villa de Angeles</p>
        </div>
        <div className="lg:hidden block text-xs w-1/4">
          <p>&copy; {currentYear} CEVDA</p>
        </div>
        <div className="gap-6 flex justify-center items-center w-1/2">
          <a href="https://www.instagram.com/centroeducativovilladeangeles/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/+18498868485" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
          </a>
          <a href="mailto:centrovilladeangeles@gmail.com">
              <i className="fas fa-envelope"></i>
          </a>
          <a href="https://maps.app.goo.gl/CVupFTzgSk3Diy7p8" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-map-marker-alt"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};


export default Footer;
