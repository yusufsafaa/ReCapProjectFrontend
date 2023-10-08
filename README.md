# <p align="center">Rent A Car</p>

RentACar is a car rental web application. It allows users to view, review and rent vehicles in the system.

## Contents
- [Pages](#pages)
- [Features](#features)
- [Getting Started](#getting-started)
  * [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Associated Project](#associated-project)
- [Contributions](#contributions)

## Pages

  <h3 align="center">HOMEPAGE LOGGED IN</h3>
  
  ---   

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/homepage-logged-in.png)

  <br>
  
  <h3 align="center">HOMEPAGE NOT LOGGED IN</h3>
  
  ---  

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/homepage-not-logged-in.png)

  <br>
  
  <h3 align="center">CAR DETAIL</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/car-detail.png)

  <br>
  
  <h3 align="center">RENTAL DATE SELECTION</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/rental-date-selection.png)

  <br>
  
  <h3 align="center">COLOR FILTER</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/color-filtering.png)

  <br>
  
  <h3 align="center">PAYMENT WITH UNSAVED CART</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/payment-with-unsaved-cart.png)

  <br>
  
  <h3 align="center">PAYMENT WITH SAVED CART</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/payment-with-saved-cart.png)

  <br>
  
  <h3 align="center">SUCCESSFUL PAYMENT</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/successful-payment.png)

  <br>
  
  <h3 align="center">PROFILE</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/profile.png)

  <br>
  
  <h3 align="center">LOGIN</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/login.png)

  <br>
  
  <h3 align="center">REGISTER</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/register.png)

  <br>
  
  <h3 align="center">CAR MANAGEMENT</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/car-management.png)

  <br>
  
  <h3 align="center">ADD CAR</h3>
  
  ---

  ![](https://raw.githubusercontent.com/yusufsafaa/RentACarFrontend/main/project-images/add-car.png)

  
## Features

+ If the user's token period has expired, the system is automatically logged out
+ Users can view and update their information
+ Vehicles can be filtered by vehicle properties
+ Access to unauthorized pages is blocked with role-based authorization
+ While adding the vehicle to the cart, it is questioned whether the vehicle has been rented before and if the vehicle is suitable, it is added to the cart
+ Users can register their credit cards in the system and pay with saved credit cards
+ The user's cart is kept in a database, so that even if the user logs out, the remaining vehicles in the cart will not be lost.

## Getting Started

The project needs a backend to run properly. So first of all, review and install [RentACarBackend](https://github.com/yusufsafaa/RentACar).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yusufsafaa/RentACar.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run
   ```sh
   ng serve
   ```

## Tech Stack
| Technology / Library | Version |
| ------------- | ------------- |
| Angular | 16.2.0 |
| Angular Material | 16.2.0 |
| Bootstrap | 5.1.0 |
| Jquery | 3.6.0 |
| rxjs | 7.8.1 |
| auth0/angular-jwt | 5.0.2 |
| ngx-toastr | 14.1.3 |
| typescript | 5.1.6 |
| zone.js | 0.13.1 |

## Associated Project

The backend of this project [RentACarBackend](https://github.com/yusufsafaa/RentACar)

## Contributions

Thanks to dear [Engin Demiroğ](https://github.com/engindemirog) for his contributions.
