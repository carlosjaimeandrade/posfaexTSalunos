import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

export default function UpdateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    try {
      const payload: any = {}
      if (name) payload.name = name
      if (email) payload.email = email
      if (password) payload.password = password
      const res = await api('/me', {
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
      setMsg(res?.message || 'Atualizado!')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao atualizar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Atualizar Usuário (PATCH /me)</h2>
      <form onSubmit={onSubmit} className="grid" style={{ maxWidth: 360 }}>
        <input placeholder="novo nome (opcional)" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="novo email (opcional)" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="nova senha (opcional)" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Atualizar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
