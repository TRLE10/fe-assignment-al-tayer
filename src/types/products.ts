export type ProductType = {
  id: number;
  name: string;
  description: string;
  colors: string[];
  price: Record<string, number>;
  img: string;
  size: string[];
};

type PaginationType = {
  total: number;
  per_page: number;
  total_pages: number;
};

type PriceRangeType = {
  min: Record<string, number>;
  max: Record<string, number>;
};

export type FiltersType = {
  colors: string[];
  price: PriceRangeType;
  sizes: string[];
};

export type ProductsType = {
  data: ProductType[];
  pagination: PaginationType;
  filters: FiltersType;
};
