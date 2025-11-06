import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

export default function OrderCreate() {
  const [sellerId, setSellerId] = useState('')
  const [sku, setSku] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [address, setAddress] = useState('')
  const [msg, setMsg] = useState('')
  const [link, setLink] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    setLink(null)
    try {
      const body = {
        id: parseInt(sellerId),
        sku,
        quantity: parseInt(quantity),
        address
      }
      const res = await api<{ linkCheckout?: string; message?: string }>(`/order`, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      setMsg(res?.message || 'Pedido criado!')
      if (res?.linkCheckout) setLink(res.linkCheckout)
    } catch (err: any) {
      setMsg(err.message || 'Erro ao criar pedido')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Criar Pedido (POST /order)</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input placeholder="id do vendedor (userId)" value={sellerId} onChange={e => setSellerId(e.target.value)} />
        <input placeholder="sku do produto" value={sku} onChange={e => setSku(e.target.value)} />
        <input placeholder="quantidade" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input placeholder="endereço de entrega" value={address} onChange={e => setAddress(e.target.value)} />
        <button type="submit">Gerar checkout</button>
      </form>
      {msg && <p>{msg}</p>}
      {link && (
        <p>
          Link de pagamento: <a href={link} target="_blank" rel="noreferrer">Abrir</a>
        </p>
      )}
      <small>
        Dica: o backend usa external_reference "F-&lt;uuid&gt;". A tabela de pedidos guarda apenas "&lt;uuid&gt;".
      </small>
    </div>
  )
}
