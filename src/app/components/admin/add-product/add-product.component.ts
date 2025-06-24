import {Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../interfaces/product';
import {ProductController} from '../../../controllers/product.controller';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatFormField,
    MatCardActions,
    MatButton
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  goBack = output<boolean>();
  productSaved = output<Product>();
  productToEdit = input<Product>();
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private productController: ProductController) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.productToEdit()?.name ?? '', [Validators.required]),
      description: new FormControl(this.productToEdit()?.description ?? '', [Validators.required]),
      price: new FormControl(this.productToEdit()?.price ?? '', [Validators.required]),
      image: new FormControl(this.productToEdit()?.image ?? '', [Validators.required])
    })
  }

  saveProduct() {
    const product: Product = this.productForm.value as Product;
    product.id = this.productToEdit()?.id ?? this.productController.getLengthProduct() + 1 as number;
    this.productSaved.emit(product);
  }
}
