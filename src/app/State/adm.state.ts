
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Administrativo} from "../model/administrativo";
import {Injectable} from "@angular/core";



export class AddAdministrativo {
  static readonly type = '[ADMINISTRATIVO] Add'

  constructor(public administrativo: Administrativo) {
  }
}
export class AdmResetAction {
  static readonly type = '[ADMINISTRATIVO] ResetAdministrativo';
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


@Injectable()
export class AdministrativoState{

  @Selector()
  static getAdministrativo(state: AdministrativoStateModel){
    return state.administrativo;
  }

  @Action(AddAdministrativo)
  setAdministrativoAction(ctx:StateContext<AdministrativoStateModel>,action:AddAdministrativo){
    ctx.patchState({administrativo:action.administrativo})
  }

  @Action(AdmResetAction)
  resetAdministrativo(ctx: StateContext<AdministrativoStateModel>, action: AdmResetAction) {
    ctx.patchState({ administrativo: undefined });
  }

}
