import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="pt-12">
      <footer className="flex fixed bottom-0 p-2 gap-5 bg-amber-500 text-white w-full items-center justify-center">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-whatsapp"></i>
        <i className="fas fa-envelope"></i>
        <i className="fas fa-map-marker-alt"></i>
      </footer>
    </div>
  );
};


export default Footer;
