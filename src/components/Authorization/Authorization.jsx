import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unauthorize } from 'src/pages/Auth/auth.slice'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { getCartPurchases } from 'src/pages/Cart/cart.slice'

export default function Authorization() {
  const status = useSelector(state => state.app.status)
  const dispath = useDispatch()
  const navigate = useNavigate()
  const authenticated = useAuthenticated()

  useEffect(() => {
    if (status === 401) {
      dispath(unauthorize())
      navigate(path.login)
    }
  }, [status, dispath, navigate])

  useEffect(() => {
    if (authenticated) {
      dispath(getCartPurchases())
    }
  }, [authenticated, dispath])

  return null
}
