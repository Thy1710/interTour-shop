import { Component,inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  productService: ProductService =inject(ProductService);
  constructor( private router: Router) { }
  //Chức năng tìm kiếm
  onSearch(inputsearch: string) {
    this.productService.setKeyword(inputsearch);
    console.log(inputsearch);
    if(this.router.url === '/search'){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/search']);
      }else{  
        this.router.navigate(['/search']);
      }
  }

}
