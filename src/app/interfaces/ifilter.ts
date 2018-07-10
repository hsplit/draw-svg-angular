export interface IFilter {
  query: string;
  dateFrom: string;
  dateTo: string;
  sortBy: 'date' | 'name';
  sortDirection: 'up' | 'down';
}
