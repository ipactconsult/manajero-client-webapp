import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-joinus',
  templateUrl: 'join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit, OnDestroy {
  registerform: FormGroup;
  enable = false;
  private stepper: Stepper;

  constructor(private fb: FormBuilder, private userService: UserService,private toastr: ToastrService) {
    const formcontrols = {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
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
      ]),
      secondPhone: new FormControl(''),

      matriculateFiscal: new FormControl('', [
        Validators.required,
      ]),
      company: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z.\'-]+'),
      ]),
      postalCode: new FormControl('', [
        Validators.required,
      ]),
      webSiteLink: new FormControl('', [
        Validators.pattern('[A-Za-z.\'-]+')
      ]),
      linkedinUrl: new FormControl('', [
        Validators.pattern('[A-Za-z.\'-]+')
      ]),

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

  next()
  {
    this.stepper.next();
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

     const  user:User=this.registerform.value
      this.userService.sendRequest(user).subscribe(res => {

        this.toastr.success('Your request sent successfully!', 'toast-success');
      },err => {
        this.toastr.error(err.error.error, 'toast-error');


      });
  }
  ngOnDestroy() {}
}
