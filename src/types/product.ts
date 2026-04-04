export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

export type ProductResponse = {
  products: Product[];
};