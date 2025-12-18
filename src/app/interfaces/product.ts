
export interface Product {
  id?: number;
  name: string;
  price: number;
  image?: string | File;
  description: string;
  toppings?: ProductTopping[];
  selected?: boolean,
  quantity?: number
}

export interface ProductTopping {
  price: number,
  name: string,
  selected?: boolean,
}
