import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { IngredientService } from "../../services/ingredient/ingredient.service";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  ingredients: Ingredient[] = [];


  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
  }

}
