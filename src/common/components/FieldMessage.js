import React, { Component } from 'react'

class FieldMessage extends Component {
  getErrorDescription(fieldError) {
    if(fieldError.properties == null)
      return fieldError.description
    
    let description = fieldError.description;
    for(let i=1;i<=fieldError.properties.length;i++) {
      description = description.replace('$' + i, fieldError.properties[i-1])
    }
    return description
  }

  render() {
    const {error, errorKey} = this.props
    if (error == null || error.fields == null || error.fields[errorKey] == null)
      return null

    return (
      <div className="invalid-feedback">
        {error.fields[errorKey].map((fieldError, i) => {
            return (
              <div key={i}>{this.getErrorDescription(fieldError)}</div>
            )
        })}
      </div>
    )
  }
}

export default FieldMessage