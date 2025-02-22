import { useState, useEffect } from "react";
import { type Product } from "@/types/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import JSONCategories from "../../assets/mocks/categories.json";
import JSONProducts from "../../assets/mocks/products.json";
import JSONSubCategories from "../../assets/mocks/subcategories.json";
import { Category } from "@/types/Category";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SubCategory } from "@/types/SubCategories";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubcategory = searchParams.get("subcategory") || "all";
  const initialProduct = searchParams.get("productId") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState(initialSubcategory);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showWholePriceOnly, setShowWholePriceOnly] = useState(false);
  const [showRetailOnly, setShowRetailOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(initialProduct);

  const categories = (JSONCategories as Category[]) || [];
  const allProducts = (JSONProducts as Product[]) || [];
  const allSubCategories = (JSONSubCategories as SubCategory[]) || [];

  // Очищення непотрібних параметрів з URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSubcategory) params.set("subcategory", selectedSubcategory);
    if (searchQuery) params.set("search", searchQuery);
    if (priceFrom) params.set("priceFrom", priceFrom);
    if (priceTo) params.set("priceTo", priceTo);
    if (showAvailableOnly) params.set("available", "true");
    if (showWholePriceOnly) params.set("wholeprice", "true");
    if (showRetailOnly) params.set("retail", "true");
    if (selectedProductId) params.set("productId", selectedProductId);
    if (selectedProductId && selectedProductId !== "") {
      const foundProduct = allProducts.find(
        (p) => p.id === Number(selectedProductId)
      );
      setSelectedProduct(foundProduct || null);
    }
    setSearchParams(params, { replace: true });
  }, [
    searchQuery,
    priceFrom,
    priceTo,
    selectedSubcategory,
    showAvailableOnly,
    showWholePriceOnly,
    showRetailOnly,
    selectedProductId,
  ]);

  const filteredProducts = allProducts.filter((product: Product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!priceFrom || product.price >= Number(priceFrom)) &&
      (!priceTo || product.price <= Number(priceTo));
    const matchesSubcategory =
      selectedSubcategory === "all" ||
      product.category.id === Number(selectedSubcategory);
    const matchesAvailability = !showAvailableOnly || product.available;
    const matchesRetail = !showRetailOnly || product.retail;
    const matchesWholePrice = !showWholePriceOnly || product.wholesale;
    const matchesProductId = Number(selectedProductId) || product.id;
    return (
      matchesSearch &&
      matchesPrice &&
      matchesSubcategory &&
      matchesAvailability &&
      matchesRetail &&
      matchesWholePrice &&
      matchesProductId
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />
      <div className="flex flex-col">
        <div className="flex flex-col-reverse">
          <div className="flex flex-row items-center pb-8 pl-8 pr-8">
            <h1 className="font-[bold] text-[40px]">Products</h1>
          </div>
          <div className="flex flex-row items-center gap-2 pb-8 pt-6 pl-8 pr-8">
            <Link to="/">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/fluency-systems-regular/50/home--v1.png"
                alt="home--v1"
              />
            </Link>
            <p>/</p>
            <Link to="/products">
              <p>Products</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center items-start transition-transform py-9 px-4 gap-2">
          {selectedProduct !== null ? (
            <div className="w-[5%] flex-2 md:w-64 space-y-6 pl-6 h-full md:-w-[10%] lg:w-[16%] max-w-[6%] md:max-w-[11%] lg:max-w-[15%]">
              <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border">
                <Label className="text-semibold text-[20px]">Filters</Label>
                <div>
                  <Label htmlFor="search">Search Products</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Price Range</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type="number"
                      placeholder="From"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="To"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={selectedSubcategory || ""}
                    onValueChange={(value) =>
                      setSelectedSubcategory(value || "")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="0" value="all">
                        All Subcategories
                      </SelectItem>
                      {allSubCategories.length > 0 &&
                        allSubCategories.map((sub) => (
                          <SelectItem key={sub.id} value={String(sub.id)}>
                            {sub.name}
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={showRetailOnly}
                    onCheckedChange={setShowRetailOnly}
                  />
                  <Label htmlFor="available">Show Retail Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={showWholePriceOnly}
                    onCheckedChange={setShowWholePriceOnly}
                  />
                  <Label htmlFor="available">Show Wholesale Only</Label>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[10%] flex-2 md:w-64 space-y-6 h-full px-2 md:-w-[13%] lg:w-[16%]">
              <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border">
                <Label className="text-semibold text-[20px]">Filters</Label>
                <div>
                  <Label htmlFor="search">Search Products</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Price Range</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type="number"
                      placeholder="From"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="To"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={selectedSubcategory || ""}
                    onValueChange={(value) =>
                      setSelectedSubcategory(value || "")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="0" value="all">
                        All Subcategories
                      </SelectItem>
                      {allSubCategories.length > 0 &&
                        allSubCategories.map((sub) => (
                          <SelectItem key={sub.id} value={String(sub.id)}>
                            {sub.name}
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={showRetailOnly}
                    onCheckedChange={setShowRetailOnly}
                  />
                  <Label htmlFor="available">Show Retail Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={showWholePriceOnly}
                    onCheckedChange={setShowWholePriceOnly}
                  />
                  <Label htmlFor="available">Show Wholesale Only</Label>
                </div>
              </div>
            </div>
          )}
          <main className="flex-1 container mx-[30px] py-4 transition-transform">
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <>
                  {selectedProduct ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product: Product) => (
                        // <ProductCard title={product.title} price={`${product.price} грн`} image={product.photo} category={product.category.name} buyUrl={product.buy_url} />
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:z-[888] hover:relative border w-[150px] md:w-[200px] lg:w-[280px]">
                          <img
                            src={product.photo}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4 flex flex-col items-center justify-between">
                            <div className="w-full h-40">
                              <Badge variant="secondary" className="mb-2">
                                {product.category.name}
                              </Badge>
                              <h3 className="text-lg font-semibold mt-1">
                                {product.title}
                              </h3>
                              <p className="text-gray-600 mt-2">
                                {product.price} грн / {product.minimal_order} шт
                              </p>
                            </div>
                            <div className="w-full">
                              <Button
                                className="w-full mt-4 bg-transparent text-black hover:bg-transparent rounded-lb border-[2px]"
                                onClick={() => {
                                  // setSelectedProduct(product);
                                  setSelectedProductId(String(product.id));
                                }}
                              >
                                <p className="color-black">More</p>
                              </Button>
                              <Button
                                className="w-full mt-4"
                                onClick={() => {
                                  window.open(product.buy_url, "_blank");
                                }}
                              >
                                Buy Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.map((product: Product) => (
                        // <ProductCard title={product.title} price={`${product.price} грн`} image={product.photo} category={product.category.name} buyUrl={product.buy_url} />
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:z-[888] hover:relative border w-[150px] md:w-[250px] lg:w-[320px]">
                          <img
                            src={product.photo}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4 flex flex-col items-center justify-between">
                            <div className="w-full h-40">
                              <Badge variant="secondary" className="mb-2">
                                {product.category.name}
                              </Badge>
                              <h3 className="text-lg font-semibold mt-1">
                                {product.title}
                              </h3>
                              <p className="text-gray-600 mt-2">
                                {product.price} грн / {product.minimal_order} шт
                              </p>
                            </div>
                            <div className="w-full">
                              <Button
                                className="w-full mt-4 bg-transparent text-black hover:bg-transparent rounded-lb border-[2px]"
                                onClick={() => {
                                  // setSelectedProduct(product);
                                  setSelectedProductId(String(product.id));
                                }}
                              >
                                <p className="color-black">More</p>
                              </Button>
                              <Button
                                className="w-full mt-4"
                                onClick={() => {
                                  window.open(product.buy_url, "_blank");
                                }}
                              >
                                Buy Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </main>
          {selectedProduct &&
            Number(selectedProductId) === selectedProduct.id && (
              <div className="h-[90%] m-[2%] max-w-[500px] max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] bg-white shadow-lg p-10 overflow-hidden rounded-[30px] border transition-transform flex flex-col justify-between">
                <div className="overflow-auto">
                  <div className="w-full h-auto flex flex-row items-center justify-center p-4">
                    <img
                      src={selectedProduct.photo}
                      alt={selectedProduct.title}
                      className="w-[60%] h-auto rounded mb-4"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-center p-4">
                    {selectedProduct.title}
                  </h2>
                  <div className="flex flex-row items-center justify-between pt-3 pb-3 border-b border-t">
                    <p>Price:</p>
                    <p className="text-gray-700 text-[18px] text-center">
                      {selectedProduct.price} грн /{" "}
                      {selectedProduct.minimal_order} шт
                    </p>
                  </div>
                  <ul className="border-b pt-4 pb-4">
                    <li className="flex flex-row items-center justify-between">
                      <p>Avaliable:</p>
                      <p>
                        {selectedProduct.available ? (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/checkmark--v1.png"
                            alt="checkmark--v1"
                          />
                        ) : (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/delete-sign--v1.png"
                            alt="delete-sign--v1"
                          />
                        )}
                      </p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Wholeprice:</p>
                      <p>
                        {selectedProduct.wholesale ? (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/checkmark--v1.png"
                            alt="checkmark--v1"
                          />
                        ) : (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/delete-sign--v1.png"
                            alt="delete-sign--v1"
                          />
                        )}
                      </p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Retail:</p>
                      <p>
                        {selectedProduct.retail ? (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/checkmark--v1.png"
                            alt="checkmark--v1"
                          />
                        ) : (
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/color/48/delete-sign--v1.png"
                            alt="delete-sign--v1"
                          />
                        )}
                      </p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Delivery at:</p>
                      <p>{selectedProduct.delivery_at}</p>
                    </li>
                  </ul>
                  <ul className="pt-4 pb-4 gap-4 bodrer-b">
                    <li className="flex flex-row items-center justify-between">
                      <p>Sort:</p>
                      <p>{selectedProduct.sort}</p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Class:</p>
                      <p>{selectedProduct.class}</p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Season:</p>
                      <p>{selectedProduct.season}</p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Plant at:</p>
                      <p>{selectedProduct.plant_at}</p>
                    </li>
                    <li className="flex flex-row items-center justify-between">
                      <p>Harvest at:</p>
                      <p>{selectedProduct.harvest_at}</p>
                    </li>
                  </ul>
                  <p className="text-gray-700 border-t p-4">
                    {selectedProduct.description}
                  </p>
                </div>
                <div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => {
                      window.open(selectedProduct.buy_url, "_blank");
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    className="w-full mt-4 bg-transparent text-black hover:bg-transparent rounded border"
                    onClick={() => {
                      setSelectedProduct(null);
                      setSelectedProductId("");
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
