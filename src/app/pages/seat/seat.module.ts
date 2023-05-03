import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "../../shared/ui/ui.module";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { SimplebarAngularModule } from "simplebar-angular";
import { SeatRoutingModule } from "./seat-routing.module";
import { OrderSortableService } from "./orders/orders-sortable.directive";
import { OrdersComponent } from "./orders/orders.component";
import { Ng5SliderModule } from "ng5-slider";

@NgModule({
  declarations: [OrdersComponent, OrderSortableService],
  imports: [
    CommonModule,
    UIModule,
    SeatRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbModalModule,
    NgbDatepickerModule,
    ArchwizardModule,
    DropzoneModule,
    SimplebarAngularModule,
    Ng5SliderModule,
  ],
})
export class SeatModule {}
