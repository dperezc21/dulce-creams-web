import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces/product';

@Pipe({
  standalone: true,
  name: 'countProduct'
})
export class CountProductPipe implements PipeTransform {

  transform(product: Product, productsSelected: Product[]): number {
    return productsSelected.filter(value => value.id === product.id).length ?? 1;
  }

}
