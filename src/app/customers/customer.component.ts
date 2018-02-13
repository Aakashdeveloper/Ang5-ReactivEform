import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms'

import { Customer } from './customer';

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
            email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            phone:'',
            notification:'email'
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
