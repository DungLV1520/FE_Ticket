import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../core/models/auth.models";
import { SERVER_URL } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class AuthService {
  SERVER_URL = SERVER_URL;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.SERVER_URL}/users/login`, { email, password })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  register(user: User) {
    return this.http.post(`${this.SERVER_URL}/users/register`, user);
  }

  updateProfile(user: User) {
    return this.http.put(`${this.SERVER_URL}/users/update`, user);
  }

  forgetPass(user: any) {
    return this.http.post(`${this.SERVER_URL}/users/forgot`, user);
  }
}
