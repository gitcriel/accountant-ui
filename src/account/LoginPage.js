import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import actions from './AccountActions'
import Message from '../common/components/Message'
import Field from '../common/components/Field'
import Spinner from '../common/components/Spinner'
import CenteredContainer from '../common/components/CenteredContainer'
import SubmitButton from '../common/components/SubmitButton'
import { Link } from 'react-router-dom'
import Hashes from 'jshashes'
import './AccountPage.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount() {
    document.body.className = 'full-back'
    this.props.dispatch(actions.clearErrors())
    this.logout()
  }

  logout() {
    const { dispatch, isLoggedIn } = this.props
    if(isLoggedIn)
      dispatch(actions.logout())
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleLogin = (e) => {
    const { username, password } = this.state
    const { dispatch } = this.props

    let SHA1 = new Hashes.SHA1()
    let passwordHash = SHA1.hex(password)

    dispatch(actions.login({username, password:passwordHash}))
    this.clearPassword()
  }

  clearPassword() {
    this.setState({ password: '' })
  }

  render() {
    const { loggedIn, fetching, error, message } = this.props
    const { username, password } = this.state

    if (loggedIn)
      return <Redirect to={`${process.env.PUBLIC_URL}/main`} />
    
    return (
      <CenteredContainer left={4} middle={4} right={4} className="account-div"> 
        <div className="inner-panel">
          <div className="row">
            <div className="col-md-12 text-center">
              <i className="fas fa-biohazard logo"></i>
            </div>
          </div>
          <br /><br />
          <Spinner showWhen={fetching} message="logging in..." />
          {!fetching && 
            <div>
              <Message error={error} info={message} />
              <form>
                <Field  type="text" 
                        name="username"
                        errorKey="username" 
                        label="Username (e-mail)"
                        autoFocus={true}
                        error={error}
                        value={username} 
                        disabled={fetching}
                        onChange={this.handleChange} />

                <Field  type="password" 
                        name="password"
                        errorKey="password" 
                        label="Password" 
                        error={error}
                        value={password} 
                        disabled={fetching}
                        onChange={this.handleChange} />
                              
                <div className="row button-top-padding">
                  <div className="col-md-12 text-center">
                    <SubmitButton 
                        disabled={fetching} 
                        onClick={this.handleLogin}
                        label="Login" />

                    <Link className="btn btn-secondary" to={`${process.env.PUBLIC_URL}/register`}>Register</Link>
                  </div>
                </div>
              </form>
            </div>
          }
        </div>     
      </CenteredContainer>
    )
  }
}

Login.propTypes = {
  fetching: PropTypes.bool,
  loggedIn: PropTypes.bool,
  error: PropTypes.object,
  message: PropTypes.string
}

function mapStateToProps(state) {
  const { fetching, loggedIn, error, message } = state.accountReducer

  return {
    fetching, loggedIn, error, message
  }
}

export default connect(mapStateToProps)(Login)