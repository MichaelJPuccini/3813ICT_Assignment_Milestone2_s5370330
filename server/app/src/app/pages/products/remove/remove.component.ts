import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.css'
})
export class RemoveComponent implements OnInit {
  product: Product = { _id: '', name: '', description: '', price: 0, units: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the id from Parameters

    if (id) {
      this.loadProduct(id); // Load if id is valid
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

  deleteProduct() {
      this.productService.deleteProduct(this.product._id).subscribe(() => {
        this.router.navigate(['/products/']); // Navigate to Products List
    });
  }
}
