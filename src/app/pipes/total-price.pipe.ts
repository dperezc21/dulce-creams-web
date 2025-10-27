import { Pipe, PipeTransform } from '@angular/core';
import {Product, ProductTopping} from '../interfaces/product';

@Pipe({
  standalone: true,
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(products: Product[]): string {
    const sum: number = products.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.product_price + this.sumToppingsPrice(currentValue.toppings);
    }, 0) as number ?? 0;
    return `$${sum} Pesos`;
  }

  sumToppingsPrice(toppings: ProductTopping[] | undefined): number {
    return toppings?.reduce((previousValue: number, currentValue: ProductTopping) => {
      return currentValue.selected ? previousValue + currentValue.price : previousValue;
    }, 0) ?? 0;
  }

}
