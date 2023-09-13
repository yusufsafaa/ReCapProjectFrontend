import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  calculateDay(rentDate:string,returnDate:string){
    let rentDateAsMs=this.convertDateToMs(rentDate);
    let returnDateAsMs=this.convertDateToMs(returnDate);
    let diffInMilliseconds = returnDateAsMs - rentDateAsMs;
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
  }

  getTimeNow(){
    let currentDate=new Date();
    let year=currentDate.getFullYear();
    let month=currentDate.getMonth()+1;
    let day=currentDate.getDate()+1;
    let currentDateString=year+"-"+month+"-"+day;
    return currentDateString;
  }
  
  convertDateToMs(date: string): number {
    const data = date.split("-");
    const year = parseInt(data[0]);
    const month = parseInt(data[1]);
    const day = parseInt(data[2]);
    return new Date(year, month, day).getTime()
  }


}
