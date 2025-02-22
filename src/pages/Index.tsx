import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import CategorySection from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import JSONCategories from "../../assets/mocks/categories.json";
import JSONProducts from "../../assets/mocks/products.json";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  function getSeason() {
    const month = new Date().getMonth();

    if (month >= 2 && month <= 4) return t("summer"); // Весна → Літо
    if (month >= 5 && month <= 7) return t("autumn"); // Літо → Осінь
    if (month >= 8 && month <= 10) return t("winter"); // Осінь → Зима
    return t("spring"); // Зима → Весна
  }

  const categories = JSONCategories as Category[];
  const products = JSONProducts as Product[];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />

      {/* Hero Section with Enhanced Header */}
      <div className="bg-gradient-to-r h-[500px] flex flex-col items-center justify-center pt-[150px] from-agro-dark via-agro-DEFAULT to-agro-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            {t("home-header-title")}
          </h1>
          <p className="text-l md:text-1xl mb-8 max-w-2xl mx-auto">
            {t("home-header-subtitle")}
          </p>
          <Link to="/categories">
            <button className="bg-[#1c8d00] text-agro-DEFAULT hover:bg-[#219e02] text-lg px-8 py-3 rounded-lg transition-colors">
              {t("explore-products-text")}
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section with Carousel */}
      <CategorySection categories={categories} t={t} />

      {/* Next Seasonal Products Section */}
      <section className="container mx-auto px-4 py-16 h-[60vh]">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t("home-seasonal-section-title") +
            " " +
            getSeason() +
            " " +
            new Date().getFullYear()}
        </h2>
        <Carousel className="w-full h-full max-w-5xl mx-auto">
          <CarouselContent className="w-full h-[90%]">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/4 lg:basis-1/4 h-full min-w-[300px] flex flex-col items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <img
                    src={product.photo}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col items-center justify-between">
                    <div className="w-full h-40">
                      <Badge variant="secondary" className="mb-2">
                        {product.category.name}
                      </Badge>
                      <h3 className="text-lg font-semibold mt-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {product.price} грн / {product.minimal_order} шт
                      </p>
                    </div>
                    <div className="w-full">
                      <Button
                        className="w-full mt-4 bg-transparent text-black hover:bg-transparent rounded-lb border-[2px]"
                        onClick={() => {
                          window.open("/products?productId=" + product.id);
                        }}
                      >
                        <p className="color-black">More</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t("home-latest-article-section-title")}
        </h2>
        <div className="flex flex-row justify-center items-center gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="md:basis-1/4 lg:basis-1/4">
              <div
                onClick={() => handleCategoryClick(category.name)}
                className="block relative group overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={category.photo}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                  <h3 className="text-white text-2xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
