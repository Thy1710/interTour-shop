import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  productDetail ?: ProductInterface;
  productService : ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit():void{
    const id  = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProductDetail('http://localhost:3000/products/'+id).then((data:ProductInterface)=>{
      this.productDetail = data;
    });
  }
  addCart(quantity: string): void{
    if (this.productDetail) {
      this.productService.addCart(this.productDetail,parseInt(quantity,10)) 
      console.log(this.productService.getCart())
    }
  }
}
