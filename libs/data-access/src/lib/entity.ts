export interface Entity {
  id?: string;
  ttl?: number;
  type: string;
  [key: string]: any;
}
