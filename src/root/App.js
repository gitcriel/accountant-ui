import React from 'react';
import {Route} from 'react-router-dom';
import RootRedirect from './RootRedirect';
import Main from './Main';
import Login from '../account/LoginPage';
import Register from '../account/RegisterPage';

export default () => (
  <div>
    <Route exact path={`${process.env.PUBLIC_URL}/`} component={RootRedirect} />
    <Route path={`${process.env.PUBLIC_URL}/main`} component={Main} />
    <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
    <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
  </div>
);
