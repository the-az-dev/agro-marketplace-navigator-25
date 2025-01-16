import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const categories = [
    { name: "Vegetables", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" },
    { name: "Fruits", image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" },
    { name: "Grains", image: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { name: "Seeds", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" },
  ];

  const featuredProducts = [
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Enhanced Header */}
      <div className="bg-gradient-to-r from-agro-dark via-agro-DEFAULT to-agro-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Fresh from Nature's Heart</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium agricultural products sourced directly from local farmers. 
            Quality you can trust, delivered to your doorstep.
          </p>
          <Link to="/categories">
            <Button className="bg-white text-agro-DEFAULT hover:bg-gray-100 text-lg px-8 py-6">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to="/categories" key={category.name} className="relative group overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.title}
              {...product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;