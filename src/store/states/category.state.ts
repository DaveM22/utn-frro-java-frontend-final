import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CategoryStateModel } from "../model/category.modelstate";
import { AddCategoryAction, CategoryListAction, DeleteCategoryAction, EditCategoryAction } from "../actions/category.action";
import { catchError, of, tap } from "rxjs";
import { Category, ResponseHttp } from "src/models/models";
import { CategoriasService } from "src/services/categorias/categorias.service";
import { BlockTable, DialogActivate, ErrorApi, FormActivate, Success } from "../actions/util.actions";

@State<CategoryStateModel>({
    name: "category",
    defaults: {
        items: [],
    },
})
@Injectable()
export class CategoryState {
    constructor(private service: CategoriasService) {}

    @Selector()
    static getCategories(state: CategoryStateModel) {
        return state.items;
    }




    @Action(CategoryListAction)
    list(ctx: StateContext<CategoryStateModel>) {
        ctx.dispatch(new BlockTable(true));
        return this.service.get().pipe(
            tap((categories: ResponseHttp) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    items: categories.payload as Category[]
                })
                ctx.dispatch(new BlockTable(false));
            })
        );
    }

    @Action(AddCategoryAction)
    create(ctx: StateContext<CategoryStateModel>, action:AddCategoryAction) {
        return this.service.post(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                ctx.patchState({
                    items:[...state.items, res.payload as Category]
                })
                ctx.dispatch(new Success("Crear categoría", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al crear categoría", error.error.errorMessage)));
              })
        );
    }

    @Action(EditCategoryAction)
    edit(ctx: StateContext<CategoryStateModel>, action:EditCategoryAction) {
        return this.service.put(action.payload).pipe(
            tap((res: ResponseHttp) => {
                const obj = res.payload as Category;
                const state = ctx.getState();
                const provinces = [...state.items];
                const provinceIndex = provinces.findIndex(item => item.categoryId === obj.categoryId);
                provinces[provinceIndex] = res.payload as Category;
                ctx.patchState({
                    items: provinces,
                });
   
                ctx.dispatch(new Success("Editar categoría", res.message));
                ctx.dispatch(new FormActivate(false));
              }),
              catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Error al editar categoría", error.error.errorMessage)));
              })
        );
    }

    @Action(DeleteCategoryAction)
    delete(ctx: StateContext<CategoryStateModel>, action:DeleteCategoryAction) {
        return this.service.delete(action.id).pipe(
            tap((res: ResponseHttp) => {
                const state=ctx.getState();
                const filteredArray=state.items.filter(contents=>contents.categoryId !== action.id);
  
                ctx.setState({
                    ...state,
                    items:filteredArray
                })
                ctx.dispatch(new DialogActivate(false));
                ctx.dispatch(new Success("Eliminar categoría", res.message));
              }),
              catchError(error => {

                return of(ctx.dispatch(new ErrorApi("Error al eliminar categoría", error.error.errorMessage)));
              })
        );
    }
}