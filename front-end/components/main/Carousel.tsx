"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: React.ReactNode[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = items.length;
  const itemsPerPage = 3;

  const nextItems = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
  };

  const prevItems = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems
    );
  };

  const visibleItems = () => {
    const endIndex = (currentIndex + itemsPerPage) % totalItems;
    if (endIndex > currentIndex) {
      return items.slice(currentIndex, endIndex);
    } else {
      return [...items.slice(currentIndex), ...items.slice(0, endIndex)];
    }
  };

  return (
      <div className="overflow-hidden gap-4 flex w-full justify-between	items-center">
          <button
            className="rounded-full bg-white p-2 shadow-md h-10 w-10"
            onClick={prevItems}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="w-full flex gap-4 justify-center">
          {visibleItems()}
          </div>
          <button
            className="rounded-full bg-white p-2 shadow-md h-10 w-10"
            onClick={nextItems}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
  );
}
