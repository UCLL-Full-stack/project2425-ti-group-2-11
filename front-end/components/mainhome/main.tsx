import React from "react";
import CategoriePicker from "@/components/mainhome/categoriePicker";
import ProductPicker from "./productPicker";

const Main: React.FC = () => {
  return (
    <>
      <div className="h-svh ml-5 mr-5">
        <CategoriePicker />
        <ProductPicker />
      </div>
    </>
  );
};

export default Main;
