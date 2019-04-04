import actionTypes from './AccountActionTypes'
import accountService from './AccountService'
import config from '../config'
import errorUtil from '../common/util/ErrorUtil'

let accountActions = {
  clearErrors: () => {
    return dispatch => {dispatch({ type: actionTypes.CLEAR_ERRORS })}
  },
  login: (data) => {
    return dispatch => {
      dispatch({ type: actionTypes.LOGIN_REQUEST })
  
      accountService.login(data)
        .then(
          data => dispatch(success(data.sessionToken, data.username)),
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
        .then(() => dispatch(success(message)),() => dispatch(success()))
    }
  
    function success(message) {
      sessionStorage.clear()
      return { type: actionTypes.LOGOUT, message }
    }
  },
  register: (data) => {
    return dispatch => {
      dispatch({ type: actionTypes.REGISTER_REQUEST })
  
      accountService.register(data)
        .then(
          data => dispatch(success(data.sessionToken, data.username)),
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
      let validationError = validateChangePassword(data)
      if(validationError) {
        errorUtil.handleErrors(validationError, dispatch, actionTypes.CHANGE_PASSWORD_FAILURE)
        return
      }
  
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

function validateChangePassword(data) {
  if(data.oldPassword.trim() === '' || data.newPassword.trim() === '' || data.confirmPassword.trim() === '')
    return {error:'AllPasswordFieldsRequired', description:'All password fields are required'}
  return null
}

export default accountActions