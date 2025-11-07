import { FormEvent, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string>('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    try {
      const res = await api<{ token: string; expiresIn: string; user?: { id: number; name: string; email: string }; isAdmin?: boolean }>('/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      if (res?.token) {
        login(res.token, res.user)
        setMsg('Login efetuado!')
        if (res.isAdmin) {
          navigate('/admin/orders', { replace: true })
          return
        }
        const from = location.state?.from?.pathname || '/me'
        navigate(from, { replace: true })
      } else {
        setMsg('Resposta inesperada do servidor')
      }
    } catch (err: any) {
      setMsg(err.message || 'Erro ao logar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Login (/auth)</h2>
      <form onSubmit={onSubmit} className="grid" style={{ maxWidth: 360 }}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
