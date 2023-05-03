import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddtripComponent } from "./addtrip/addtrip.component";
import { CustomerTripComponent } from "./customer-trip/customer-trip.component";
import { TripProductsComponent } from "./trip-products/trip-products.component";

const routes: Routes = [
  {
    path: "",
    component: TripProductsComponent,
  },
  {
    path: "products-trip",
    component: TripProductsComponent,
  },
  {
    path: "add-trip",
    component: AddtripComponent,
  },
  {
    path: "customers-trip",
    component: CustomerTripComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripRoutingModule {}
