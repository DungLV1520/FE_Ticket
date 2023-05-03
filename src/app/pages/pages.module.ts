import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from "ngx-lightbox";
import { UIModule } from "../shared/ui/ui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { StationModule } from "./station/station.module";
import { TripModule } from "./trip/trip.module";
import { SeatModule } from "./seat/seat.module";
import { ContactsModule } from "./profile/contacts.module";
import { UiModule } from "./ui/ui.module";
import { FormModule } from "./form/form.module";
import { IconsModule } from "./icons/icons.module";
import { ChartModule } from "./chart/chart.module";
import { MapsModule } from "./maps/maps.module";
import { HttpClientModule } from "@angular/common/http";
import { UserModule } from "./user/user.module";
import { TicketModule } from "./ticket/ticket.module";
import { CompanyModule } from "./company/company.module";
import { VehicleModule } from "./vehicle/vehicle.module";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    SeatModule,
    StationModule,
    HttpClientModule,
    UIModule,
    ContactsModule,
    UiModule,
    FormModule,
    IconsModule,
    ChartModule,
    MapsModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    TripModule,
    UserModule,
    TicketModule,
    CompanyModule,
    VehicleModule,
  ],
  declarations: [],
})
export class PagesModule {}
