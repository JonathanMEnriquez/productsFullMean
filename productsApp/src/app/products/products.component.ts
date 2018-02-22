import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  allProducts:any = "";

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    console.log('get all')
    let observable = this._apiService.getAll();
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        //let the user know
      } else {
        this.allProducts = responseData;
      }
    })
  }

  deleteProduct(product_id){
    console.log('delete prod');
    let observable = this._apiService.delete(product_id);
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        //let user know
      } else {
        this.getAllProducts();
      }
    })
  }
}
