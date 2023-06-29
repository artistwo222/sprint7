import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  formPanel: FormGroup;
  webPrice = 0;
  constructor(
    private servicio: ServicioService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formPanel = this.fb.group({
      pages: [1, [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1)
      ]],
      languages: [1, [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1)
      ]]
    });



    // formPanel:FormGroup=new FormGroup({
    //   pages: new FormControl(1,[
    //     Validators.pattern(/^[0-9]*$/),
    //     Validators.min(1)
    //   ]),
    //   languages: new FormControl(1,[
    //     Validators.pattern(/^[0-9]*$/),
    //     Validators.min(1)
    //   ])
    // });
    // get pagesValue(){
    //   return this.formPanel.get('pages')?.value;
    // }
    // get languagesValue(){
    //   return this.formPanel.get('languages')?.value;
    // }
    // updatePrice(){
    //   let webPrice:number = this.pagesValue * this.languagesValue * 30;
    //    console.log(webPrice);
    //    this.servicio.throwBudget.next(webPrice);
    //  }

    this.formPanel.valueChanges.subscribe(() => {
      this.webPrice = this.formPanel.value.pages * this.formPanel.value.languages * 30;
      this.servicio.throwBudget.next(this.webPrice);

      console.log(this.webPrice, 'este precio');
    });

  }
  increasePage() {
    this.formPanel.patchValue({ pages: this.formPanel.value.pages + 1 });
  }

  decreasePage() {
    if (this.formPanel.value.pages > 1) {
      this.formPanel.patchValue({ pages: this.formPanel.value.pages - 1 });
    }
  }

  increaseLanguage() {
    this.formPanel.patchValue({ languages: this.formPanel.value.languages + 1 });
  }

  decreaseLanguage() {
    if (this.formPanel.value.languages > 1) {
      this.formPanel.patchValue({ languages: this.formPanel.value.languages - 1 });
    }
  }

  //MODAL

  seePages(modal: any) {
    this.modalService.open(modal, { centered: true });
  }

  seeLanguages(modal: any) {
    this.modalService.open(modal, { centered: true });
  }
}
