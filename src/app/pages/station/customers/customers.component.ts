import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyService } from "../../company/company.service";
import { StationService } from "../station.service";
import { Customers } from "./customers.model";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formSearch: FormGroup;
  submitted = false;
  customersData: Customers[];
  title!: string;
  currentpage: number;
  idDelete: string;
  comapnyItem: any;
  companyArrays: any;
  loading: boolean = true;
  totalPage: number;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private stationService: StationService,
    private companyService: CompanyService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Station" },
      { label: "List", active: true },
    ];

    this.formData = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      company: [""],
    });

    this.formSearch = this.formBuilder.group({
      value: [""],
    });

    this.currentpage = 1;
    this._fetchData();
    this.getCompany();
    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        this.loading = true;
        this.stationService.searchStation(model).subscribe(
          (data: any) => {
            this.customersData = data.stations;
            this.totalPage = data.count;
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      });
  }

  getCompany() {
    this.companyService.getCompany().subscribe((company: any) => {
      this.comapnyItem = company.body.companies;
    });
  }

  private _fetchData() {
    this.loading = true;
    this.stationService.getStation().subscribe(
      (data: any) => {
        this.customersData = data.stations;
        this.totalPage = data.count;
        this.loading = false;
      },
      () => {
        this.loading = true;
      }
    );
  }

  get form() {
    return this.formData?.controls;
  }

  public compareFn(a, b): boolean {
    return a == b;
  }

  saveStation() {
    const id = this.formData.value.id;
    if (id !== undefined && id !== null) {
      this.updateStation(id);
    } else {
      this.creatStation();
    }
    this.submitted = true;
  }

  creatStation() {
    if (this.formData.valid) {
      this.loading = true;
      this.stationService.creatStation(this.formData.value).subscribe(
        () => {
          this.toastService.success("Create station success!");
          this._fetchData();
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Create station failed!");
        }
      );
    }
  }

  updateStation(id: string) {
    if (this.formData.valid) {
      this.loading = true;
      this.stationService.updateStation(this.formData.value, id).subscribe(
        () => {
          this.toastService.success("Update station success!");
          this._fetchData();
          this.modalService.dismissAll();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.toastService.error("Update station failed!");
        }
      );
    }
  }

  deleteStation() {
    this.loading = true;
    this.stationService.deleteStation(this.idDelete).subscribe(
      () => {
        this.toastService.success("Delete station success!");
        this._fetchData();
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.toastService.error("Delete station failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageStation(event): void {
    this.loading = true;
    this.currentpage = event;
    this.loading = true;
    this.stationService.getStation(event).subscribe(
      (data: any) => {
        this.customersData = data.stations;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  public getNameCompany(id: string) {
    for (let i = 0; i < this.comapnyItem.length; i++) {
      if (this.comapnyItem[i]._id === id) {
        return this.comapnyItem[i].name;
      }
    }
  }

  navigateDetail(): void {
    // this.router.navigateByUrl("product-detail/1");
  }

  searchStation(): void {
    this.modelChanged.next(this.formSearch.value);
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content?: any, checkEdit?: boolean, item?: any) {
    this.submitted = false;
    this.title = !checkEdit ? "Add Station" : "Update Station";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        address: item.address,
        company: item.company,
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
}
