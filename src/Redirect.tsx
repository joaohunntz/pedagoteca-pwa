import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Redirect() {
  const { loginWithToken } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    if (token) {
      loginWithToken(token)
    } else {
      navigate('/login')
    }
  }, [location, loginWithToken, navigate])

  return <p>Redirecionando...</p>
}
