import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "station/customers" },
  {
    path: "station",
    loadChildren: () =>
      import("./station/station.module").then((m) => m.StationModule),
  },
  {
    path: "trip",
    loadChildren: () => import("./trip/trip.module").then((m) => m.TripModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "ticket",
    loadChildren: () =>
      import("./ticket/ticket.module").then((m) => m.TicketModule),
  },
  {
    path: "company",
    loadChildren: () =>
      import("./company/company.module").then((m) => m.CompanyModule),
  },
  {
    path: "vehicle",
    loadChildren: () =>
      import("./vehicle/vehicle.module").then((m) => m.VehicleModule),
  },
  {
    path: "seat",
    loadChildren: () => import("./seat/seat.module").then((m) => m.SeatModule),
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./profile/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "ui",
    loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
  },
  {
    path: "form",
    loadChildren: () => import("./form/form.module").then((m) => m.FormModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("./chart/chart.module").then((m) => m.ChartModule),
  },
  {
    path: "maps",
    loadChildren: () => import("./maps/maps.module").then((m) => m.MapsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
