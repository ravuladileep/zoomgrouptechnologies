import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(sortedData: Array<any> , args?: any): any {
    if (sortedData != null) {
      return sortedData.sort((a: any, b: any) => {
        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        } else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        } else {
          return 0;
        }
      });
    }
  }
}

