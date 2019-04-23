import React, {Component} from 'react';
import FieldMessage from './FieldMessage';

class SelectField extends Component {
  hasErrors(errorKey) {
    const {error} = this.props;
    return error != null && error.ModelState != null && error.ModelState[errorKey] != null;
  }

  render() {
    const {showWhen, name, label, autoFocus, errorKey, disabled, onChange, value, error, options, optionId, optionLabel} = this.props;

    if (showWhen !== undefined && !showWhen) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label><br />
        <select
          name={name}
          className="form-control"
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={onChange}
          value={value}>
          <option></option>
          {options.map((option, i) => {
            return (
              <option key={i} value={option[optionId]}>{option[optionLabel]}</option>
            );
          })}
        </select>
        <FieldMessage error={error} errorKey={errorKey} />
      </div>
    );
  }
}

export default SelectField;
