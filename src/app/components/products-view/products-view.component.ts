import {Component, input} from '@angular/core';
import {Product} from '../../interfaces/product';
import {NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-products-view',
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './products-view.component.html',
  standalone: true,
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent {

  products = input<Product[]>();

}
