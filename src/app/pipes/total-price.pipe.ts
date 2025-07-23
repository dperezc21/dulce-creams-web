import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces/product';

@Pipe({
  standalone: true,
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(products: Product[]): number {
    return products.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.product_price;
    }, 0) as number ?? 0;
  }

}
