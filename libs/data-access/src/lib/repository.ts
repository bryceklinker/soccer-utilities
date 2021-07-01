export interface Repository<T> {
  getAll(): Promise<Array<T>>;

  getById(id: string): Promise<T>;
}
