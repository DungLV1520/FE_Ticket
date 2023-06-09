import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailComponent } from "./detail/detail.component";
import { OrdersComponent } from "./orders/orders.component";

const routes: Routes = [
  {
    path: "list",
    component: OrdersComponent,
  },
  {
    path: "detail",
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
