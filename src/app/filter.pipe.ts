import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, texto: string): any {
    console.log(value, texto, 'holahola');
    if (texto === '') {
      return value;
    }
    return value.filter((item: any) => {
      console.log(item);
      return item.budget.toLowerCase().includes(texto.toLowerCase());
    });
  }

}
