import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./ui/lang-switcher";
import Logo from "../../assets/images/shop logo.png";

const Navbar = ({ categories }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full z-[999] bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="text-2l font-bold text-agro-DEFAULT flex flex-row items-end justify-around w-[210px] h-full"
            >
              <img
                src={Logo}
                alt="novosad.in.ua Logo"
                className="w-[30px] h-[30px]"
              />
              <p className="text-center">{t("company-nane")}</p>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/categories" className="text-gray-700 hover:text-agro-DEFAULT">
              {t("nav-home-title")}
            </Link>
            <div
              className="relative text-gray-700 hover:text-agro-DEFAULT cursor-pointer"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              {t("nav-product-title")}
              {isCategoriesOpen && (
                <div className="absolute left-0 mt-1 w-60 bg-white shadow-lg border rounded-lg p-2 z-50">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer relative"
                      onMouseEnter={() => setHoveredCategory(category.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {category.name}
                      {hoveredCategory === category.name &&
                        category.subcategories?.length > 0 && (
                          <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg border rounded-lg p-2 z-50">
                            {category.subcategories.map((sub, index) => (
                              <Link to={"/products?subcategory=" + sub.id}>
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
              )}
            </div>
            <Link
              to="/articles"
              className="text-gray-700 hover:text-agro-DEFAULT"
            >
              {t("nav-article-title")}
            </Link>
            <Link
              to="/payments-and-delivery"
              className="text-gray-700 hover:text-agro-DEFAULT"
            >
              {t("nav-payment-title")}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-agro-DEFAULT">
              {t("nav-about-title")}
            </Link>
            <LanguageSwitcher />
            <Link to="https://novosad.prom.ua">
              <Button
                variant="ghost"
                style={{ backgroundColor: "#7500a3", color: "white" }}
              >
                <p>{t("nav-prom-title")}</p>
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">
                {t("nav-home-title")}
              </Link>
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">
                {t("nav-product-title")}
              </Link>
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">
                {t("nav-article-title")}
              </Link>
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">
                {t("nav-payment-title")}
              </Link>
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">
                {t("nav-about-title")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
