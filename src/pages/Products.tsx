import { useState } from "react";
import { ProductCategory, type Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Sample products data - in a real app, this would come from an API
  const allProducts: Product[] = [
    {
      id: "1",
      title: "Organic Tomatoes",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: ProductCategory.VEGETABLES,
      available: true,
      buyUrl: "https://example.com/buy-tomatoes",
    },
    {
      id: "2",
      title: "Fresh Apples",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      category: ProductCategory.FRUITS,
      available: true,
      buyUrl: "https://example.com/buy-apples",
    },
    {
      id: "3",
      title: "Organic Rice",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: ProductCategory.GRAINS,
      available: false,
      buyUrl: "https://example.com/buy-rice",
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange[0];
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesAvailability = !showAvailableOnly || product.available;
    
    return matchesSearch && matchesPrice && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section - Now vertical on the left */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Price Range: ${priceRange[0]}</Label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.values(ProductCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={showAvailableOnly}
                  onCheckedChange={setShowAvailableOnly}
                />
                <Label htmlFor="available">Show Available Only</Label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={`$${product.price}`}
                  image={product.image}
                  category={product.category}
                  buyUrl={product.buyUrl}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;