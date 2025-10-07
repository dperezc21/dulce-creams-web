
export interface Product {
  id?: number;
  product_name: string;
  product_price: number;
  product_image?: string | File;
  product_description: string;
}
