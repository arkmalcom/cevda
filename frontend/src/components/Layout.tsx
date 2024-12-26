import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col lg:w-5/6 items-center lg:justify-center lg:mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
