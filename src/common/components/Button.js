import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {showWhen, onClick, label, disabled} = this.props;

    if (showWhen !== undefined && !showWhen) {
      return null;
    }

    return (
      <button type="button" className="btn btn-secondary" disabled={disabled} onClick={onClick}>{label}</button>
    );
  }
}

Button.propTypes = {
  showWhen: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

