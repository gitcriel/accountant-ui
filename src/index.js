import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './root/App'
import config from './config'
import './common/Common.css'
import 'react-day-picker/lib/style.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history} basename={config.BASE_NAME}>
        <App />
    </ConnectedRouter>
  </Provider>,
  target
)