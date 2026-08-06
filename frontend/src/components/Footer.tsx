import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer: React.FC = () => {
  const currentYear = getCurrentYear();

  return (
    <div className="pt-10">
      <footer className="fixed bottom-0 z-40 grid w-full grid-cols-3 items-center bg-amber-500 p-2 text-white">
        <div className="justify-self-start text-xs">
          <p className="hidden lg:block">
            &copy; {currentYear} Centro Educativo Villa de Angeles
          </p>
          <p className="lg:hidden">&copy; {currentYear} CEVDA</p>
        </div>
        <div className="flex items-center justify-center gap-6 justify-self-center">
          <a
            href="https://www.instagram.com/centroeducativovilladeangeles/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/+18498868485"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="mailto:centrovilladeangeles@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://maps.app.goo.gl/CVupFTzgSk3Diy7p8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Map"
          >
            <i className="fas fa-map-marker-alt"></i>
          </a>
        </div>
        <div aria-hidden className="justify-self-end" />
      </footer>
    </div>
  );
};

export default Footer;
