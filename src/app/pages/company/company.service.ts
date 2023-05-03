import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class CompanyService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getCompany(page?: number): Observable<HttpResponse<any>> {
    return this.http.get(
      `${this.SERVER_URL}/companies/all?pageNumber=${page}`,
      {
        observe: "response",
      }
    );
  }

  createCompany(companies: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.SERVER_URL}/companies`, companies, {
      observe: "response",
      responseType: "blob",
    });
  }

  updateCompany(companies: any, id: string): Observable<HttpResponse<any>> {
    return this.http.put(`${this.SERVER_URL}/companies/${id}`, companies, {
      observe: "response",
      responseType: "blob",
    });
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.SERVER_URL}/companies/${id}`);
  }

  searchCompany(company: any) {
    return this.http.post(`${this.SERVER_URL}/companies/search`, company);
  }
}
