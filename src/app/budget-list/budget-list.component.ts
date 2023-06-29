import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { budgetData } from '../home/home.component';  // Ajusta la ruta de importación según la ubicación real de home.component.ts

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  ngOnInit(): void {


  }
  budgetDataList: budgetData[];
  budgetReset: budgetData[];
  filterBudget = '';
  constructor(private servicio: ServicioService, private route: ActivatedRoute, private router: Router) {
    this.budgetDataList = this.servicio.getBudgetData();
    this.budgetReset = this.budgetDataList;
    console.log(this.budgetDataList);
  }

  filterByDate() {
    this.servicio.sortByDate();
  }

  filterByName() {
    this.servicio.sortByName();
  }

  resetOrder() {
    this.servicio.resetByDate();
  }

  onSaveBudgetURL(budget: budgetData) {
    const params = this.route.snapshot.queryParams['data'];
    console.log(params);
    console.log('este es el budget', budget);
    const budgetObject = JSON.parse(decodeURIComponent(params));
    const budgetDataParams = budgetObject.data;
    console.log('params', params, budgetDataParams);

  }

  viewBudgetDetail(id: string) {
    const budget = this.servicio.getPresupuestoPorId(id);
    const budgetEncoded = btoa(JSON.stringify(budget));
    this.router.navigate(['/presupuesto'], { queryParams: { budget: budgetEncoded } });
  }

}
