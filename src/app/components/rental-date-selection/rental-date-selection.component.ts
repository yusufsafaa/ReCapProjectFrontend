import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DateTimeService } from 'src/app/services/date-time.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-date-selection',
  templateUrl: './rental-date-selection.component.html',
  styleUrls: ['./rental-date-selection.component.css']
})
export class RentalDateSelectionComponent implements OnInit{
  carDetails:CarDetail[]=[];
  rentDate:string;
  returnDate:string;
  rentedDay:number;
  totalPrice:number=0;
  isReturnDateValid:boolean=false;
  isRentDateValid:boolean=false;
  redirectToPayment:boolean=false;
  baseImageUrl="https://localhost:7291/Uploads/CarImages";

  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private dateTimeService:DateTimeService,
    private cartService:CartService,
    private router:Router,
    private rentalService:RentalService){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetailByCarId(carId).subscribe(response=>{
      this.carDetails=response.data;
    })
  }
  
  checkRentDate(){
    let diffDay=this.dateTimeService.calculateDay(this.dateTimeService.getTimeNow(),this.rentDate);

    if(diffDay<0){
      this.toastrService.error("Lütfen geçerli bir kiralama tarihi giriniz","Hata!");
      this.isRentDateValid=false;
    }
    else{
      this.isRentDateValid=true;
    }
  }

  checkReturnDate(){
    this.rentedDay=this.dateTimeService.calculateDay(this.rentDate,this.returnDate);
    
    if(this.rentedDay<0){
      this.toastrService.error("Araç teslim tarihi kiralama tarihinden önce olamaz","Hata!");
      this.isReturnDateValid=false;
      return;
    }
    else if(this.rentedDay==0){
      this.rentedDay=1;
    }

    this.isReturnDateValid=true;
    this.calculateTotalPrice();
  }

  calculateTotalPrice(){
    this.totalPrice=this.carDetails[0].dailyPrice*this.rentedDay;
  }

  addToCart(){
    let cartItemModel:CartItem=new CartItem;
    cartItemModel.carId=this.carDetails[0].carId;
    cartItemModel.totalPrice=this.totalPrice;
    cartItemModel.userId=Number(localStorage.getItem("userId"));
    cartItemModel.rentedDay=this.rentedDay;
    cartItemModel.rentDate=new Date(this.rentDate);
    cartItemModel.returnDate=new Date(this.returnDate);

    this.cartService.addToCart(cartItemModel).subscribe(response=>{
      this.toastrService.success("Araç sepete eklendi");
      
      if(this.redirectToPayment){
        this.navigateToPayment();
      }
      else{
        this.navigateToHomePage();
      }
    },errorResponse=>{
      this.toastrService.error("Araç sepete eklenemedi","Hata");
    })
  }

  navigateToPayment(){
    this.router.navigateByUrl("/payment");
  }

  navigateToHomePage(){
    this.router.navigate([""]);
  }

  clickedRedirectToPayment(){
    this.redirectToPayment=true;
  }

  clickedRedirectToHomePage(){
    this.redirectToPayment=false;
  }

  checkIfCarCanBeRentedSelectedDates(){
    this.rentalService.checkIfCarCanBeRented(this.carDetails[0].carId,new Date(this.rentDate),new Date(this.returnDate)).subscribe(response=>{
      this.addToCart();
    },errorResponse=>{
      this.toastrService.error("Araç belirtilen tarihte zaten başka bir kiralamada bulunuyor","Hata!");
    })
  }
}
