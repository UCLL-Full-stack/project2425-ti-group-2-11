import React, { useState, useEffect } from "react";
import CategoriePicker from "@/components/mainhome/categoriePicker";
import ProductPicker from "./productPicker";
import LoginTable from "../loginTable/loginTable";

const Main: React.FC = () => {
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogedIn(true);
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <>
      <div className="h-svh ml-5 mr-5">
        <CategoriePicker />
        <ProductPicker />
        <LoginTable />
        {logedIn && <p>You are logged in</p>}
      </div>
    </>
  );
};

export default Main;