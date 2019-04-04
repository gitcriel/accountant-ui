import React, { Component } from 'react'
import './Spinner.css'

class Spinner extends Component {
  render() {
    const {showWhen, message} = this.props

    if(showWhen)
      return (
        <div className="spinner_panel row">
          <div className="col-sm-12 text-center">
            <i className="fas fa-circle-notch fa-spin"></i> {message}
              </div>
        </div>
      )
    return null
  }
}

export default Spinner