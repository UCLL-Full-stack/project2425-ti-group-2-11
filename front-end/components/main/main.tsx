"use client";

import { Carousel } from "@/components/main/Carousel";
import { ScrollableRow } from "@/components/main/ScrollableRow";
import { ProductCard } from "@/components/main/ProductCard";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

interface Product {
  id: number;
  name: string;
  price: number;
  media: string;
}

export default function Home() {
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);
  const [amountLoaded, setAmountLoaded] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/products/desc/limit/${amountLoaded}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [amountLoaded]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{t('index.featured')}</h2>
        <div className="md:hidden">
          <Carousel
            items={products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                media={product.media}
              />
            ))}
          />
        </div>
        <div className="hidden md:block">
          <ScrollableRow
            items={products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                media={product.media}
              />
            ))}
          />
        </div>
      </section>
    </div>
  );
}
