import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'materials.index': { paramsTuple?: []; params?: {} }
    'materials.store': { paramsTuple?: []; params?: {} }
    'materials.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'materials.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'materials.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.store': { paramsTuple?: []; params?: {} }
    'reservations.availability': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'materials.index': { paramsTuple?: []; params?: {} }
    'materials.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.availability': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'materials.index': { paramsTuple?: []; params?: {} }
    'materials.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.availability': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'materials.store': { paramsTuple?: []; params?: {} }
    'materials.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'materials.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.store': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}