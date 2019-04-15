import actionTypes from './AccountActionTypes'
import accountService from './AccountService'
import config from '../config'
import errorUtil from '../common/util/ErrorUtil'

let accountActions = {
  clearErrorsAndMessages: () => {
    return dispatch => {dispatch({ type: actionTypes.CLEAR_ERRORS_AND_MESSAGES })}
  },
  clearErrors: () => {
    return dispatch => {dispatch({ type: actionTypes.CLEAR_ERRORS })}
  },
  login: (data) => {
    return dispatch => {
      dispatch({ type: actionTypes.LOGIN_REQUEST })
  
      accountService.login(data)
        .then(
          responseData => dispatch(success(responseData.sessionToken, data.username)),
          error => errorUtil.handleErrors(error, dispatch, actionTypes.LOGIN_FAILURE)
        )
    }
  
    function success(token, username) {
      storeSessionData(token, username)
      return { type: actionTypes.LOGIN_SUCCESS }
    }
  },
  logout: (message) => {
    return dispatch => {
      accountService.logout()
        .then(() => dispatch(success(message)),() => dispatch(success(message)))
    }
  
    function success(message) {
      sessionStorage.clear()
      return { type: actionTypes.LOGOUT, message }
    }
  },
  sessionExpired: (message) => {
    sessionStorage.clear()
    return { type: actionTypes.LOGOUT, message }
  },
  register: (data) => {
    return dispatch => {
      dispatch({ type: actionTypes.REGISTER_REQUEST })
  
      accountService.register(data)
        .then(
          responseData => dispatch(success(responseData.sessionToken, data.username)),
          error => errorUtil.handleErrors(error, dispatch, actionTypes.REGISTER_FAILURE)
        )
    }
  
    function success(token, username) {
      storeSessionData(token, username)
      return { type: actionTypes.REGISTER_SUCCESS }
    }
  },
  changePassword: (data) => {
    return dispatch => {
      dispatch({ type: actionTypes.CHANGE_PASSWORD_REQUEST })
  
      accountService.changePassword(data)
        .then(
          () => dispatch(accountActions.logout("Password changed. Please login with your new password.")),
          error => errorUtil.handleErrors(error, dispatch, actionTypes.CHANGE_PASSWORD_FAILURE)
        )
    }
  }
}

function storeSessionData(token, username) {
  sessionStorage.setItem(config.SESSION_STORAGE_SESSION_TOKEN, token)
  sessionStorage.setItem(config.SESSION_STORAGE_USERNAME, username)
}

export default accountActions