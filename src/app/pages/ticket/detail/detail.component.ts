import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Invoices" },
      { label: "Detail", active: true },
    ];
  }
}
