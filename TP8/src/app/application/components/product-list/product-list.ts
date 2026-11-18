import { Component ,inject,OnInit} from '@angular/core';
import { ProductService } from '../../services/product-service';
@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {

  private readonly _productService= inject(ProductService);
  products = this._productService.products;
  ngOnInit(): void {
      this._productService.getProducts().subscribe();
  }
  onAddProduct() {
  let newProduct = { id: "xyDSI", name: "crayon", price: 2.3 };
  this._productService.addProduct(newProduct).subscribe();
}

}
