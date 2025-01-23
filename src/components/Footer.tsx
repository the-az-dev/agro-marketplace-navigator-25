import { useEffect, useState } from "react";
import { publicIp } from 'public-ip';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's IP address
        const ipAddress = await publicIp();
        
        // Get existing visitors from localStorage
        const visitors = JSON.parse(localStorage.getItem("visitors") || "[]");
        
        // Check if this IP has visited before
        if (!visitors.includes(ipAddress)) {
          // Add new IP to the list
          visitors.push(ipAddress);
          localStorage.setItem("visitors", JSON.stringify(visitors));
        }
        
        // Update visitor count based on unique IPs
        setVisitorCount(visitors.length);
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
  }, []); // Run once on component mount

  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AgroMarket</h3>
            <p className="text-gray-300">Your trusted source for agricultural products.</p>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Unique Visitors</p>
              <p className="text-2xl font-bold text-agro-DEFAULT">{visitorCount}</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Vegetables</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Fruits</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Grains</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Seeds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contact@agromarket.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Farm Road</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AgroMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;