export interface Orders {
  date: string;
  type: string;
  coin: string;
  value: string;
  usd: string;
  status: string;
}

export interface SearchResult {
  orders: Orders[];
  total: number;
}
