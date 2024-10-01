import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  product: Product = { _id: '', name: '', description: '', price: 0, units: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(id); // Load the product details if id is valid
    } else {
      console.error('Product ID is null or invalid, cannot load product.');
    }
  }

  loadProduct(id: string) { 
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    }, (error) => {
      console.error('Error loading product:', error); // Log any errors
    });
  }

  updateProduct() {
    const id = this.product._id; 
    if (id) {
      console.log('Updating product with ID:', id, 'Data:', this.product); 
      this.productService.updateProduct(id, this.product).subscribe(() => {
        alert('Product updated successfully!'); 
        this.router.navigate(['/products']); 
      }, (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      });
    } else {
      console.error('Product ID is null or undefined');
    }
  }
}
