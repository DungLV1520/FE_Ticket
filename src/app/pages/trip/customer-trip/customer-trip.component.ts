import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VehicleService } from "../../vehicle/vehicle.service";
import { TripService } from "../trip.service";
import { Customers } from "./customers.model";
import { province } from "./trips";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { CompanyService } from "../../company/company.service";

@Component({
  selector: "app-customer-trip",
  templateUrl: "./customer-trip.component.html",
  styleUrls: ["./customer-trip.component.scss"],
})
export class CustomerTripComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  provinceData: any[] = [];
  term: any;
  currentpage: number;
  title: string;
  totalPage: number;
  stationService: any;
  idDelete: string;
  customerDataVehicle: any;
  customerDataCompany: any;
  _number: number;
  loading: boolean = true;
  from: number;
  to: number;
  startTime: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripService,
    private vehicleService: VehicleService,
    private toastService: ToastrService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "Trip" }, { label: "List", active: true }];

    this.formData = this.formBuilder.group({
      id: [""],
      from: ["", [Validators.required]],
      to: ["", [Validators.required]],
      guestCapacity: ["", Validators.required],
      startTime: ["", [Validators.required]],
      vehicle: ["", Validators.required],
      company: ["", Validators.required],
      price: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this._province();
    this._fetchDataCompany();
  }

  private _province() {
    this.provinceData = province;
  }

  private _fetchData() {
    this.loading = true;
    this.tripService.getTrip().subscribe(
      (data: any) => {
        this.customersData = data.trips;
        this.totalPage = data.count;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private _fetchDataCompany() {
    this.companyService.getCompany().subscribe((data: any) => {
      this.customerDataCompany = data.body.companies;
    });
  }

  getVehicleFromCompany(event?: any) {
    this.vehicleService
      .getVehicleByIDCompany(this.formData.value.company)
      .subscribe((data: any) => {
        this.customerDataVehicle = data?.vehicles;
      });
    this.formData.patchValue({
      vehicle: "",
    });
    this.customerDataVehicle = event.vehicles.filter((data) => {
      return data.isCreatedTrip === false;
    });
  }

  guestCapacity(event?: any) {
    this._number = event.guestCapacity;
    this.formData.patchValue({
      guestCapacity: this._number,
    });
  }

  get form() {
    return this.formData.controls;
  }

  getPageTrip(event): void {
    this.loading = true;
    this.currentpage = event;
    this.loading = true;
    this.tripService.getTrip(event).subscribe(
      (data: any) => {
        this.customersData = data.trips;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  saveCustomer() {
    const id = this.formData.value.id;
    if (id !== undefined && id !== null) {
      this.updateTrip(id);
    } else {
      this.creatTrip();
    }
    this.submitted = true;
  }

  creatTrip() {
    if (this.formData.valid) {
      this.loading = true;
      this.tripService.creatTrip(this.formData?.value).subscribe(
        () => {
          this.toastService.success("Create trip success!");
          this._fetchData();
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Create trip failed!");
        }
      );
    }
  }

  updateTrip(id: string) {
    if (this.formData.valid) {
      this.loading = true;
      this.tripService.updateTrip(this.formData.value, id).subscribe(
        () => {
          this.toastService.success("Update trip success!");
          this._fetchData();
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Update trip failed!");
        }
      );
    }
  }

  deleteTrip() {
    this.loading = true;
    this.tripService.deleteTrip(this.idDelete).subscribe(
      () => {
        this.toastService.success("Delete trip success!");
        this._fetchData();
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.toastService.error("Delete trip failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content?: any, checkEdit?: boolean, item?: any) {
    this.submitted = false;
    this.title = !checkEdit ? "Add Trip" : "Update Trip";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item?._id,
        from: item?.from,
        to: item?.to,
        company: item?.company?._id,
        guestCapacity: item?.guestCapacity,
        vehicle: item?.vehicle?._id,
        startTime: moment(item?.startTime).toISOString().substring(0, 10),
        price: item?.price,
      });
    } else {
      this.formData.reset();
    }
  }

  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any, id: string) {
    this.idDelete = id;
    this.modalService.open(contentdelete);
  }

  navigateStation(): void {
    this.router.navigateByUrl("ecommerce/product-detail/1");
  }

  getProvince(from: any) {
    let id = 0;
    for (let i = 0; i < this.provinceData.length; i++) {
      if (this.provinceData[i].idProvince === from) {
        id = this.provinceData[i].name;
        break;
      }
    }
    return id;
  }

  searchTrip(): void {
    this.loading = true;
    if (this.from && this.to) {
      const objTrips = {
        from: this.from,
        to: this.to,
        startTime: `${this.startTime.year}-${
          Number(this.startTime.month) < 10
            ? "0" + this.startTime.month
            : this.startTime.month
        }-${
          Number(this.startTime.day) < 10
            ? "0" + this.startTime.day
            : this.startTime.day
        }`,
      };

      console.log(objTrips);

      this.loading = true;
      this.tripService.searchTrip(objTrips).subscribe((data: any) => {
        this.customersData = data.filterd;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this._fetchData();
    }
  }
}
