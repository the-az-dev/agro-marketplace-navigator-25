import { parse, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ArticleList = ({ articles }) => {
  // Поточна дата
  const currentDate = new Date();

  // Фільтруємо статті за датою
  let filteredArticles = articles.filter((article) => {
    const articleDate = parse(article.created_at, "dd-MM-yyyy", Date.now());
    return differenceInDays(currentDate, articleDate) <= 10;
  });

  filteredArticles = articles.slice(0, 4);

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {filteredArticles.map((article) => (
        <div
          className="bg-white rounded-lg border shadow-md overflow-hidden transition-transform hover:scale-105 w-[150px] md:w-[250px] lg:w-[320px]"
        >
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
              <h3 className="text-lg font-semibold mt-1">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.created_at}</p>
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
  );
};

export default ArticleList;
