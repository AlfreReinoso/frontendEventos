import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Evento} from "../model/evento";
import { Servicio } from '../model/servicio';
import {Salon} from "../model/salon";
import {Injectable} from "@angular/core";

export class AddEvento {
  static readonly type = '[EVENTO] Add'

  constructor(public evento: Evento) {
  }
}
export class AddSalon {
  static readonly type = '[SALON] Add'

   constructor(public salon  : Salon) {
  }
}
export class AddServicio {
  static readonly type = '[SERVCICIO] Add'

  constructor(public servicio  : Servicio[]) {
  }
}




export class EventoStateModel {
   public eventos: Evento ;
   public salones : Salon ;
   public servicios : Servicio[] = [];
}
const resumenEventosModel :  EventoStateModel = {
  eventos: new Evento,
  salones : new Salon,
  servicios : [],
};

@State<EventoStateModel>({
  name:'eventos',
  defaults: resumenEventosModel
})
@Injectable()
export class EventosState {

  @Selector()
  static getEventos(state: EventoStateModel){
    return state.eventos;
  }
  @Selector()
  static getSalon(state: EventoStateModel){
    return state.salones;
  }
  @Selector()
  static getServicio(state: EventoStateModel){
    return state.servicios;
  }

  /* @Action(AddEvento)
  add({getState, patchState}: StateContext<EventoStateModel>, {evento}:AddEvento){
    const state = getState();
    patchState({
      eventos:[...state.eventos, evento]
    })
  } */
  @Action(AddEvento)
    setEventoAction(ctx: StateContext<EventoStateModel>, action: AddEvento) {
        ctx.patchState({eventos: action.evento});
    }


  @Action(AddSalon)
  setSalonAction(ctx: StateContext<EventoStateModel>, action:AddSalon) {
    ctx.setState({...ctx.getState(), salones: action.salon});
  }
  @Action(AddServicio)
  setServicioAction(ctx: StateContext<EventoStateModel>, action:AddServicio) {
    ctx.setState({...ctx.getState(), servicios: action.servicio});
  }


}
