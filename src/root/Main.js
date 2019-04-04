import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import accountActions from '../account/AccountActions'
import HeaderNav from './HeaderNav'
import ComingSoon from './ComingSoonPage'
import ChangePassword from '../account/ChangePassword'

class Main extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  
  componentWillMount() {
    document.body.className = ''
  }

  handleLogout() {
    const { dispatch } = this.props
    dispatch(accountActions.logout())
  }

  isOnRootPath(location) {
    const { pathname } = location
    return pathname.endsWith('/main') || pathname.endsWith('/main/')
  }

  render() {
    if (!this.props.loggedIn)
      return <Redirect to={`${process.env.PUBLIC_URL}/login`} />
    else {
      const { match } = this.props

      return (
        <div>
          <HeaderNav handleLogout={this.handleLogout}></HeaderNav>
          {this.isOnRootPath(this.props.location) && 
            <div>Root</div>
          }
          {!this.isOnRootPath(this.props.location) && 
            <div>
              <Route path={`${match.path}/mypath`} component={ComingSoon} />
              <Route path={`${match.path}/changepassword`} component={ChangePassword} />
            </div> 
          }
        </div>
      )
     }
  }
}

Main.propTypes = {
  loggedIn: PropTypes.bool
}

function mapStateToProps(state) {
  const { loggedIn } = state.accountReducer
  return {
    loggedIn
  }
}

export default connect(mapStateToProps)(Main)