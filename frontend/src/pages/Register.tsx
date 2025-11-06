import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    try {
      const res = await api('/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })
      setMsg(res?.message || 'Registrado!')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao registrar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Registrar (/user)</h2>
      <form onSubmit={onSubmit} className="grid" style={{ maxWidth: 360 }}>
        <input placeholder="nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Criar conta</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
