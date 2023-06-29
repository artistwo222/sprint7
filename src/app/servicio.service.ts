import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { budgetData } from '../app/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  throwBudget: Subject<number> = new Subject();
  budgetDataList: budgetData[] = [];

  constructor(private router: Router) { }

  addBudgetData(data: budgetData) {
    const newId = uuidv4();
    data.id = newId;
    this.budgetDataList.push(data);
    console.log('listado', this.budgetDataList);
  }

  getBudgetData() {
    return this.budgetDataList;
  }

  sortByDate() {
    this.budgetDataList.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  sortByName() {
    this.budgetDataList = this.budgetDataList.sort((a, b) => {
      const nameA = a.client.toLocaleLowerCase();
      const nameB = b.client.toLocaleLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  resetByDate() {
    this.budgetDataList.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getPresupuestoPorId(id: string) {
    return this.budgetDataList.find(presupuesto => presupuesto.id === id);
  }
}
