import { SubCategory } from "./SubCategories";

export interface  Category{
    id: number;
    name: string;
    photo: string;
    locale: string;
    subcategories: SubCategory[];
}