export enum ProductCategory {
  VEGETABLES = 'Vegetables',
  FRUITS = 'Fruits',
  GRAINS = 'Grains',
  SEEDS = 'Seeds',
  FERTILIZERS = 'Fertilizers',
  EQUIPMENT = 'Equipment'
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: ProductCategory;
  available: boolean;
  buyUrl: string;
}