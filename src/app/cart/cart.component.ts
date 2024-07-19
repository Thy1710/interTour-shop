import { Component,inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any = [];
  productService : ProductService = inject(ProductService);
  constructor() {
    
  }
  ngOnInit(){
    this.cart = this.productService.getCart();
    console.log(this.cart)
  }
  deleteCart(id: number): void{
    console.log(id);
    this.productService.deleteCart(id);
    this.cart = this.productService.getCart()
  }
  sumMoney():number{
    return this.productService.getSumMoney();
  }
}
