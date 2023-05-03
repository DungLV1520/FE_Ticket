import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

@Component({
  selector: "app-addtrip",
  templateUrl: "./addtrip.component.html",
  styleUrls: ["./addtrip.component.scss"],
})
export class AddtripComponent implements OnInit {
  productForm: FormGroup;
  breadCrumbItems: Array<{}>;
  submit: boolean;
  image = "";
  file = "";

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Add Product", active: true },
    ];

    this.productForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]],
      manufacture_name: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]+")],
      ],
      manufacture_brand: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]+")],
      ],
      price: ["", [Validators.required]],
    });
    this.submit = false;
  }

  get form() {
    return this.productForm.controls;
  }

  config: DropzoneConfigInterface = {
    maxFilesize: 50,
    acceptedFiles: "image/*",
    method: "POST",
    uploadMultiple: false,
    accept: (file) => {
      this.onAccept(file);
    },
  };

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    this.submit = true;
    const formData = new FormData();
    formData.append("name", this.productForm.get("name").value);
    formData.append(
      "manufacture_name",
      this.productForm.get("manufacture_name").value
    );
    formData.append(
      "manufacture_brand",
      this.productForm.get("manufacture_brand").value
    );
    formData.append("price", this.productForm.get("price").value);
    formData.append("image", this.file, this.image);

    this.http
      .post<any>(`http://localhost:8000/api/products`, formData)
      .subscribe((data) => {
        return data;
      });
  }
}
