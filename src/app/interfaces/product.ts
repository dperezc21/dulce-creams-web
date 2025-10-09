
export interface Product {
  id?: number;
  product_name: string;
  product_price: number;
  product_image?: string | File;
  product_description: string;
  toppings?: ProductTopping[];
}

export interface ProductTopping {
  price: number,
  name: string,
  selected?: boolean,
}
