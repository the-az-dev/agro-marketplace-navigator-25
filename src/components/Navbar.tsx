import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category } from '@/types/Category';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./ui/lang-switcher";
import Logo from '../../assets/images/shop logo.png';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-[999] bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link to="/" className="text-2l font-bold text-agro-DEFAULT flex flex-row items-end justify-around w-[210px] h-full">
              <img src={Logo} alt="novosad.in.ua Logo" className="w-[30px] h-[30px]"/>
              <p className="text-center">{t("company-nane")}</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">{t("nav-home-title")}</Link>
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">{t("nav-product-title")}</Link>
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">{t("nav-article-title")}</Link>
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">{t("nav-payment-title")}</Link>
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">{t("nav-about-title")}</Link>
            <LanguageSwitcher /> {/* TODO: Need to design switcher! */}
            <Link to='https://novosad.prom.ua'>
              <Button variant="ghost" style={
                {
                  backgroundColor: "#7500a3",
                  color: "white"
                }
              }>
                <p>{t("nav-prom-title")}</p>
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">Home</Link>
              <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">About</a>
              <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;