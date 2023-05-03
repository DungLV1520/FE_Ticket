import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = "";
  returnUrl: string;
  loading: boolean = false;
  check = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authFackservice: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  checkPasswordShow() {
    this.check = !this.check;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authFackservice
        .login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(["/station/customers"]);
            this.loading = false;
          },
          (error) => {
            this.error = error ? error : "";
            this.loading = false;
          }
        );
    }
  }
}
