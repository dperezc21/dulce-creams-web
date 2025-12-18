import {Injectable} from '@angular/core';
import {Ordering} from '../interfaces/ordering';
import {Product} from '../interfaces/product';

@Injectable({ providedIn: "root" })
export class ProductsViewController {

  mapProductSelected(productsSelected: Product[]): Ordering[] {
    return productsSelected.reduce((previousValue: Ordering[], {quantity, selected, ...currentValue}: Product) => {
      if(!selected) return previousValue;
      previousValue.push({ product: currentValue, quantity: quantity as number});
      return previousValue;
    }, []) as Ordering[];
  }

  productIdGreater(products: Product[]): number {
    return products.reduce((previousValue: number, currentValue: Product) => {
      const currentId: number = currentValue?.id as number;
      return previousValue >= currentId ? previousValue : currentId as number;
    }, 0) as number;
  }
}
