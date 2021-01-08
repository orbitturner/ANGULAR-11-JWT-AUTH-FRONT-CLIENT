import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.authService.getUserRole();
    }
  }

  onSubmit(): void {
    const user = this.form;

    this.authService.login(user).then(
      (loginState) => {
        if (loginState){
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.authService.getUserRole();
          this.reloadPage();
        }else{
          this.errorMessage = "USER CREDS INCORRECT";
          this.isLoginFailed = true;
        }
      },
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
