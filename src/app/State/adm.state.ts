
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Administrativo} from "../model/administrativo";



export class AddAdministrativo {
  static readonly type = '[ADMINISTRATIVO] Add'

  constructor(public administrativo: Administrativo) {
  }
}

export class AdministrativoStateModel{
  public administrativo: Administrativo;
}
const resumenAdministrativoModel :  AdministrativoStateModel = {
  administrativo: new Administrativo(),
};
@State<AdministrativoStateModel>({
  name:'administrativo',
  defaults: resumenAdministrativoModel,
})
export class AdministrativoState{
  @Selector()
  static getAdministrativo(state: AdministrativoStateModel){
    return state.administrativo;
  }
  @Action(AddAdministrativo)
  setAdministrativoAction(ctx:StateContext<AdministrativoStateModel>,action:AddAdministrativo){
    ctx.patchState({administrativo:action.administrativo})
  }

}
