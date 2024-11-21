import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="l:flex l:flex-row pb-5 pt-5">
      <div className="flex justify-between	">
        <img
          src="/logo-512.svg"
          alt="Logo User Bazaar"
          className="w-2/12 mr-5 ml-5"
        />
        <div className="flex mr-5 justify-end">
          <img
            src="/google-person.svg"
            alt="Person Icon link to profile"
            className="w-2/12 min-w-[40px] hover:cursor-pointer"
            onClick={() => { location.href = '/login' }}
          />
          <img
            src="/google-shopping-cart.svg"
            alt="Person Icon link to shopping cart"
            className="w-2/12 min-w-[40px]"
          />
        </div>
      </div>
      <div className="flex place-content-center w-full mt-4 sticky  top-0">
        <div className="relative w-full ml-5 mr-5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-5 pr-16 border rounded-full text-2xl"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span className="material-icons text-gray-500 text-2xl">
              search
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;