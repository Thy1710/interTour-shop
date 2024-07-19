import { Component, inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  selectedSort: string = 'asc';
  productsTournuocngoai : ProductInterface[] = []
  productService : ProductService = inject(ProductService);
  constructor(){
    this.productService.getListProducts('http://localhost:3000/products?category=tournuocngoai').then((data:ProductInterface[])=>{
      this.productsTournuocngoai = data;
    });
  }
  onSortChange(): void {
    if (this.selectedSort === 'asc') {
      this.productsTournuocngoai.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.productsTournuocngoai.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }

}
