import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { ConfirmmailComponent } from "./confirmmail/confirmmail.component";
import { VerificationComponent } from "./verification/verification.component";

const routes: Routes = [
  {
    path: "404",
    component: Page404Component,
  },
  {
    path: "500",
    component: Page500Component,
  },
  {
    path: "reset-password/:token",
    component: LockscreenComponent,
  },

  {
    path: "confirm-mail",
    component: ConfirmmailComponent,
  },

  {
    path: "email-verification",
    component: VerificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrapagesRoutingModule {}
