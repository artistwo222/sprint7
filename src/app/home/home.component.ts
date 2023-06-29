import { ServicioService } from './../servicio.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



export interface budgetData {
  id: string,
  client: string,
  budget: string,
  web: boolean,
  seo: boolean,
  google: boolean,
  totalPrice: number,
  webPrice: number,
  date: Date
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  budgetForm: FormGroup;
  data: budgetData[] = [];
  webLangPagePrice: number = 30;
  isOn: boolean = false;
  webPrice: number = 500;
  seoPrice: number = 300;
  googlePrice: number = 200;
  price: number = 0;



  ngOnInit() {
    this.servicio.throwBudget.subscribe(dataPrice => {
      this.webLangPagePrice = dataPrice;
      this.updatePrice()

    });
  }

  constructor(private servicio: ServicioService, private router: Router, private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      client: ['', [Validators.required, this.customValidation]],
      budget: ['', [Validators.required, this.customValidation]],
      web: [false],
      seo: [false],
      google: [false]
    }, { validator: this.checkAtLeastOneSelected });

  }
  checkAtLeastOneSelected(group: FormGroup) {
    const google = group.get('google')?.value;
    const web = group.get('web')?.value;
    const seo = group.get('seo')?.value;

    return (google || web || seo) ? null : { checkAtLeastOneSelected: true };
  }


  get webValue() {
    return this.budgetForm.get('web')?.value ? this.webPrice : 0;
  }

  get seoValue() {
    return this.budgetForm.get('seo')?.value ? this.seoPrice : 0;
  }

  get googleValue() {
    return this.budgetForm.get('google')?.value ? this.googlePrice : 0;
  }

  updatePrice() {
    this.price = this.webValue + this.seoValue + this.googleValue;
    if (this.webValue) {
      this.price = this.webValue + this.webLangPagePrice + this.seoValue + this.googleValue;
      console.log('webprice', this.webLangPagePrice);
    } else {
      this.webLangPagePrice = 30;
    }
    console.log(this.price, 'precio');
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }

  saveBudget() {
    if (this.budgetForm.invalid) {
      return;
    }
    let values: budgetData = this.budgetForm.value;
    values.totalPrice = this.price;
    values.webPrice = this.webValue + this.webLangPagePrice;
    this.servicio.addBudgetData(values);
    values.date = new Date();
    this.budgetForm.reset();
    this.price = 0;
  }

  customValidation(control: FormControl) {
    if (control.value && control.value.trim().length === 0) {
      return { required: true, messager: 'El campo es requerido' }
    }
    return null;
  }
}
