import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {MenuItem} from "primeng/api";


export class AddMenu {
  static readonly type = '[MENU] Add'

  constructor(public menu: any){}
}
export class MenuResetAction {
  static readonly type = '[MENU] ResetMenu';
}

export class MenuStateModel{
  public menu: [];
}
const resumenMenuModel :  MenuStateModel = {
  menu: [],
};
@State<MenuStateModel>({
  name:'menu',
  defaults: resumenMenuModel,
})
@Injectable()
export class MenuState {
  @Selector()
  static getMenu(state: MenuStateModel) {
    return state.menu;
  }

  @Action(AddMenu)
  setMenuAction(ctx: StateContext<MenuStateModel>, action: AddMenu) {
    ctx.patchState({menu: action.menu})
  }

  @Action(MenuResetAction)
  resetMenu(ctx: StateContext<MenuStateModel>, action: MenuResetAction) {
    ctx.patchState({menu: undefined});
  }
}
