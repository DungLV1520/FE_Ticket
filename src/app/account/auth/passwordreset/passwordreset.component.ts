import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-passwordreset",
  templateUrl: "./passwordreset.component.html",
  styleUrls: ["./passwordreset.component.scss"],
})
export class PasswordresetComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  error = "";
  success = "";
  loading = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.success = "";
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authService.forgetPass(this.resetForm.value).subscribe(
        () => {
          this.router.navigate(["/pages/email-verification"]);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = error ? error : "";
        }
      );
    }
  }
}
