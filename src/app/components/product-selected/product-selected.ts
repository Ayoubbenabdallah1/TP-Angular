import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  product = signal<Product | undefined>(undefined);

  ngOnInit(): void {
    let idProduct = this.activatedRoute.snapshot.paramMap.get('idP');
    if (idProduct)
      this.product.set(this.productService.getProductById(idProduct));
  }

  onBackToProducts() {
    this.router.navigate(['/products']);
  }
}