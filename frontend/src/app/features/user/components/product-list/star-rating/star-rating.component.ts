import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Review } from "../../../models/review.model";
import { ProductService } from "../../../services/product/product.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../product-list.component";

/*
import { DialogData, ProductListComponent } from "../../../components/product-list/product-list.component";*/

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') rating: number = 0;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr: string[] = [];

  constructor(private snackBar: MatSnackBar, private productService: ProductService, public dialogRef: MatDialogRef<StarRatingComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  ngOnInit() {
    console.log("a " + this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(String(index));
    }
  }

  onClick(rating: number) {
    console.log(rating)
   /* this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });*/
    this.ratingUpdated.emit(rating);
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getTooltipValue(currentRating: string) {
    const res: number = +currentRating + 1;
    return res.toString();
  }

  /*getReviewSubmit(curentReview: Review) {
    const review: Review = curentReview
  }*/
  reviewSubmit(): void {
    this.productService.addReview({ idProduct: this.data.idProduct, rating: this.rating }).subscribe(result => console.log(result));
    this.dialogRef.close();
    window.location.reload();
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

