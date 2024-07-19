import { Component,inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  userService : UserService = inject(UserService)
  constructor(private router: Router){}
  async onSubmit(): Promise<void>{
    if(!this.username || !this.password){
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/users?username='+this.username);
      const data = await response.json();
      if(data.length==0){
        alert("Tài Khoản Không Tồn Tại")
      }
      if(!bcrypt.compareSync(this.password,data[0].password)){
        alert("Sai Mật Khẩu !")
        return
      }else{
        alert("Đăng Nhập Thành Công !")
        this.userService.setUser(data[0]);
        this.router.navigate(['/'])
      }
    } catch (error) {
      console.log("Lỗi",error)
    }
  }
}
