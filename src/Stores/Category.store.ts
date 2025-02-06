import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Category } from '../Model/AllBaseModel';
import { inject } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { lastValueFrom } from 'rxjs';

type CategoryState = {
  categories: Category[];
  isLoading: boolean;
  error: string;
};

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: '',
};

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, categoryService: CategoryService = inject(CategoryService)) => ({
      async loadAll(): Promise<void> {
        try {
          const categories = await lastValueFrom(
            categoryService.getAllCategories()
          );
          patchState(store, (state) => ({ categories: categories }));
        } catch (error: any) {
          console.error(error);
          patchState(store, (state) => ({
            categories: state.categories,
            error: error.message,
          }));
        }
      },
      async addCategory(category: Category): Promise<boolean> {
        try {
          const cat = await lastValueFrom(
            categoryService.createCategory(category)
          );
          patchState(store, (state) => ({
            categories: [...state.categories, cat],
          }));
          return true;
        } catch (error: any) {
          console.error(error);
          patchState(store, (state) => ({
            categories: state.categories,
            error: error.message,
          }));
          return false;
        }
      },
      async updateCategory(category: Category): Promise<void> {
        try {
          const cat = await lastValueFrom(
            categoryService.updateCategory(category)
          );
          patchState(store, (state) => ({
            categories: state.categories.map((c) =>
              c.id === cat.id ? cat : c
            ),
          }));
        } catch (error: any) {
          console.error(error);
          patchState(store, (state) => ({
            categories: state.categories,
            error: error.message,
          }));
        }
      },
      async deleteCategory(id: string): Promise<void> {
        try {
          await lastValueFrom(categoryService.deleteCategory(id));
          patchState(store, (state) => ({
            categories: state.categories.filter((c) => c.id !== id),
          }));
        } catch (error: any) {
          console.error(error);
          patchState(store, (state) => ({
            categories: state.categories,
            error: error.message,
          }));
        }
      },
    })
  )
);
