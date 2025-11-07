import { FormEvent, useEffect, useState } from 'react'
import { api } from '../lib/api'

type Order = {
  id: number
  reference: string
  status: string
  total: number
  quantity: number
  address: string
  productId: number
  price: number
}

type OrderDetailResponse = {
  order: Order | null
  orderMercadoPago: unknown
}

const STATUS_OPTIONS = ['pendente', 'approved', 'rejected', 'canceled', 'refunded']

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Order | null>(null)
  const [detail, setDetail] = useState<OrderDetailResponse | null>(null)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    setLoading(true)
    setError('')
    try {
      const res = await api<{ total: number; orders: Order[] }>('/orders', { method: 'POST' })
      setOrders(res.orders || [])
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar pedidos')
    } finally {
      setLoading(false)
    }
  }

  async function selectOrder(order: Order) {
    setSelected(order)
    setMessage('')
    setStatus(order.status)
    try {
      const res = await api<OrderDetailResponse>(`/order/${order.reference}`, { method: 'POST' })
      setDetail(res)
    } catch (err: any) {
      setDetail(null)
      setError(err.message || 'Erro ao carregar detalhes do pedido')
    }
  }

  async function onUpdate(e: FormEvent) {
    e.preventDefault()
    if (!selected) return
    setSaving(true)
    setMessage('')
    try {
      const res = await api<{ message: string }>(`/order/${selected.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      })
      setMessage(res.message || 'Status atualizado')
      await loadOrders()
    } catch (err: any) {
      setMessage(err.message || 'Erro ao atualizar pedido')
    } finally {
      setSaving(false)
    }
  }

  const selectOptions = Array.from(new Set([...(status ? [status] : []), ...STATUS_OPTIONS]))

  return (
    <div className="grid">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Pedidos (Admin)</h2>
          <button className="secondary" onClick={loadOrders}>Atualizar lista</button>
        </div>
        {loading && <p>Carregando pedidos...</p>}
        {error && <p style={{ color: '#f87171' }}>{error}</p>}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <h3>Lista</h3>
          <div className="grid">
            {orders.map(order => (
              <button
                key={order.id}
                className="secondary"
                style={{
                  textAlign: 'left',
                  borderRadius: 10,
                  padding: 12,
                  border: selected?.id === order.id ? '1px solid var(--accent)' : '1px solid transparent',
                  background: '#0d142b'
                }}
                onClick={() => selectOrder(order)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>#{order.id}</span>
                  <small>{order.status}</small>
                </div>
                <div style={{ fontSize: 14, color: '#a8b1d4' }}>
                  Ref: {order.reference}
                </div>
                <div style={{ fontSize: 14 }}>Total: R$ {order.total}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Detalhes</h3>
          {!selected && <p>Selecione um pedido para visualizar detalhes.</p>}
          {selected && (
            <div className="grid">
              <div>
                <p><b>ID:</b> {selected.id}</p>
                <p><b>Referência:</b> {selected.reference}</p>
                <p><b>Status:</b> {selected.status}</p>
                <p><b>Total:</b> R$ {selected.total}</p>
                <p><b>Quantidade:</b> {selected.quantity}</p>
                <p><b>Endereço:</b> {selected.address}</p>
              </div>

              <form onSubmit={onUpdate} className="grid" style={{ maxWidth: 320 }}>
                <label>Status do pedido</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  {selectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Atualizar status'}</button>
              </form>

              {message && <p>{message}</p>}

              {detail?.orderMercadoPago && (
                <div>
                  <h4>Mercado Pago</h4>
                  <pre style={{ background: '#0d142b', padding: 8, borderRadius: 8, maxHeight: 240, overflow: 'auto' }}>
                    {JSON.stringify(detail.orderMercadoPago, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
