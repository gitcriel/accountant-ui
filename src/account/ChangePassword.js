import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import actions from './AccountActions';
import Message from '../common/components/Message';
import Field from '../common/components/Field';
import Spinner from '../common/components/Spinner';
import CenteredContainer from '../common/components/CenteredContainer';
import SubmitButton from '../common/components/SubmitButton';
import {Link} from 'react-router-dom';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.clearErrors());
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleChangePassword() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const {dispatch} = this.props;

    dispatch(actions.changePassword({oldPassword, newPassword, confirmPassword}));
    this.clearPassword();
  }

  clearPassword() {
    this.setState({oldPassword: '', newPassword: '', confirmPassword: ''});
  }

  render() {
    const {saving, error} = this.props;
    const {oldPassword, newPassword, confirmPassword} = this.state;

    return (
      <CenteredContainer left={2} middle={6} right={2}>
        <Spinner showWhen={saving} message="changing password..." />
        {!saving &&
          <div>
            <Message error={error} />
            <form>
              <Field type="password"
                name="oldPassword"
                errorKey="oldPassword"
                label="Old Password"
                autoFocus={true}
                error={error}
                value={oldPassword}
                disabled={saving}
                onChange={this.handleChange} />

              <Field type="password"
                name="newPassword"
                errorKey="newPassword"
                label="New Password"
                error={error}
                value={newPassword}
                disabled={saving}
                onChange={this.handleChange} />

              <Field type="password"
                name="confirmPassword"
                errorKey="confirmPassword"
                label="Confirm New Password"
                error={error}
                value={confirmPassword}
                disabled={saving}
                onChange={this.handleChange} />

              <div className="row button-top-padding">
                <div className="col-md-12 text-center">
                  <SubmitButton
                    onClick={this.handleChangePassword}
                    label="Change Password" />

                  <Link className="btn btn-secondary" to={`${process.env.PUBLIC_URL}/`}>Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        }
      </CenteredContainer>
    );
  }
}

ChangePassword.propTypes = {
  saving: PropTypes.bool,
  error: PropTypes.object,
  message: PropTypes.string,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const {saving, error} = state.accountReducer;

  return {
    saving, error,
  };
}

export default connect(mapStateToProps)(ChangePassword);
