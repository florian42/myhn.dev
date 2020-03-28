import { Action, Middleware, MiddlewareAPI } from "redux";
import { Dispatch } from "react";


const logger: Middleware = (api: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
    console.group(action.type)
      console.log('The action: ', action)
      const returnValue = next(action)
      console.log('The new state: ', api.getState())
    console.groupEnd()
    return returnValue
  }
  
  export default logger