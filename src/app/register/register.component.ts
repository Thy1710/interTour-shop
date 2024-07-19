import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = "";
  username: string = "";
  password: string = "";
  repassword: string = "";
  gender: string = "";
  remember_check: number = 0
  isEmailValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  isPasswordValid(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    // (?=.*\d)        //bao gồm ít nhất một chữ số
    // (?=.*[a-z])     //bao gồm ít nhất một chữ cái thường
    // (?=.*[A-Z])     //bao gồm ít nhất một chữ cái viết hoa
    // .{8,20}         //có từ 6 đến 20 ký tự
    return re.test(password);
  }
  constructor(private router: Router){}
  async onSubmit(): Promise<void> {

    if (!this.email || !this.username || !this.password || !this.repassword || !this.remember_check) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (this.password !== this.repassword) {
      return;
    }
    if (!this.isEmailValid(this.email)) {
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      return;
    }

    // Check trùng username
    try {
      const response = await fetch('http://localhost:3000/users?username=' + this.username);
      const data = await response.json()
      if (data.length > 0) {
        alert("Tên Đăng Nhập đã tồn tại, hãy nhập khác");
        return
      }
    } catch (error) {
      console.error('Lỗi: ', error)
    }
    try {
      const response = await fetch('http://localhost:3000/users?email=' + this.email);
      const data = await response.json()
      if (data.length > 0) {
        alert("Email đã tồn tại, hãy nhập khác");
        return
      }
    } catch (error) {
      console.error('Lỗi: ', error)
    }

    const hashedPassword = bcrypt.hashSync(this.password, 10);
    const user = {
      username: this.username,
      email: this.email,
      password: hashedPassword,
      gender: this.gender,
      role: 'user'
    }
    const url = 'http://localhost:3000/users'; // Thay đổi URL theo cài đặt JSON Server
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json()
      this.router.navigate(['/login']);
      alert("Bạn đã đăng ký thành công");
    } catch (error) {
      console.error('Lỗi Đăng Ký: ', error)
    }
  }
}
