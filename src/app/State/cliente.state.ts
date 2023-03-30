
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Cliente} from "../model/cliente";
import {Evento} from "../model/evento";

export class AddCliente {
  static readonly type = '[Cliente] Add'

  constructor(public cliente: Cliente) {
  }
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
export class ClienteState{
  @Selector()
  static getCliente(state: ClienteStateModel){
    return state.cliente;
  }
  @Action(AddCliente)
  setClienteAction(ctx:StateContext<ClienteStateModel>,action:AddCliente){
    ctx.patchState({cliente:action.cliente})
  }
}
