import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

export default function CategorySection({ categories, t }) {
  const [hoveredCategory, setHoveredCategory] = useState(false);


  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {t("home-category-section-title")}
      </h2>
      <div className="flex flex-wrap justify-center gap-4 p-4 border rounded-lg bg-white shadow-lg overflow-visible max-w-6xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative group flex flex-col items-center space-y-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all w-28"
            onClick={() => setHoveredCategory(!hoveredCategory)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <span className="font-semibold text-center text-sm truncate w-full">
              {category.name}
            </span>

            {hoveredCategory && category.subcategories && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg border rounded-lg p-2 z-50 max-h-60 overflow-auto">
                {category.subcategories.map((sub, index) => (
                  <Link to={"/products?subcategory=" + sub.id} target="_blank">
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer relative"
                    >
                      {sub.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
