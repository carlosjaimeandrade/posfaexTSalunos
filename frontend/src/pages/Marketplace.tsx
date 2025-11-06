import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'

type Product = { id: number; name: string; sku: string; price: number; quantity: number }

export default function Marketplace() {
  const { id } = useParams()
  const sellerId = parseInt(id || '0')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [qtyMap, setQtyMap] = useState<Record<number, string>>({})
  const [addrMap, setAddrMap] = useState<Record<number, string>>({})
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!sellerId) return
    setLoading(true)
    setError('')
    ;(async () => {
      try {
        const res = await api<{ products: Product[] }>(`/products/sales/${sellerId}`)
        setProducts(res.products || [])
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar marketplace')
      } finally {
        setLoading(false)
      }
    })()
  }, [sellerId])

  async function comprar(p: Product) {
    setMsg('')
    try {
      const quantity = parseInt(qtyMap[p.id] || '1')
      const address = addrMap[p.id]
      if (!address) {
        setMsg('Informe um endereço de entrega.')
        return
      }
      const res = await api<{ linkCheckout?: string; message?: string }>(`/order`, {
        method: 'POST',
        body: JSON.stringify({ id: sellerId, sku: p.sku, quantity, address })
      })
      if (res.linkCheckout) {
        window.location.href = res.linkCheckout
        return
      }
      setMsg(res.message || 'Pedido criado, mas sem link do checkout')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao criar pedido')
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Marketplace do vendedor #{sellerId}</h2>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && products.length === 0 && <p>Nenhum produto encontrado.</p>}
      </div>
      <div className="grid two">
        {products.map(p => (
          <div key={p.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ margin: 0 }}>{p.name}</h3>
              <span style={{ color: '#a8b1d4' }}>SKU: {p.sku}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, color: '#a8b1d4', marginBottom: 8 }}>
              <span>Preço: R$ {p.price.toFixed ? p.price.toFixed(2) : p.price}</span>
              <span>Estoque: {p.quantity}</span>
            </div>
            <div className="grid" style={{ maxWidth: 420 }}>
              <input
                placeholder="quantidade"
                type="number"
                min={1}
                defaultValue={1}
                value={qtyMap[p.id] ?? '1'}
                onChange={e => setQtyMap({ ...qtyMap, [p.id]: e.target.value })}
              />
              <input
                placeholder="endereço de entrega"
                value={addrMap[p.id] ?? ''}
                onChange={e => setAddrMap({ ...addrMap, [p.id]: e.target.value })}
              />
              <button onClick={() => comprar(p)}>Comprar</button>
            </div>
          </div>
        ))}
      </div>
      {msg && <div className="card"><p style={{ margin: 0 }}>{msg}</p></div>}
    </div>
  )
}

