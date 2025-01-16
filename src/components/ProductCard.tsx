import { Button } from "./ui/button";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category: string;
  buyUrl: string;
}

const ProductCard = ({ title, price, image, category, buyUrl }: ProductCardProps) => {
  const handleBuy = () => {
    window.open(buyUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-sm text-agro-DEFAULT font-semibold">{category}</span>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-gray-600 mt-2">{price}</p>
        <Button 
          className="w-full mt-4 bg-agro-DEFAULT hover:bg-agro-light"
          onClick={handleBuy}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;