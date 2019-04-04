import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './HeaderNav.css'

class HeaderNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark sticky-top bg-dark navbar-logo">
        <div className="container body-container high-res-height low-res-margin">
          <Link className="navbar-brand" to={`${process.env.PUBLIC_URL}/main/`}><i className="fas fa-biohazard logo"></i></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCustom">
            <i className="fas fa-bars white-icon"></i>
          </button>
          <div className="navbar-collapse collapse" id="navbarCustom">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-item-fix">
                <Link className="nav-link" to={`${process.env.PUBLIC_URL}/main/mypath`}>Test</Link>
              </li>
              <li className="nav-item dropdown">
                <button className="btn btn-link nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/main/changepassword`}>Change Password</Link>
                  <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/main/mypath`}>Settings</Link>
                  <div className="dropdown-divider"></div>
                  <button className="btn btn-link dropdown-item" onClick={this.props.handleLogout}>Logout</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    )
  }
}

export default HeaderNav