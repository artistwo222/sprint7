import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit {
  presupuestoActual: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const budgetDecoded = JSON.parse(atob(params['budget']));
      this.presupuestoActual = budgetDecoded;
      console.log({ budgetDecoded });
    });
  }

  constructor(private route: ActivatedRoute) { }

}
