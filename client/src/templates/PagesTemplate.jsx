import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const PagesTemplate = () => {
  return (
    <div className="bg-mainBg bg-no-repeat bg-cover bg-fixed h-full flex flex-col overflow-scroll items-center font-Archivo">
      <div className="flex flex-row justify-center items-center mt-12 h-24">
        <Link className="h-5/6 w-5/6" to="/">
          <img src={logo} alt="Logo" className="h-full" />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PagesTemplate;
