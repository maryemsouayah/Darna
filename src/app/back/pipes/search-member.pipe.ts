import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMember',
})
export class SearchMemberPipe implements PipeTransform {
  transform(value: any, memberValue: any): any {
    if (memberValue == null) {
      return value;
    } else {
      return value.filter(
        (item) =>
          item.fullName.includes(memberValue.toLocaleLowerCase()) ||
          item.email.toLocaleLowerCase().includes(memberValue.toLocaleLowerCase()) ||
          item.job.toString().includes(memberValue) || item.phone.toString().includes(memberValue)
      );
    }
  }
}
toString();
