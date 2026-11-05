import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-selected',
  imports: [JsonPipe],
  templateUrl: './product-selected.html',
  styleUrl: './product-selected.css'
})
export class ProductSelected implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService); // 1
  product = signal<Product | undefined>(undefined);        // 2

  ngOnInit(): void {
    let idProduct = this.activatedRoute.snapshot.paramMap.get('idP');
    if (idProduct) // 3
      this.product.set(this.productService.getProductById(idProduct));
  }
}