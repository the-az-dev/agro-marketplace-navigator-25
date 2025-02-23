import Navbar from "@/components/Navbar";
import JSONCategories from "../../assets/mocks/categories.json";
import JSONArticles from "../../assets/mocks/articles.json";
import { Category } from "@/types/Category";
import { Article as ArticleType } from "@/types/Article";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

function parseDescription(description, images) {
  const lines = description.split("\n");
  return lines.map((line, index) => {
    const match = line.match(/\[(img\d+(,img\d+)*)]_(.*?)$/);
    if (match) {
      const imgIndexes = match[1]
        .split(",")
        .map((i) => parseInt(i.replace("img", ""), 10));
      const caption = match[3];
      const imgs = imgIndexes.map((i) => images[i] || "");

      return (
        <div
          key={index}
          className="w-full flex flex-col items-center my-4 py-8"
        >
          <div className="flex flex-wrap justify-center gap-9">
            {imgs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${caption} - "Novosad" Shop`}
                className="h-auto w-[1500px] md:w-[300px] lg:w-[600px]"
              />
            ))}
          </div>
          <p className="text-center text-gray-600 mt-2 italic py-4">
            {caption}
          </p>
        </div>
      );
    }

    return (
      <p key={index} className="text-[20px] break-words w-full w-full">
        {line}
      </p>
    );
  });
}

function ArticleDetail() {
  const { id } = useParams();
  const article = JSONArticles.find(
    (article: ArticleType) => article.id === Number(id)
  ) as ArticleType;

  const categories = JSONCategories as Category[];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar categories={categories} />
      <div className="flex flex-col flex-grow w-full">
        {/* Хедер */}
        <div className="flex flex-col-reverse border-b justify-center">
          <div className="flex flex-row items-center gap-2 pb-8 pt-6 px-8">
            <Link to="/">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/fluency-systems-regular/50/home--v1.png"
                alt="home"
              />
            </Link>
            <p>/</p>
            <Link to={"/article"}>
              <p>Articles</p>
            </Link>
            <p>/</p>
            <Link to={"/article/" + article.id}>
              <p>{article.title}</p>
            </Link>
          </div>
        </div>

        {/* Головне зображення */}
        <div className="relative group overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full object-cover max-h-[500px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{article.title}</h3>
          </div>
        </div>

        {/* Контент */}
        <div className="flex flex-col items-center w-full px-8">
          <div className="flex flex-row justify-between items-center border-b w-full max-w-[90%] py-8">
            <Link to={"/article?category=" + article.category.id}>
              <Badge
                variant="secondary"
                className="text-[14px] p-4 w-[250px] h-[40px] flex items-center justify-center text-center"
              >
                <p className="w-full">{article.category.name}</p>
              </Badge>
            </Link>
            <h5 className="text-[16px] font-semibold">
              Created: {article.created_at}
            </h5>
          </div>

          {/* Опис */}
          <div className="w-full w-[90%] md:w-[70%] lg:w-[90%] py-6 px-8">
            {parseDescription(article.description, article.images)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ArticleDetail;
