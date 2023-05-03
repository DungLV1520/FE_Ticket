import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgOtpInputModule } from "ng-otp-input";
import { ExtrapagesRoutingModule } from "./extrapages-routing.module";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { ConfirmmailComponent } from "./confirmmail/confirmmail.component";
import { VerificationComponent } from "./verification/verification.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    Page404Component,
    Page500Component,
    LockscreenComponent,
    ConfirmmailComponent,
    VerificationComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ExtrapagesRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
  ],
})
export class ExtrapagesModule {}
