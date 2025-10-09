import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces/product';

@Pipe({
  standalone: true,
  name: 'validProductsSelected'
})
export class ValidProductsSelectedPipe implements PipeTransform {

  transform(currentProduct: Product, productsSelected: Product[]): boolean {
    return productsSelected.findIndex((product: Product) => product.id === currentProduct.id) !== -1;
  }

}
