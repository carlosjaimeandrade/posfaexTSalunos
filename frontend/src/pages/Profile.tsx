import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

type MeResponse = { user: { id: number; name: string; email: string } }

export default function Profile() {
  const [me, setMe] = useState<MeResponse['user'] | null>(null)
  const [msg, setMsg] = useState('')
  const { isAdmin } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api<MeResponse>('/me')
        setMe(res.user)
      } catch (err: any) {
        setMsg(err.message || 'Erro ao buscar /me')
      }
    })()
  }, [])

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Perfil (/me)</h2>
      {me ? (
        <div className="grid">
          <div>
            <p><b>ID:</b> {me.id}</p>
            <p><b>Nome:</b> {me.name}</p>
            <p><b>Email:</b> {me.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/user/update" className="secondary" style={{ padding: '8px 12px', borderRadius: 8 }}>Atualizar dados</Link>
            <Link to="/user/delete" className="danger" style={{ padding: '8px 12px', borderRadius: 8 }}>Excluir conta</Link>
            <Link to="/products/mine" style={{ padding: '8px 12px', borderRadius: 8 }}>Meus produtos</Link>
            {isAdmin && (
              <>
                <Link to="/admin/orders" style={{ padding: '8px 12px', borderRadius: 8 }}>Pedidos (Admin)</Link>
                <Link to="/admin/users" style={{ padding: '8px 12px', borderRadius: 8 }}>Usuários (Admin)</Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>{msg || 'Carregando...'}</p>
      )}
    </div>
  )
}
