import React, { useEffect, useState } from "react";

const ProductPicker: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/desc/limit/10");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!products.length) {
    return <div>Loading...</div>;
  }

  const currentProduct = products[currentIndex];

  return (
    <>
      <div className="h-2/6 flex mt-5 mb-5">
        <div key={currentProduct.id}></div>
        <img
          className="flex items-center w-1/12 hover:cursor-pointer"
          src="/arrow_circle_left.svg"
          alt="arrow left"
          onClick={handleLeftClick}
        />
        <div className="flex items-center grow justify-center h-full flex-col">
          <img
            className="h-4/6"
            src={currentProduct.media}
            alt={currentProduct.name}
          />
          <div>
            <h2>{currentProduct.name}</h2>
            <p>€{currentProduct.price}</p>
          </div>
        </div>
        <img
          className="flex items-center w-1/12 hover:cursor-pointer"
          src="/arrow_circle_right.svg"
          alt="arrow right"
          onClick={handleRightClick}
        />
      </div>
    </>
  );
};

export default ProductPicker;
