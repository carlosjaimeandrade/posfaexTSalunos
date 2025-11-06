import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

type Product = { id: number; name: string; sku: string; price: number; quantity: number }

export default function SalesProducts() {
  const [userId, setUserId] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [msg, setMsg] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    setProducts([])
    try {
      const res = await api<{ products: Product[] }>(`/products/sales/${userId}`)
      setProducts(res.products || [])
    } catch (err: any) {
      setMsg(err.message || 'Erro ao buscar produtos')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Produtos por Vendedor (GET /products/sales/:id)</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input placeholder="userId" value={userId} onChange={e => setUserId(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {msg && <p>{msg}</p>}
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>#{p.id} - {p.name}</b>
              <span>SKU: {p.sku}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, color: '#a8b1d4' }}>
              <span>Preço: R$ {p.price.toFixed ? p.price.toFixed(2) : p.price}</span>
              <span>Qtd: {p.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
