import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';



@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    
    //private recipes: Recipe[] = [
    //  new Recipe(
    //      'Fries with Ketchup', 
    //      'A super tasty finger-licking fries', 
    //      'https://static.toiimg.com/thumb/54659021.cms?width=1200&height=1200',
    //      [
    //          new Ingredient('Ketchup', 1),
    //          new Ingredient('French Fries', 20)
    //      ]),
    //
    // new Recipe(
    //     'Mouth watering burger', 
    //     'What else do you need to say?', 
    //     'https://recipes.timesofindia.com/thumb/52532889.cms?width=1200&height=1200',
    //     [
    //      new Ingredient('Burger', 2),
    //      new Ingredient('Paneer', 1)
    //     ])
    //];

    private recipes: Recipe[] = [

    ];

      constructor(private slService: ShoppingListService) {}
      
      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);

      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}