import Navbar from "@/components/Navbar";
import JSONCategories from "../../assets/mocks/categories.json";
import { Category } from "@/types/Category";
import Footer from "@/components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JSONArticleCategory from "../../assets/mocks/articlesCategory.json";
import JSONArticles from "../../assets/mocks/articles.json";
import { ArticleCategory } from "@/types/ArticleCategory";
import { Article as ArticleType } from "@/types/Article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Article() {
  const categories = JSONCategories as Category[];
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const allArticlesCategories = JSONArticleCategory as ArticleCategory[];
  const allArticles = JSONArticles as ArticleType[];

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory]);

  const filteredArticles = allArticles.filter((article: ArticleType) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      article.category.id === Number(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col-reverse border-b h-[200px] justify-center">
          <div className="flex flex-row items-center pb-8 pl-8 pr-8">
            <h1 className="font-bold text-[40px]">Articles</h1>
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
            <Link to="/article">
              <p>Articles</p>
            </Link>
          </div>
        </div>

        {/* SEARCH FILTER BY TEXT AND CATEGORY */}
        <div className="grid grid-col-2 grid-cols-[3fr_1fr] py-8 px-4 gap-5 border-b">
          <Input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            value={selectedCategory || ""}
            onValueChange={(value) => setSelectedCategory(value || "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="0" value="all">
                All Subcategories
              </SelectItem>
              {allArticlesCategories.length > 0 &&
                allArticlesCategories.map((sub) => (
                  <SelectItem key={sub.id} value={String(sub.id)}>
                    {sub.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles List */}
        <main className="flex-1 w-screen transition-transform px-5 py-8">
          <div className="flex-1 w-full">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {filteredArticles.map((article: ArticleType) => (
                  <div className="bg-white rounded-lg border shadow-md overflow-hidden transition-transform hover:scale-105 w-[150px] md:w-[250px] lg:w-[320px]">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col items-center justify-between">
                      <div className="w-full h-40">
                        <Badge variant="secondary" className="mb-2">
                          {article.category.name}
                        </Badge>
                        <h3 className="text-lg font-semibold mt-1">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {article.created_at}
                        </p>
                      </div>
                      <div className="w-full">
                        <Button
                          className="w-full mt-4 bg-transparent text-black hover:bg-transparent rounded-lb border-[2px]"
                          onClick={() => {
                            window.open("/article/" + article.id);
                          }}
                        >
                          <p className="color-black">Read more</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Article;
