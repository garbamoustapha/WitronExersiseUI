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
    async loadAll(): Promise<void> {
      await categoryService.getAllCategories().subscribe({
        next: (categories) => {
          console.log(categories);
          patchState(store, (state)  => ({ categories: categories }));
        },
        error: (error) => {
          console.error(error);
          patchState(store, (state) => ({ categories: state.categories, error: error.message }));
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
          patchState(store, (state) => ({ categories: state.categories, error: error.message }));
          return false;
        }        
      });
      return false;
    },
    updateCategory(category: Category): void {
      categoryService.updateCategory(category).subscribe({
        next: (cat) => {
          patchState(store, (state) => ({ categories: state.categories.map(c => c.id === cat.id ? cat : c) }))
        },
        error: (error) => {
          console.error(error);
          patchState(store, (state) => ({ categories: state.categories, error: error.message }));
        }
      });
    },
    deleteCategory(id: string): void {
      categoryService.deleteCategory(id).subscribe({
        next: () => {
          patchState(store, (state) => ({ categories: state.categories.filter(c => c.id !== id) }))
        },
        error: (error) => {
          console.error(error);
          patchState(store, (state) => ({ categories: state.categories, error: error.message }));
        }
      });
    }
  })) 
);