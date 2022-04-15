import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private router: Router, private formBuiler: FormBuilder) {}

  errorMessage = '';

  ngOnInit(): void {
    this.formGroup = this.formBuiler.group({
      uname: ['', Validators.required],
      pword: ['', Validators.required],
    });
  }

  async submitLogin(): Promise<void> {
    const identifier = this.formGroup.value.uname;
    const password = this.formGroup.value.pword;

    console.log("click")
    if (identifier.trim().length === 0) {
      this.errorMessage = 'User name is required';
    } else if (password.trim().length === 0) {
      this.errorMessage = 'Password is required';
    } else {
      this.errorMessage=""
      try {
        const response = await axios.post(
          'http://localhost:1337/api/auth/local',
          {
            identifier,
            password,
          }
        );
        if ((response.status = 200)) {
          this.router.navigate(['home']);
          console.log(response.status);
          sessionStorage.setItem('jwt', response.data.jwt);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong!');
      }
    }
  }
}
