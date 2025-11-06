import { useState } from 'react'
import { api } from '../lib/api'

export default function DeleteUser() {
  const [msg, setMsg] = useState('')

  async function onDelete() {
    setMsg('')
    try {
      const res = await api('/me', { method: 'DELETE' })
      setMsg(res?.message || 'Usuário deletado!')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao deletar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Deletar Usuário (DELETE /me)</h2>
      <button className="danger" onClick={onDelete}>Deletar minha conta</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}
