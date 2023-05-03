import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
})
export class VerificationComponent implements OnInit {
  constructor() {}
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.remove("auth-body-bg");
  }
}
