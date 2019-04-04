import React, { Component } from 'react'

class CenteredContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      left: 3,
      right: 3,
      middle: 6
    }

    this.getSize = this.getSize.bind(this)
  }

  getSize(container) {
    return this.props[container] === undefined ? this.state[container] : this.props[container]
  }

  getClasses = () => {
    let classes = "container-fluid top-page-padding "
    return this.props.className ? classes + this.props.className : classes
  }
  
  render() {
    return (
      <div className={this.getClasses()}>
        <div className="row">
          <div className={"col-md-" + this.getSize('left')}></div>
          <div className={"col-md-" + this.getSize('middle')}>
            {this.props.children}
          </div>
          <div className={"col-md-" + this.getSize('right')}></div>
        </div>
      </div>
    )
  }
}

export default CenteredContainer

