import {Component, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

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
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required])
    })
  }

}
