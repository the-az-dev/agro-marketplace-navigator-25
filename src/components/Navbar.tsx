import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCategory } from "@/types/product";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from your API
    const fetchCategories = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/categories');
        const data = await response.json();
        setCategories(Object.values(ProductCategory));
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to enum values if API fails
        setCategories(Object.values(ProductCategory));
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-agro-DEFAULT">AgroMarket</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-agro-DEFAULT">Home</Link>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-gray-700 hover:text-agro-DEFAULT"
              >
                {category}
              </button>
            ))}
            <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">About</a>
            <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Contact</a>
            <Button variant="ghost">
              <ShoppingCart className="h-5 w-5" />
            </Button>
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
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="text-left text-gray-700 hover:text-agro-DEFAULT"
                >
                  {category}
                </button>
              ))}
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