import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable, Subject } from "rxjs";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./advanced-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VehicleService } from "../vehicle.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyService } from "../../company/company.service";
import { ToastrService } from "ngx-toastr";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-advancedtable",
  templateUrl: "./advancedtable.component.html",
  styleUrls: ["./advancedtable.component.scss"],
  providers: [DecimalPipe],
})
export class AdvancedtableComponent implements OnInit {
  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  typeSeat: Array<{}>;
  tableData: any[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<any[]>;
  total$: Observable<number>;
  editableTable: any = [];
  totalPage: number;
  currentpage: number;
  loading: boolean = true;
  public isCollapsed = true;
  formData: FormGroup;
  formSearch: FormGroup;
  formSeat: FormGroup;
  submitted = false;
  companyItem: any;
  title: string;
  idDelete: string;
  titleSeat: string;
  titleDelete: string;
  idSeat: string;
  indexSeat: string;
  idTable: string;
  disableUpdate: boolean;
  disableCpn: boolean;

  constructor(
    private modalService: NgbModal,
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Vehicle" },
      { label: "List", active: true },
    ];

    this.typeSeat = [{ type: "VIP" }, { type: "Economy" }];
    this.formData = this.formBuilder.group({
      id: [""],
      guestCapacity: ["", Validators.required],
      company: ["", Validators.required],
      name: ["", [Validators.required]],
    });

    this.formSeat = this.formBuilder.group({
      id: [""],
      sku: ["", Validators.required],
      vehicle: ["", Validators.required],
      type: ["", [Validators.required]],
    });

    this.formSearch = this.formBuilder.group({
      name: [""],
    });

    this.currentpage = 1;
    this._fetchData();
    this.getCompany();

    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        this.loading = true;
        if (model.name !== "") {
          this.loading = true;
          this.vehicleService.searchVehicle(model).subscribe((data: any) => {
            this.tableData = data.vehicles;
            this.loading = false;
          });
        } else {
          this.loading = false;
          this._fetchData();
        }
      });
  }

  getCompany() {
    this.companyService.getCompany().subscribe((company: any) => {
      this.companyItem = company.body.companies;
    });
  }

  get formSeats() {
    return this.formSeat.controls;
  }

  get form() {
    return this.formData.controls;
  }

  saveCustomer() {
    const id = this.formData.value.id;

    if (id !== undefined && id !== null) {
      this.updateVehicle(id);
    } else {
      this.creatVehicle();
    }
    this.submitted = true;
  }

  saveSeats() {
    const id = this.formSeat.value.id;
    if (id !== undefined && id !== null) {
      this.updateSeat(id);
    } else {
      this.creatSeat();
    }
    this.submitted = true;
  }

  creatVehicle() {
    if (this.formData.valid) {
      this.loading = true;
      this.vehicleService.creatVehicle(this.formData?.value).subscribe(
        () => {
          this.toastService.success("Create vehicle success!");
          this._fetchData();
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Create vehicle failed!");
        }
      );
    }
  }

  updateSeat(id: string) {
    if (this.formSeat.valid) {
      this.loading = true;
      this.vehicleService.updateSeat(this.formSeat.value, id).subscribe(
        (data) => {
          this.toastService.success("Update seat success!");
          for (let i = 0; i < this.tableData.length; i++) {
            this.hideme[i] = false;
          }
          this.modalService.dismissAll();
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.toastService.error("Update seat failed!");
        }
      );
    }
  }

  creatSeat() {
    if (this.formSeat.valid) {
      this.loading = true;
      this.vehicleService.creatSeat(this.formSeat?.value).subscribe(
        () => {
          this.toastService.success("Create seat success!");
          for (let i = 0; i < this.tableData.length; i++) {
            this.hideme[i] = false;
          }
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Create seat failed!");
        }
      );
    }
  }

  updateVehicle(id: string) {
    if (this.formData.valid) {
      this.loading = true;
      this.vehicleService.updateVehicle(this.formData.value, id).subscribe(
        () => {
          this.toastService.success("Update vehicle success!");
          this._fetchData();
          this.loading = false;
          this.modalService.dismissAll();
        },
        () => {
          this.loading = false;
          this.toastService.error("Update vehicle failed!");
        }
      );
    }
  }

  changeValue(i, id: string) {
    this.indexSeat = i;
    this.idTable = id;
    this.hideme[i] = !this.hideme[i];
    this._fetchDataSeat(i, id);
  }

  _fetchData() {
    this.loading = true;
    this.vehicleService.getVehicle().subscribe(
      (data: any) => {
        this.tableData = data.vehicles;
        this.totalPage = data.count;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  _fetchDataSeat(id: string, tableId: string) {
    this.loading = true;
    this.vehicleService.getVehicleSeatID(tableId).subscribe((data: any) => {
      this.editableTable[id] = data;
      this.loading = false;
    });
  }

  _fetchDataSeatAll() {
    this.loading = true;
    this.vehicleService.getAllSeat().subscribe((data: any) => {
      this.loading = false;
    });
  }

  deleteVehicle() {
    if (this.titleDelete === "Vehicle") {
      this.loading = true;
      this.vehicleService.deleteVehicle(this.idDelete).subscribe(
        () => {
          this.toastService.success("Delete vehicle success!");
          this._fetchData();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Delete vehicle failed!");
        }
      );
    } else {
      this.loading = true;
      this.vehicleService.deleteSeat(this.idDelete).subscribe(
        () => {
          this.loading = false;
          this.toastService.success("Delete seat success!");
          this._fetchDataSeat(this.indexSeat, this.idTable);
        },
        () => {
          this.loading = false;
          this.toastService.error("Delete seat failed!");
        }
      );
    }
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageVehicle(event): void {
    this.loading = true;
    this.currentpage = event;
    this.vehicleService.getVehicle(event).subscribe((data: any) => {
      this.tableData = data.stations;
      this.loading = false;
    });
  }

  searchVehicle(): void {
    this.modelChanged.next(this.formSearch.value);
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
  }
  /**
   * Open modal
   * @param contentSeat modal content
   */
  openModalSeat(contentSeat?: any, checkEdit?: boolean, item?: any) {
    this.submitted = false;
    this.disableUpdate = checkEdit;
    this.titleSeat = !checkEdit ? "Add Seat" : "Update Seat";
    this.modalService.open(contentSeat);
    if (checkEdit) {
      this.formSeat.patchValue({
        id: item._id,
        sku: item.sku,
        type: item.type,
        vehicle: item.vehicle,
      });
    } else {
      this.formSeat.reset();
    }
  }
  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any, id: string, titleDelete: string) {
    this.titleDelete = titleDelete;
    this.idDelete = id;
    this.modalService.open(contentdelete);
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content?: any, checkEdit?: boolean, item?: any) {
    this.submitted = false;
    this.disableCpn = checkEdit;

    this.title = !checkEdit ? "Add Vehicle" : "Update Vehicle";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        guestCapacity: item.guestCapacity,
        company: item.company?._id,
      });
    } else {
      this.formData.reset();
    }
  }
}
