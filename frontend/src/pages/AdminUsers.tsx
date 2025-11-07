import { useEffect, useState } from 'react'
import { api } from '../lib/api'

type User = {
  id: number
  name: string
  email: string
  status: number | boolean
  createdAt?: string
  updatedAt?: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [detail, setDetail] = useState<User | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const res = await api<{ total: number; users: User[] }>('/users')
      setUsers(res.users || [])
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  async function viewUser(email: string) {
    setDetailLoading(true)
    setError('')
    try {
      const res = await api<{ user: User | null }>(`/user/${encodeURIComponent(email)}`)
      setDetail(res.user || null)
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar usuário')
      setDetail(null)
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Usuários (Admin)</h2>
          <p style={{ margin: 0 }}>Lista de registros do sistema</p>
        </div>
        <button className="secondary" onClick={loadUsers}>Atualizar lista</button>
      </div>
      {error && <div className="card"><p style={{ color: '#f87171', margin: 0 }}>{error}</p></div>}

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
        <div className="card" style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <h3>Usuários cadastrados</h3>
          {loading && <p>Carregando...</p>}
          {!loading && users.length === 0 && <p>Nenhum usuário encontrado.</p>}
          <div className="grid">
            {users.map(user => (
              <div key={user.id} className="card" style={{ background: '#0d142b', borderRadius: 12, border: '1px solid #1f2a4d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>{user.name}</strong>
                    <p style={{ margin: 0, color: '#a8b1d4' }}>{user.email}</p>
                  </div>
                  <span style={{ color: user.status ? '#22c55e' : '#f87171' }}>{user.status ? 'ativo' : 'inativo'}</span>
                </div>
                <button className="secondary" style={{ marginTop: 8 }} onClick={() => viewUser(user.email)}>
                  Ver detalhes
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ minHeight: 200 }}>
          <h3>Detalhes do usuário</h3>
          {detailLoading && <p>Carregando...</p>}
          {!detail && !detailLoading && <p>Selecione um usuário para visualizar.</p>}
          {detail && !detailLoading && (
            <div className="grid">
              <p><b>ID:</b> {detail.id}</p>
              <p><b>Nome:</b> {detail.name}</p>
              <p><b>Email:</b> {detail.email}</p>
              <p><b>Status:</b> {detail.status ? 'Ativo' : 'Inativo'}</p>
              {detail.createdAt && <p><b>Criado em:</b> {new Date(detail.createdAt).toLocaleString()}</p>}
              {detail.updatedAt && <p><b>Atualizado em:</b> {new Date(detail.updatedAt).toLocaleString()}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
