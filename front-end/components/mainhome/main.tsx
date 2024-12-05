import React from "react";
import CategoriePicker from "@/components/mainhome/categoriePicker";
import ProductPicker from "./productPicker";
import LoginTable from "../loginTable/loginTable";

const Main: React.FC = () => {
  return (
    <>
      <div className="h-svh ml-5 mr-5">
        <CategoriePicker />
        <ProductPicker />
        <LoginTable />
      </div>
    </>
  );
};

export default Main;
