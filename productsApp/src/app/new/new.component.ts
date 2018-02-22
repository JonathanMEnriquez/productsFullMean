import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router) { }

  newProduct: any = {
    title: "",
    price: "", 
    imgUrl: ""
  }

  errors: any = "";

  ngOnInit() {
    
  }

  addNewProduct() {
    console.log('add new product');
    let observable = this._apiService.createProduct(this.newProduct);
    observable.subscribe((responseData:any)=>{
      if (responseData.errors) {
        console.log(this.errors);
        this.errors = responseData.errors.errors;
      } else {
        console.log(responseData);
        this._router.navigate(['/products']);
      }
    })
  }

  clearForm(){
    this._router.navigate(['/products']);
  }
}
