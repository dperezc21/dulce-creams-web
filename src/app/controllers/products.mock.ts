import {Product} from '../interfaces/product';

export class ProductsMock {

  private static productList: Product[] = [
    {
      id: 1,
      product_name: "fresas con crema",
      product_description: "",
      product_price: 13000,
      product_image: "/img.webp"
    },
    {
      id: 2,
      product_name: "fresas con chocolate",
      product_description: "",
      product_price: 10000,
      product_image: "/img.webp"
    },
    {
      id: 3,
      product_name: "fresas con chocolate",
      product_description: "",
      product_price: 10000,
      product_image: "/img.webp"
    }
  ]

  static productsMock(): Product[] {
    return this.productList;
  }
}
