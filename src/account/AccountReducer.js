import config from '../config'
import actionTypes from './AccountActionTypes'

let initialState = {}
let sessionToken = sessionStorage.getItem(config.SESSION_STORAGE_SESSION_TOKEN)
if (sessionToken)
  initialState = { isLoggedIn: true }

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case actionTypes.CLEAR_ERRORS_AND_MESSAGES:
      return {
        ...state,
        error: null,
        message: null
      }
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        username: action.username,
        isSessionExpired: false,
        fetching: true,
        error: null,
        message: null
      }
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        loggedIn: true
      }
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        sessionExpired: action.sessionExpired,
        saving: false,
        loggedIn: false,
        message: action.message
      }    
    case actionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        saving: true,
        error: null
      }
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        saving: false,
        error: null
      }
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.error
      }
    default:
      return state
  }
}
