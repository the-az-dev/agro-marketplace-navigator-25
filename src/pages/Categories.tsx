import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0]);

  // Sample products data - in a real app, this would come from an API
  const allProducts = [
    {
      title: "Organic Tomatoes",
      price: "$4.99/kg",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Vegetables",
      buyUrl: "https://example.com/buy-tomatoes",
    },
    {
      title: "Fresh Apples",
      price: "$3.99/kg",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      category: "Fruits",
      buyUrl: "https://example.com/buy-apples",
    },
    {
      title: "Organic Rice",
      price: "$7.99/kg",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Grains",
      buyUrl: "https://example.com/buy-rice",
    },
    {
      title: "Sunflower Seeds",
      price: "$5.99/kg",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Seeds",
      buyUrl: "https://example.com/buy-seeds",
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    const matchesPrice = price <= priceRange[0];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          
          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-sm font-medium mb-2">Search Products</label>
              <Input
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range: ${priceRange[0]}
              </label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.title}
              {...product}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;