import { Pipe, PipeTransform } from '@angular/core';
import { IFilter } from '../interfaces/ifilter';
import { ISVGdata } from '../interfaces/isvgdata';

const filters = [
  (item, filter) => item.comment.match(new RegExp(filter.query, 'i')),
  (item, filter) => {
    if (!filter.dateTo && !filter.dateFrom) {
      return true;
    }
    if (!filter.dateTo) {
      return new Date(item.timeStamp) >= new Date(filter.dateFrom);
    } else {
      return new Date(item.timeStamp) <= new Date(filter.dateTo);
    }
  }
];

@Pipe({
  name: 'svgFilter',
  pure: false
})
export class SvgFilterPipe implements PipeTransform {

  transform(value: Array<ISVGdata>, filter: IFilter, args?: any): Array<ISVGdata> {
    return value.filter( item => {
      return filters.every(filterFunction => filterFunction(item, filter));
    }).sort((a, b) => {
      if (filter.sortBy === 'date') {
        if (filter.sortDirection === 'up') {
          return a.timeStamp > b.timeStamp ? 1 : -1;
        } else {
          return a.timeStamp < b.timeStamp ? 1 : -1;
        }
      } else {
        if (filter.sortDirection === 'up') {
          return a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1;
        } else {
          return a.comment.toUpperCase() < b.comment.toUpperCase() ? 1 : -1;
        }
      }
    });
  }
}
