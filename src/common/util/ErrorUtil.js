import accountActions from '../../account/AccountActions'

let errorUtil = {
  handleErrors: (error, dispatch, actionType) => {
    if(error.error == null || error.description == null) {
      dispatch(failure(actionType, {Message: 'A server error has occurred. Please try again later.'}))
      return
    }

    if(error.error === "Forbidden")
      dispatch(accountActions.sessionExpired('Session has expired. Please login again.'))
    else
      dispatch(failure(actionType, error))
  }
}

function failure(actionType, error) {
  return { type: actionType, error }
}

export default errorUtil