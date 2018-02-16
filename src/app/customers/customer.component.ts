import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators,AbstractControl,ValidatorFn} from '@angular/forms'

import { Customer } from './customer';

function ratingRange(min:number,max:number): ValidatorFn{
    return (c:AbstractControl):{[key:string]:boolean}|null =>{
        if(c.value != undefined && (isNaN(c.value) || c.value< min || c.value>max)){
            return{'range':true};
        };
        return null;
    };
}
/*
function ratingRange(c:AbstractControl):{[key:string]:boolean}|null{
        if(c.value != undefined && (isNaN(c.value) || c.value< 1 || c.value>5)){
            return{'range':true};
        };
        return null;
    };
*/
function emailMatcher(c:AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if(emailControl.pristine || confirmControl.pristine){
        return null;
    }
    if(emailControl.value === confirmControl.value){
        return null;
    }
    return{'match': true};
}
@Component({
    selector: 'my-signup',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb:FormBuilder){ }
    ngOnInit(): void{
        this.customerForm =this.fb.group({
            firstName:['',[Validators.required,Validators.minLength(3)]],
            lastName:['',[Validators.required,Validators.maxLength(50)]],
            emailGroup:this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
                confirmEmail:['',Validators.required],
            },{validator:emailMatcher}),
            phone:'',
            notification:'email',
            rating:['',ratingRange(1,5)],
            
        })
        /*this.customerForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl()
        })*/
    }

    /*populateTestData(): void{
        this.customerForm.setValue({
            firstName:'Aakash',
            lastName:'Handa',
            email:'ahanda205@gmail.com'
        })
    }*/
    
    populateTestData(): void{
        this.customerForm.patchValue({
            firstName:'Aakash',
            lastName:'Handa',
            email:'a@a.com'
        })
    }
    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }
