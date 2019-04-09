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
import './AccountPage.css'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
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

  handleCreateAccount = (e) => {
    const { username, password, confirmPassword } = this.state
    const { dispatch } = this.props

    dispatch(actions.register({username, password, confirmPassword}))
    this.clearPassword()
  }

  readyForSubmit = () => {
    return this.state.username != null && this.state.password != null && this.state.confirmPassword != null
  }

  clearPassword() {
    this.setState({ password: '', confirmPassword: '' })
  }

  render() {
    const { loggedIn, fetching, error, message } = this.props
    const { username, password, confirmPassword } = this.state

    if (loggedIn)
      return <Redirect to={`${process.env.PUBLIC_URL}/main`} />
    
    return (
      <CenteredContainer left={4} middle={4} right={4} className="account-div">   
        <div className="inner-panel">   
          <div className="row logo-top-padding">
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

                <Field  type="password" 
                        name="confirmPassword"
                        errorKey="confirmPassword" 
                        label="Confirm Password" 
                        error={error}
                        value={confirmPassword} 
                        disabled={fetching}
                        onChange={this.handleChange} />        
                              
                <div className="row button-top-padding">
                  <div className="col-md-12 text-center">
                    <SubmitButton 
                        disabled={fetching || !this.readyForSubmit} 
                        onClick={this.handleCreateAccount}
                        label="Create Account" />

                    <Link className="btn btn-secondary" to={`${process.env.PUBLIC_URL}/login`}>Cancel</Link>
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

RegisterPage.propTypes = {
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

export default connect(mapStateToProps)(RegisterPage)