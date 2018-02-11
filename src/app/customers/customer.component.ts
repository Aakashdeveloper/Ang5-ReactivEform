import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms'

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
            firstName:'',
            lastName:'',
            email:''
        })
        /*this.customerForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl()
        })*/
    }

    populateTestData(): void{
        this.customerForm.setValue({
            firstName:'Aakash',
            lastName:'Handa',
            email:'ahanda205@gmail.com'
        })
    }
    /*
    populateTestData(): void{
        this.customerForm.patchValue({
            firstName:'Aakash',
            lastName:'Handa'
        })
    }*/
    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
