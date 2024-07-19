import { Component} from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-timkiem',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  keyword: string = '';
  productSearch : ProductInterface[] = [];
  constructor( private productService: ProductService) {
  }
  ngOnInit() {
    this.keyword = this.productService.getKeyword();
    console.log(this.keyword);
    this.productService.getListProducts('http://localhost:3000/products').then((data:ProductInterface[])=>{
      this.productSearch = data.filter((product:ProductInterface) => product.name.toLowerCase().includes(this.keyword.toLowerCase()));
      console.log(this.productSearch);
    }
    );
  }
}
