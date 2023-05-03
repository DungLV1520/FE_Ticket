import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customers } from "./customers/customers.model";
import { SERVER_URL } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class StationService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getStation(page?: number) {
    return this.http.get(`${this.SERVER_URL}/stations/all?pageNumber=${page}`);
  }

  creatStation(stations: Customers) {
    return this.http.post(`${this.SERVER_URL}/stations`, stations);
  }

  updateStation(stations: Customers, id: string) {
    return this.http.put(`${this.SERVER_URL}/stations/${id}`, stations);
  }

  deleteStation(id: string) {
    return this.http.delete(`${this.SERVER_URL}/stations/${id}`);
  }

  searchStation(station: any) {
    return this.http.post(`${this.SERVER_URL}/stations/post`, station);
  }
}
