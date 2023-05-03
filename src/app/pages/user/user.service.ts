import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "src/app/app.constant";
import { Customers } from "./customers/customers.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getUser(page?: number) {
    return this.http.get(`${this.SERVER_URL}/users/all?pageNumber=${page}`);
  }

  createUser(users: Customers) {
    return this.http.post(`${this.SERVER_URL}/users/register`, users);
  }

  updateUser(users: Customers, id: string) {
    return this.http.put(`${this.SERVER_URL}/users/${id}`, users);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.SERVER_URL}/users/${id}`);
  }

  searchUser(user: any) {
    return this.http.post(`${this.SERVER_URL}/users/search`, user);
  }
}
