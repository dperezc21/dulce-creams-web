import { Pipe, PipeTransform } from '@angular/core';
import {ProductTopping} from '../interfaces/product';

@Pipe({
  standalone: true,
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(products: any[]): string {
    const sum: number = products.reduce((previousValue, currentValue) => {
      if (!currentValue?.selected) return previousValue;
      return previousValue + (currentValue.price + this.sumToppingsPrice(currentValue.toppings)) * currentValue.quantity;
    }, 0) as number ?? 0;
    return `$${sum} Pesos`;
  }

  sumToppingsPrice(toppings: ProductTopping[] | undefined): number {
    return toppings?.reduce((previousValue: number, currentValue: ProductTopping) => {
      return currentValue.selected ? previousValue + currentValue.price : previousValue;
    }, 0) ?? 0;
  }

}
