import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class SeatService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getSeat(page?: number) {
    return this.http.get(`${this.SERVER_URL}/seats/all?pageNumber=${page}`);
  }

  searchSeat(seat: any) {
    return this.http.post(`${this.SERVER_URL}/seats/search`, seat);
  }
}
