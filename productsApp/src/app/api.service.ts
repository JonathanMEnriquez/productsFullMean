import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  createProduct(newProduct) {
    return this._http.post('/api/products', newProduct);
  }

  getAll() {
    return this._http.get('/api/products');
  }

  delete(id) {
    return this._http.delete('/api/products/' + id);
  }

  getOne(id) {
    return this._http.get('/api/products/' + id);
  }

  update(product) {
    return this._http.put('/api/products/' + product._id, product);
  }
}
