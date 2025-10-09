import {Product, ProductTopping} from '../interfaces/product';

export class ProductsMock {

  private static toppings: ProductTopping[] = [
    {name: "chocolate", price: 3000, selected: false},
    {name: "arequipe", price: 2000, selected: false},
    {name: "Leche condensada", price: 1000, selected: false},
  ]

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
  ].map(value => {return{...value, toppings: this.toppings}});

  static productsMock(): Product[] {
    return this.productList;
  }
}
