// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Product {
//   _id: string; // MongoDB ObjectId (kept for existing products)
//   name: string;
//   description: string;
//   price: number;
//   units: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   private apiUrl = 'http://localhost:3000/api/products'; // Your API base URL

//   constructor(private http: HttpClient) {}

//   // Get all products
//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.apiUrl);
//   }

//   // Get a product by ID
//   getProductById(id: string): Observable<Product> { // Change to string
//     return this.http.get<Product>(`${this.apiUrl}/${id}`);
//   }

//   // Add a new product
//   addProduct(product: Omit<Product, '_id'>): Observable<any> { // Omit _id for new products
//     return this.http.post(this.apiUrl, product);
//   }

//   // Update an existing product by ID
//   updateProduct(id: string, product: Product): Observable<any> { // Change to string
//     return this.http.patch(`${this.apiUrl}/${id}`, product);
//   }

//   // Delete a product by ID
//   deleteProduct(id: string): Observable<any> { // Change to string
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

// }
