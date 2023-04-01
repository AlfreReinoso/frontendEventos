
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Cliente} from "../model/cliente";
import {Evento} from "../model/evento";
import {Injectable} from "@angular/core";

export class AddCliente {
  static readonly type = '[Cliente] Add'

  constructor(public cliente: Cliente) {
  }
}
export class ClienteResetAction {
  static readonly type = '[CLIENTE] ResetCliente';
}

export class ClienteStateModel{
  public cliente: Cliente;
}
const resumenClienteModel :  ClienteStateModel = {
  cliente: new Cliente(),
};
@State<ClienteStateModel>({
  name:'cliente',
  defaults: resumenClienteModel,
})
@Injectable()
export class ClienteState{
  @Selector()
  static getCliente(state: ClienteStateModel){
    return state.cliente;
  }
  @Action(AddCliente)
  setClienteAction(ctx:StateContext<ClienteStateModel>,action:AddCliente){
    ctx.patchState({cliente:action.cliente})
  }
  @Action(ClienteResetAction)
  resetCliente(ctx: StateContext<ClienteStateModel>, action: ClienteResetAction) {
    ctx.patchState({ cliente: undefined });
  }
}
