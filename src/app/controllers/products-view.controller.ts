import {Injectable} from '@angular/core';
import {Ordering} from '../interfaces/ordering';
import {Product, ProductTopping} from '../interfaces/product';

@Injectable({ providedIn: "root" })
export class ProductsViewController {

  mapProductSelected(productsSelected: Product[]): Ordering[] {
    return productsSelected.reduce((previousValue: Ordering[], currentValue: Product) => {
      const productCurrentIndex: number = previousValue.findIndex(value => currentValue.id === value.product.id) as number;
      if(productCurrentIndex === -1) previousValue.push({ product: currentValue, quantity: 1});
      else previousValue[productCurrentIndex].quantity+=1;
      return previousValue;
    }, []) as Ordering[];
  }

  changeStateProductToppingSelected(toppingChecked: boolean , product: Product, topping: ProductTopping): Product {
    product.toppings = product.toppings?.map((value: ProductTopping) => {
      if(value.name === topping.name) value.selected = toppingChecked;
      return value;
    }) as ProductTopping[];
    return product;
  }

  setProductInIndex(products: Product[], product: Product, index: number): Product[] {
    const sliceProductStart: Product[] = products.slice(0, index + 1);
    const sliceProductEnd: Product[] = products.slice(index + 1);
    sliceProductStart.push(product);
    return sliceProductStart.concat(sliceProductEnd);
  }

  maijorProductId(products: Product[]): number {
    return products.reduce((previousValue: number, currentValue: Product) => {
      const currentId: number = currentValue?.id as number;
      return previousValue >= currentId ? previousValue : currentId as number;
    }, 0) as number;
  }
}
