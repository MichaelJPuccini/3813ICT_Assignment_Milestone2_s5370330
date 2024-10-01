import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent  implements OnInit {

  products: any[] = []; // Initialize an array to hold products

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts(); // Load products on component initialization
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data; // Set the product data
    });
  }

  editProduct(_id: string) { // Expecting _id to be a string
    this.router.navigate(['/products/update', _id]); // Navigate to Update Product with _id
  }

  deleteProduct(_id: string) { // Expecting _id to be a string
    this.router.navigate(['/products/remove', _id]); // Navigate to Remove Product with _id
  }
}

