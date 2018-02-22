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
  
  errors: String[] = [];

  ngOnInit() {
    
  }

  addNewProduct() {
    console.log('add new product');
    let observable = this._apiService.createProduct(this.newProduct);
    observable.subscribe((responseData:any)=>{
      if (responseData.errors) {
        this.errorHandler(responseData.errors.errors);
      } else {
        console.log(responseData);
        this._router.navigate(['/products']);
      }
    })
  }

  clearForm(){
    this._router.navigate(['/products']);
  }

  errorHandler(errorData) {
    let keys = Object.keys(errorData);
    keys.forEach((key) => {
      let message = errorData[key].message;

      if (errorData[key].properties && errorData[key].properties.message) {
          message = errorData[key].properties.message.replace('`{PATH}`', key);
      }

      message = message.replace('Path ', '').replace(key,'').trim();
      this.errors.push(key + " " + message);
      console.log(this.errors);
    })
  }
}
