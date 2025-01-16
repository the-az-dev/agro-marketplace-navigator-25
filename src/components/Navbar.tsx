import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-agro-DEFAULT">AgroMarket</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Home</a>
            <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Categories</a>
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
              <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Home</a>
              <a href="#" className="text-gray-700 hover:text-agro-DEFAULT">Categories</a>
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