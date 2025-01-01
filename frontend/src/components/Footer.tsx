import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="pt-20">
      <footer className="flex fixed bottom-0 p-2 bg-amber-500 text-white w-full items-center">
        <div className="text-xs w-96">
          <p className="font-bold">Calle 1ra, etc. etc.</p>
          <p>(809) 555-5555</p>
          <p>@centroeducativovilladeangeles</p>
          <p>centrovilladeangeles@gmail.com</p>
        </div>
        <div className="flex flex-row w-full gap-3 lg:gap-5 lg:justify-center items-center justify-end lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <i className="fab fa-instagram"></i>
          <i className="fab fa-whatsapp"></i>
          <i className="fas fa-envelope"></i>
          <i className="fas fa-map-marker-alt"></i>
        </div>
      </footer>
    </div>
  );
};


export default Footer;
