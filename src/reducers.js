import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import accountReducer from './account/AccountReducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  accountReducer
})