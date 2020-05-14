import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { RegisterUser } from '../register';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Hotel } from '../hotel';
import { Booking } from '../Booking';
import { Parser } from '../parser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer:RegisterUser=new RegisterUser();

  city: string='';
  hotels: Observable<any>;
  parser: Parser = new Parser();
  hsize: number;
  arrayHotels:Hotel[]=[];
  
  constructor(private router:Router, private customerService: CustomerService) { }

  search:string='';
  choice:string='';

  ngOnInit(): void {
    console.log(history.state)
    this.customer = history.state;
    this.listHotels();
  }

  updateProfile() {
    this.customer = history.state;
    console.log(this.customer)
    this.router.navigateByUrl('/updateUser',{state:this.customer});
  }

  searchHotels(form:NgForm) {
    if(form.valid){
      if(this.search=="Search By Name"){
        this.listHotelsByName();
      } else if(this.search=="Search By City"){
        this.listHotelsByCity();
      } else if(this.search=="Search By Rating"){
        this.listHotelsByRating();
      }
    }
    
  }

  listHotelsByCity() {
      this.customerService.listHotelsByCity(this.choice).subscribe((arrayHotels) => { 
      this.arrayHotels = arrayHotels;
      console.log(this.arrayHotels);
      this.hsize=this.arrayHotels.length
      if(this.hsize<1)
      {
        alert('Either the city entered is invalid or the Hotels are not present of that City!!')     
      } else {
        this.hotels=this.customerService.listHotelsByCity(this.choice);
      }
    })
  }

  listHotelsByName() {
    console.log(this.choice);
    let name:string=this.choice
    this.hotels = this.customerService.listHotelsByName(name);
  }

  listHotelsByRating() {
    console.log(this.choice);
    this.hotels = this.customerService.listHotelsByRating(this.choice);
  }

  listHotels() {
    this.hotels = this.customerService.listHotels();
  }

  btnClick(hotel:Hotel) {
    let user:RegisterUser = history.state;
    console.log(user);
    /*type objects = Array<{hotl: Hotel, cust: RegisterUser}>;
    const arr: objects = [
      {hotl: hotel, cust: user}];*/
    this.parser.hotel = hotel;
    this.parser.user = user;
    console.log(this.parser);
    this.router.navigateByUrl('/viewHotel',{state:this.parser});
};
}
