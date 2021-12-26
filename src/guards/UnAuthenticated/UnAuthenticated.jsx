import React, { Fragment } from 'react'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Navigate } from 'react-router-dom'

export default function UnAuthenticated({ children }) {
  const authenticated = useAuthenticated()

  if (authenticated) {
    return (
      <Fragment>
        <Navigate to={path.home}></Navigate>
      </Fragment>
    )
  }

  return <Fragment>{children}</Fragment>
}
