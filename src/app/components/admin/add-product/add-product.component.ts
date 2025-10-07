import {Component, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../interfaces/product';
import {NgOptimizedImage} from '@angular/common';

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
    MatButton,
    NgOptimizedImage
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
  fileSelected!: File;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.productToEdit()?.product_name ?? '', [Validators.required]),
      description: new FormControl(this.productToEdit()?.product_description ?? '', [Validators.required]),
      price: new FormControl(this.productToEdit()?.product_price ?? '', [Validators.required]),
      image: new FormControl(this.productToEdit()?.product_image ?? '', [Validators.required])
    })
  }

  saveProduct() {
    const {name, description, price} = this.productForm.value;
    const product: Product = {
      id: this.productToEdit()?.id ?? undefined,
      product_name: name,
      product_description: description,
      product_price: Number(price),
      product_image: this.fileSelected
    }
    this.productSaved.emit(product);
  }

  getFileSelected($event: any) {
    const file: File = $event?.target["files"][0];
    const fileReader: FileReader = new FileReader();
    if(!file) return;
    fileReader.onload = (value: any) => {
      this.productForm.get('image')?.setValue(value.target.result);
      this.fileSelected = file;
    }
    fileReader.readAsDataURL(file);

  }
}
