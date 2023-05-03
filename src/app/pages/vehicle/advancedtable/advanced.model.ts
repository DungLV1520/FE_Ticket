export interface Vehicle {
  name: string;
  position: string;
  office: string;
  age: number;
  date: string;
  salary: string;
}

export interface SearchResult {
  tables: Vehicle[];
  total: number;
}
