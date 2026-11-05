import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  private readonly productService = inject(ProductService);
  products: Signal<Product[]> = this.productService.products;
}