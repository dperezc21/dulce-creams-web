import {Product} from '../interfaces/product';

export class ProductsMock {

  private static productList: Product[] = [
    {
      id: 1,
      name: "fresas con crema",
      description: "",
      price: 13000,
      image: "/img.webp"
    },
    {
      id: 2,
      name: "fresas con chocolate",
      description: "",
      price: 10000,
      image: "/img.webp"
    },
    {
      id: 3,
      name: "fresas con chocolate",
      description: "",
      price: 10000,
      image: "/img.webp"
    }
  ]

  static productsMock(): Product[] {
    return this.productList;
  }
}
