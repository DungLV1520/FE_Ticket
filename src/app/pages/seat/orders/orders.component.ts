import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { VehicleService } from "../../vehicle/vehicle.service";
import { SeatService } from "./orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  providers: [],
})
export class OrdersComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: any[];
  term: any;
  title!: string;
  currentpage: number;
  totalPage: number;
  idDelete: string;
  stationsData: any;
  vehicleData: any;
  loading: boolean = true;
  formSearch: FormGroup;
  tableDataVe: any;

  constructor(
    private seatService: SeatService,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "Seat" }, { label: "List", active: true }];

    this.formSearch = this.formBuilder.group({
      type: [""],
    });

    this.currentpage = 1;
    this._fetchData();
    this._fetchDataVe();
  }

  _fetchDataVe() {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.tableDataVe = data.vehicles;
    });
  }

  checkVehi(id: string): string {
    for (let i = 0; i < this.tableDataVe.length; i++) {
      if (this.tableDataVe[i]._id === id) {
        return this.tableDataVe[i].name;
      }
    }
    return "";
  }

  getPageSeat(event): void {
    this.loading = true;
    this.loading = true;
    this.currentpage = event;
    this.seatService.getSeat(event).subscribe(
      (data: any) => {
        this.customersData = data.seats;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private _fetchData() {
    this.loading = true;
    this.seatService.getSeat().subscribe(
      (data: any) => {
        this.customersData = data.seats;
        this.totalPage = data.count;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  searchSeat(): void {
    this.loading = true;
    this.seatService.searchSeat(this.formSearch.value).subscribe(
      (data: any) => {
        this.customersData = data.seats;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
