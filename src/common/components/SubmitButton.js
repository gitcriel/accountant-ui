import React, { Component } from 'react'

class SubmitButton extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
    this.props.onClick()
  }

  render() {

    const {showWhen, label, disabled} = this.props

    if(showWhen !== undefined && !showWhen)
      return null

    return (
      <input type="submit"
            className="btn btn-primary"
            disabled={disabled}
            onClick={this.submit}
            value={label}></input>   
    )
  }
}

export default SubmitButton

