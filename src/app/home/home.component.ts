import { Component, inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productsHot : ProductInterface[] = []
  productsTournuocngoai : ProductInterface[] = []
  productsTourtrongnuoc : ProductInterface[] = []
  productService : ProductService = inject(ProductService);
  constructor(){
    this.productService.getListProducts('http://localhost:3000/products?hot=1').then((data:ProductInterface[])=>{
      this.productsHot = data;
    });
    this.productService.getListProducts('http://localhost:3000/products?category=tournuocngoai').then((data:ProductInterface[])=>{
      this.productsTournuocngoai = data;
    });
    this.productService.getListProducts('http://localhost:3000/products?category=tourtrongnuoc').then((data:ProductInterface[])=>{
      this.productsTourtrongnuoc = data;
    });
  }
}
