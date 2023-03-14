import {Component, OnInit, OnDestroy, HostListener, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import {RentalRequestService} from '../services/RentalRequest/rental-request.service';
import {environment} from '../../../environments/environment';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-joinus',
  templateUrl: 'join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit, OnDestroy {
  registerform: FormGroup;
  private stepper: Stepper;
  showValidationError = false;

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

  constructor(private fb: FormBuilder, private rentalService: RentalRequestService, private toastr: ToastrService) {
    const formcontrols = {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\p{L}'-]+$/u),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\p{L}'-]+$/u),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      secondEmail: new FormControl('', [
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ]),
      secondPhone: new FormControl('', [
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ]),
      matriculateFiscal: new FormControl('', [
        Validators.required,
      ]),
      company: new FormControl('', [
        Validators.required,
      ]),
      address: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\p{L}'-]+$/u),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\p{L}'-]+$/u),
      ]),
      postalCode: new FormControl('', [
        Validators.required,
      ]),
      webSiteLink: new FormControl('', []),
      linkedinUrl: new FormControl('', []),
      recaptcha: new FormControl('', [Validators.required])
    };
    this.registerform = this.fb.group(formcontrols);
  }

  get firstName(){
    return this.registerform.get('firstName');
  }

  get lastName(){
    return this.registerform.get('lastName');
  }

  get email(){
    return this.registerform.get('email');
  }

  get secondEmail(){
    return this.registerform.get('secondEmail');
  }

  get phone(){
    return this.registerform.get('phone');
  }

  get secondPhone(){
    return this.registerform.get('secondPhone');
  }

  get address(){
    return this.registerform.get('address');
  }

  get matriculateFiscal(){
    return this.registerform.get('matriculateFiscal');
  }
  get company(){
    return this.registerform.get('company');
  }

  get country(){
    return this.registerform.get('country');
  }

  get city(){
    return this.registerform.get('city');
  }

  get postalCode(){
    return this.registerform.get('postalCode');
  }


  get linkedinUrl(){
    return this.registerform.get('linkedinUrl');
  }

  get webSiteLink(){
    return this.registerform.get('webSiteLink');
  }

  stepOwnerIsInvalid() : boolean{
    return this.firstName.invalid || this.lastName.invalid || this.email.invalid || this.phone.invalid;
  }
  stepCompanyIsInvalid() : boolean {
    return this.matriculateFiscal.invalid || this.company.invalid || this.country.invalid || this.city.invalid || this.postalCode.invalid
  }

  next(step : string)
  {
    if (step === 'company'){
      if (this.stepOwnerIsInvalid()) {
        this.showValidationError = true;
      }else {
        this.showValidationError = false;
        this.stepper.next();
      }
    } else if (step === 'additional'){
      if (this.stepCompanyIsInvalid()) {
        this.showValidationError = true;
      }else {
        this.showValidationError = false;
        this.stepper.next();
      }
    }
  }

  previous(){
    this.stepper.previous();
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  register(): void {
     const  user:User=this.registerform.value;
      this.rentalService.sendRequest(user).subscribe(res => {
        this.toastr.success('Your request sent successfully!', 'Success');
      },err => {
        this.toastr.error('Something went wrong', 'Error');
      });
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
  ngOnDestroy() {}
}
