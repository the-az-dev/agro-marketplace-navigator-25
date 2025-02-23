import { ArticleCategory } from "./ArticleCategory";

export interface Article{
    id: number;
    title: string;
    description: string;
    category: ArticleCategory;
    cover_image: string;
    images: String[];
    locale: string;
    created_at: string;
}