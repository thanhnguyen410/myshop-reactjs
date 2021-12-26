import React from 'react'
import PropTypes from 'prop-types'
import { Message } from './errorMessage.style'
export default function ErrorMessage({ errors, name }) {
  const error = errors[name]

  return <Message>{error && error.message}</Message>
}

ErrorMessage.propsType = {
  errors: PropTypes.object,
  name: PropTypes.string
}
