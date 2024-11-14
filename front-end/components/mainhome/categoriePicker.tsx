import React from "react";

const categoriePicker: React.FC = () => {
  return (
    <>
      <div className="bg-white h-2/6 flex mt-5 mb-5">
        <img
          className="bg-black text-white flex items-center w-1/12 hover:cursor-pointer"
          src="/arrow_circle_left.svg"
          alt="arrow left"
          onClick={() => console.log("left clicked")}
        />
        <div className="bg-black text-white flex items-center grow justify-center h-full">
          <img className="h-10" src="/logo-512.svg" alt="" />
        </div>
        <img
          className="bg-black text-white flex items-center w-1/12 hover:cursor-pointer"
          src="/arrow_circle_right.svg"
          alt="arrow right"
          onClick={() => console.log("right clicked")}
        />
      </div>
    </>
  );
};

export default categoriePicker;
