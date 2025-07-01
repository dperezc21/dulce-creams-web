import {Product} from './product';

export interface Ordering {
  product: Product,
  toppings?: {
    price: number,
    name: string,
  },
  quantity: number
}
