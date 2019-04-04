import React, { Component } from 'react'
import MessageBox from './MessageBox'

class Message extends Component {
  render() {
    const {error,warning,info} = this.props

    return (
      <div>
        <MessageBox showWhen={error} message={error ? error.description : ''} type="error" />
        <MessageBox showWhen={warning} message={warning} type="warning" />
        <MessageBox showWhen={info} message={info} type="info" />
      </div>
    )
  }
}

export default Message