import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators,
        AbstractControl,ValidatorFn,FormArray} from '@angular/forms'

import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';

function ratingRange(min:number,max:number): ValidatorFn{
    return (c:AbstractControl):{[key:string]:boolean}|null =>{
        if(c.value != undefined && (isNaN(c.value) || c.value< min || c.value>max)){
            return{'range':true};
        };
        return null;
    };
}

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
    emailMessage:string;
    showAddress:false;

    get addresses(): FormArray{
        return <FormArray>this.customerForm.get('addresses');
    }
    private validationMessage = {
        required:'Please enter your email address',
        pattern:'Please enter a valid email'
    }
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
            sendCatalog:'',
            addresses: this.fb.array([this.buildAddress()])
            
        })

        this.customerForm.get('notification').valueChanges
                            .subscribe(value => this.setNotification(value))
        this.customerForm.get('sendCatalog').valueChanges
                            .subscribe(value => this.showAddress= value)
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(emailControl));
       
    }
    setMessage(c:AbstractControl):void{
        this.emailMessage="";
        if((c.touched||c.dirty) && c.errors){
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessage[key]).join(' ');
        }
    }
    buildAddress(): FormGroup{
        return this.fb.group({
            addressType:'home',
            street1:'',
            street2:'',
            city:'',
            zip:''
        })
    }
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

    addAddress(): void{
        this.addresses.push(this.buildAddress())
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
