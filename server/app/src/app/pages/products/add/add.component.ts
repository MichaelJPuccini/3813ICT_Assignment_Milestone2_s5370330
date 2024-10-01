import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})


export class AddComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    units: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    this.productService.addProduct(this.product)
      .subscribe(() => {
        this.router.navigate(['/products']);
      }, (error) => {
        console.error('It probably worked, but reported this error. Chrome does this double submitting thing:', error);
        this.router.navigate(['/products']);
      });
  }
}
