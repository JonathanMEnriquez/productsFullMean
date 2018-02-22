import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _apiService: ApiService, private _route: ActivatedRoute, private _router: Router) { }

  thisId: String = "";
  product: any = {
    _id: "",
    title: "",
    price: "",
    imgUrl: ""
  };

  errors: String[] = [];

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.thisId = params['id']);
    this.getOne(this.thisId);
  }

  getOne(id) {
    console.log('get one');
    let observable = this._apiService.getOne(id);
    observable.subscribe((responseData:any) => {
      console.log(responseData);
      if (responseData.errors) {
        //let user know
      } else {
        this.product = responseData.data;
      }
    })
  }

  clearForm(){
    this._router.navigate(['/products']);
  }

  editProduct(){
    console.log('edit product', this.product);
    let observable = this._apiService.update(this.product);
    observable.subscribe((responseData:any) => {
      console.log(responseData);
      if (responseData.errors) {
        this.errorHandler(responseData.errors.errors);
      } else {
        console.log('successfully updated');
        this._router.navigate(['/products']);
      }
    })
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
