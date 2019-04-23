import React, {Component} from 'react';

class MessageBox extends Component {
  render() {
    const {message, showWhen, type} = this.props;

    if (!showWhen) {
      return null;
    }

    return (
      <div className={`alert ${type === 'error' ? 'alert-danger' : ''} ${type === 'warning' ? 'alert-warn' : ''} ${type === 'info' ? 'alert-info' : ''}`}>
        <table>
          <tbody>
            <tr>
              <td style={{paddingRight: '5px'}}><i className={`fas ${type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}`}></i></td>
              <td>{message}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MessageBox;
