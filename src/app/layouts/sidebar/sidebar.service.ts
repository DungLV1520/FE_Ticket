import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class ProfileService {
  SERVER_URL = SERVER_URL;
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.SERVER_URL}/users/account`);
  }
}
