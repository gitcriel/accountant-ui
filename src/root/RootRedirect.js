import React from 'react'
import { Redirect } from 'react-router-dom'

export default () => (
  <Redirect to={`${process.env.PUBLIC_URL}/main`} />
)