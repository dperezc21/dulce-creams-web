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
      name: "fresas con Browni",
      description: "",
      price: 10000,
      image: "/img.webp"
    }
  ].map(value => {return{...value, toppings: this.toppings}});

  static productsMock(): Product[] {
    return this.productList;
  }
}
