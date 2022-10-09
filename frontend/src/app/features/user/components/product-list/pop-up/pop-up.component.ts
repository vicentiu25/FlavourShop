import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {Product} from "../../../models/product.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(  private productService: ProductService,private dialog: MatDialogRef<PopUpComponent>,private router: Router) { }

  ngOnInit(): void {

  }

  saveProductForm = new FormGroup({
    priceProduct: new FormControl('',[Validators.required]),
    nameProduct: new FormControl('',[Validators.required, Validators.minLength(3)]),
    quantityProduct: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required, Validators.minLength(10)]),
    imgProduct: new FormControl()
  })

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.saveProductForm.patchValue({
      imgProduct: file,
    });
    this.saveProductForm.get('imgProduct')!.updateValueAndValidity();
  }

  submit() {
    let formData: any = new FormData();
    let product: Partial<Product> = this.saveProductForm.value as Partial<Product>;
    product.imgProduct = undefined;
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.saveProductForm.controls['imgProduct'].value);
    this.productService.save(formData).subscribe(result => {
        console.log(result);
        window.location.reload();
      },
      error => console.log(error));
      this.dialog.close();
  }

}
