import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PayComponent } from './pay/pay.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent} from './search/search.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home',component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'cart', component: CartComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'detail/:id', component: DetailComponent},
    { path: 'login', component: LoginComponent},
    { path: 'pay', component: PayComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'search', component: SearchComponent}
];
