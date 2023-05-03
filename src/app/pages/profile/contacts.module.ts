import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { UIModule } from "../../shared/ui/ui.module";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    UIModule,
  ],
})
export class ContactsModule {}
