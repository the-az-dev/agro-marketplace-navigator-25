import { SubCategory } from "./SubCategories";

export interface Product{
  id: number;
  price: number;
  season: string;
  sort: string;
  class: string;
  minimal_order: number;
  wholesale: boolean;
  retail: boolean;
  delivery_at: string;
  hint?: string;
  category: SubCategory;
  title: string;
  description: string;
  photo: string;
  buy_url: string;
  available: boolean;
  locale: string;
  plant_at: string;
  harvest_at: string;
}