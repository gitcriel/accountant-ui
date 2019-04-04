import React, { Component } from 'react'

class ButtonLink extends Component {

  render() {

    const {showWhen, onClick, label, disabled} = this.props

    if(showWhen !== undefined && !showWhen)
      return null

    return (
      <button type="button" className="btn btn-link" disabled={disabled} onClick={onClick}>{label}</button>
    )
  }
}

export default ButtonLink

