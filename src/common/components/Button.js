import React, { Component } from 'react'

class Button extends Component {

  render() {

    const {showWhen, onClick, label, disabled} = this.props

    if(showWhen !== undefined && !showWhen)
      return null

    return (
      <button type="button" className="btn btn-secondary" disabled={disabled} onClick={onClick}>{label}</button>
    )
  }
}

export default Button

