import { Injectable } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { BackendService } from "../../../../core/backend/backend.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredient: Ingredient | undefined;

  ingredientsURL = 'http://localhost:8080/ingredients/findall';

  constructor(private service: BackendService) {
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.service.get(this.ingredientsURL);
  }
}
