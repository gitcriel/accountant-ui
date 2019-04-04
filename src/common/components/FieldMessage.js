import React, { Component } from 'react'

class FieldMessage extends Component {
  render() {
    const {error, errorKey} = this.props
    if (error == null || error.ModelState == null || error.ModelState[errorKey] == null)
      return null

    return (
      <div className="invalid-feedback">
        {error.ModelState[errorKey].map((errorMessage, i) => {
            return (
              <div key={i}>{errorMessage}</div>
            )
        })}
      </div>
    )
  }
}

export default FieldMessage