import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

type Product = { id: number; name: string; sku: string; price: number; quantity: number }

export default function MyProducts() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    if (!user) return
    setLoading(true)
    setMsg('')
    try {
      const res = await api<{ products: Product[] }>(`/products/sales/${user.id}`)
      setProducts(res.products || [])
    } catch (err: any) {
      setMsg(err.message || 'Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [user?.id])

  async function onDelete(id: number) {
    if (!confirm('Deseja deletar este produto?')) return
    try {
      await api(`/product/${id}`, { method: 'DELETE' })
      await load()
      setMsg('Produto deletado com sucesso')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao deletar')
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Meus Produtos</h2>
        <p>Gerencie seus produtos: edite ou exclua itens cadastrados.</p>
      </div>
      {loading && <div className="card"><p>Carregando...</p></div>}
      {msg && <div className="card"><p style={{ margin: 0 }}>{msg}</p></div>}
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card" style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>#{p.id} - {p.name}</b>
              <span style={{ color: '#a8b1d4' }}>SKU: {p.sku}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, color: '#a8b1d4' }}>
              <span>Preço: R$ {p.price}</span>
              <span>Qtd: {p.quantity}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to={`/product/${p.id}/edit`} className="secondary" style={{ padding: '8px 12px', borderRadius: 8 }}>Editar</Link>
              <button className="danger" onClick={() => onDelete(p.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

