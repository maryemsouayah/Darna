import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {
  transform(value: any, eventValue: any): any {
    if(!value) return [];
    if (eventValue == null) {
      return value;
    } else {
      return value.filter( (item) => item.nameEvent.includes(eventValue.toLocaleLowerCase()) ||item.dateBeginEvent.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase())  || item.dateEndEvent.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase()) || item.lieu.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase())  );
    }
  }
}
toString();

