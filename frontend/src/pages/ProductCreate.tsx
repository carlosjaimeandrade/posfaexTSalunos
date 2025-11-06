import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

export default function ProductCreate() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    try {
      const body = {
        name,
        sku,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      }
      const res = await api('/product', { method: 'POST', body: JSON.stringify(body) })
      setMsg(res?.message || 'Produto criado!')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao criar produto')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Criar Produto (POST /product)</h2>
      <form onSubmit={onSubmit} className="grid" style={{ maxWidth: 380 }}>
        <input placeholder="nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="sku" value={sku} onChange={e => setSku(e.target.value)} />
        <input placeholder="preço" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="quantidade" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
