import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { AuthUser } from '../models/AuthUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private stepper: Stepper;

  displayStyle = 'none';
  backgroundColor = 'black';
  opacity = '0.8';

  token = '';
  _email = '';
  roles;
  matriculate = '';
  isValid = true;
  isMatch = true;

  authUser: AuthUser = new AuthUser();
  formRegister: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private us: UserService
  ) {}

  get email() {
    return this.formRegister.get('email');
  }
  get password() {
    return this.formRegister.get('password');
  }
  get cfPassword() {
    return this.formRegister.get('cfPassword');
  }

  compare() {
    this.isMatch = this.password.value === this.cfPassword.value;
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get('token');
      this._email = params.get('email');
      this.matriculate = params.get('matriculate');
      this.roles = params.get('role');

    });

    this.callToken(this.token);

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true,
    });

    this.formRegister = new FormGroup({
      email: new FormControl(this?._email),
      password: new FormControl('', [Validators.required]),
      cfPassword: new FormControl('', [Validators.required]),
    });
  }

  callToken(token: string) {
    this.us.validateToken(token).subscribe(
      (res) => {
        if (!res) {
          this.openPopup();
          this.isValid = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  callEmail() {
    this.us.refreshToken(this._email).subscribe(
      (res) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  callRegister() {
    this.authUser=  new AuthUser();
    const data = this.formRegister.value;
    this.authUser.password = data.cfPassword;
    this.authUser.email = data.email;

    if(this.roles === null)
    {
    // @ts-ignore
    this.authUser.roles = [
        {
          id : null,
          name : 'ROLE_ADMIN'
        }];
    }
    else {

      this.authUser.roles=[this.roles];
    }
    this.authUser.matriculate = this.matriculate;
    console.log(this.authUser);
    this.us.register(this.authUser).subscribe(
      (res) => {
        console.log(res);
        window.location.href = 'http://localhost:4200/#/';
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
