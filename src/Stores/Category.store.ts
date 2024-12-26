import { signalStore, withState, withMethods,patchState } from "@ngrx/signals";
import { Category } from "../Model/AllBaseModel";
import { inject } from "@angular/core";
import { CategoryService } from "../Services/category.service";

type CategoryState = {
  categories: Category[];
  isLoading: boolean;
  error: string ;
};

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: '',
};

export const CategoryStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, categoryService: CategoryService = inject(CategoryService)) => ({
    loadAll(): void {
      categoryService.getAllCategories().subscribe({
        next: (categories) => {
          console.log(categories);
          patchState(store, { categories });
        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    async addCategory(category: Category): Promise<boolean> {
       await categoryService.createCategory(category).subscribe({
        next: (cat) => {
          patchState(store, (state) => ({ categories: [...state.categories, cat] }))
          return true;
        },
        error: (error) => {
          console.error(error);
          return false;
        }        
      });
      return false;
    }
  })) 
);