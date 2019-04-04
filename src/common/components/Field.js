import React, { Component } from 'react'
import FieldMessage from './FieldMessage'

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false
    }

    this.toggleShowPassword = this.toggleShowPassword.bind(this)
  }

  toggleShowPassword() {
    this.setState({showPassword: !this.state.showPassword})
  }
  
  hasErrors(errorKey) {
    const { error } = this.props
    return error != null && error.ModelState != null && error.ModelState[errorKey] != null
  }

  render() {

    const {showWhen, name, label, type, autoFocus, errorKey, disabled, onChange, onBlur, value, placeholder, error, passwordVisibilityToggle} = this.props
    const {showPassword} = this.state

    if(showWhen !== undefined && !showWhen)
      return null

    if(type==='textarea') 
      return (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <textarea
            autoFocus={autoFocus} 
            className={"form-control " + (this.hasErrors(errorKey) ? "is-invalid" : "")} 
            disabled={disabled} 
            name={name} 
            onChange={onChange} 
            onBlur={onBlur}
            value={value}
            placeholder={placeholder} />
          <FieldMessage error={error} errorKey={errorKey} />
        </div>
      )

    if(type==='password' && passwordVisibilityToggle) 
        return (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
              <input type={showPassword ? 'text' : 'password'}
                autoFocus={autoFocus} 
                className={"form-control " + (this.hasErrors(errorKey) ? "is-invalid" : "")} 
                disabled={disabled} 
                name={name} 
                onChange={onChange} 
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                aria-describedby="basic-addon2" />
              <div className="input-group-append">
                {showPassword && <i id="basic-addon2" className="fas fa-eye-slash clickable input-group-text" aria-hidden="true" onClick={this.toggleShowPassword}></i>}
                {!showPassword && <i id="basic-addon2" className="fas fa-eye clickable input-group-text" aria-hidden="true" onClick={this.toggleShowPassword}></i>}
              </div>
            </div>
            <FieldMessage error={error} errorKey={errorKey} />
          </div>
        )

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type={type}
          autoFocus={autoFocus} 
          className={"form-control " + (this.hasErrors(errorKey) ? "is-invalid" : "")} 
          disabled={disabled} 
          name={name} 
          onChange={onChange} 
          onBlur={onBlur}
          value={value}
          placeholder={placeholder} />
        <FieldMessage error={error} errorKey={errorKey} />
      </div>
    )
  }
}

export default Field

