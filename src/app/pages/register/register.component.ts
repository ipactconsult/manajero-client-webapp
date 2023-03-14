import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Stepper from 'bs-stepper';
import {AuthUser} from '../models/AuthUser';
import {RegisterService} from '../services/RegisterService/register.service';
import {ToastrService} from 'ngx-toastr';
import {ReCaptcha2Component} from 'ngx-captcha';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private stepper: Stepper;

  displayStyle = 'none';
  opacity = '0.8';
  token = '';
  _email = '';
  roles;
  matriculate = '';
  isValid = true;
  authUser: AuthUser = new AuthUser();
  formRegister: FormGroup;

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public captchaIsLoaded = false;
  public captchaReset = false;
  public captchaSucess = false;
  public captchaIsExpired = false;
  public captchaResponse? : string;
  public captchaTheme: 'light' | 'dark' = 'light';
  public captchaSize: 'compact' | 'normal' = 'normal';
  public captchaLang =  'en';
  public captchaType : 'image' | 'audio';
  recaptchaSecret: string = environment.captchaKey;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private us: RegisterService,
      private toastr: ToastrService
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
  openPopup() {
    this.displayStyle = 'block';
  }
  stepPasswordIsInvalid() : boolean{
    return this.password.invalid;
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

    this.formRegister = this.formBuilder.group(
        {
          email: new FormControl(this?._email),
          password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)]),
          cfPassword: new FormControl('', [Validators.required]),
          recaptcha: new FormControl('', [Validators.required])
        },
        {
      validator: this.ConfirmedValidator('password', 'cfPassword'),
        }
    )
  }

  callToken(token: string) {
    this.us.validateToken(token).subscribe(
      (res) => {
        if (!res) {
          this.openPopup();
          this.isValid = false;
        }
      });
  }

  callRegister() {
    this.authUser=  new AuthUser();
    const data = this.formRegister.value;
    this.authUser.password = data.password;
    this.authUser.email = data.email;
    this.authUser.roles = this.roles=== null
        ? [{
          id : null,
          name : 'ROLE_ADMIN'
        }]
        : [this.roles];
    this.authUser.matriculate = this.matriculate;

    this.us.register(this.authUser).subscribe(
      (res) => {
        this.toastr.success('Your account has been created successfully!', 'Success');
        // link to admin web app
        window.location.href = 'http://localhost:4200/#/';
      },
      (err) => {
        this.toastr.error('Something went wrong', 'Error');
      }
    );
  }

  callEmailRefresh() {

    this.us.refreshToken(this._email).subscribe(
        (res: any) => {
          console.log(res.token)
          window.location.href = 'http://localhost:4201/#/register/'+this._email+'/'+res.token+'/'+this.matriculate;
          window.location.reload()
        }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
          matchingControl.errors &&
          !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  handleCaptchaSuccess(result){
    this.captchaSucess = !!result;
    this.captchaResponse = this.captchaSucess ? result : null;
  }
  handleCaptchaReset(){
    this.captchaReset = true;
  }
  handleCaptchaExpire(){
    this.captchaIsExpired = true;
  }
  handleCaptchaLoad(){
    this.captchaIsLoaded = true;
  }
}
