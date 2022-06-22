export interface IPaginationResult<T> {
  readonly totalData: number;
  readonly totalDataPagination: number;
  readonly dataPagination: T[];
}
