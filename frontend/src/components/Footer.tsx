import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 p-5 bg-amber-500 text-white w-full">
      <div className="flex flex-row gap-5 justify-center items-center">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-whatsapp"></i>
        <i className="fas fa-envelope"></i>
        <i className="fas fa-map-marker-alt"></i>
      </div>
    </footer>
  );
};

export default Footer;
