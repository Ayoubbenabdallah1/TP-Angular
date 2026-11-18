import { Injectable,inject,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap} from 'rxjs';
import { Product } from '../models/product';

const URL = 'http://localhost:3000/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private readonly _http = inject(HttpClient);
    private readonly _products = signal<Product[]>([]);
    products = this._products.asReadonly();

 getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(URL)
      .pipe(tap(allProducts => this._products.set(allProducts)));
  }
 
 addProduct(p:Product) : Observable <Product> {
    return this._http.post<Product>(URL, p).pipe(tap(productAdded => this._products.update(products => [...products, productAdded])));
 }
}
