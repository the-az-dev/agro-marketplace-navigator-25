import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const Categories = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Organic Vegetables",
      products: [
        {
          title: "Fresh Tomatoes",
          price: "$4.99/kg",
          image: "https://images.unsplash.com/photo-1546750670-2cd297b7a537",
          category: "Vegetables",
          buyUrl: "#"
        },
        {
          title: "Organic Carrots",
          price: "$3.99/kg",
          image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
          category: "Vegetables",
          buyUrl: "#"
        }
      ]
    },
    {
      title: "Fresh Fruits",
      products: [
        {
          title: "Red Apples",
          price: "$5.99/kg",
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
          category: "Fruits",
          buyUrl: "#"
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    products: category.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesSearch && matchesPrice;
    })
  })).filter(category => category.products.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
        
        <div className="mb-8 space-y-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          
          <div className="max-w-md">
            <p className="text-sm text-gray-600 mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>

        {filteredCategories.map((category) => (
          <div key={category.title} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Categories;