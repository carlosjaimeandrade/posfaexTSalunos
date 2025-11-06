import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'

type Product = { id: number; name: string; sku: string; price: number; quantity: number }

export default function ProductEdit() {
  const { id } = useParams()
  const productId = parseInt(id || '0')
  const navigate = useNavigate()
  const [form, setForm] = useState<Partial<Product>>({})
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!productId) return
    ;(async () => {
      try {
        const res = await api<{ product: Product }>(`/product/${productId}`)
        setForm(res.product)
      } catch (err: any) {
        setMsg(err.message || 'Erro ao carregar produto')
      }
    })()
  }, [productId])

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    try {
      const payload: any = {}
      if (form.name) payload.name = form.name
      if (form.sku) payload.sku = form.sku
      if (form.price !== undefined) payload.price = form.price
      if (form.quantity !== undefined) payload.quantity = form.quantity
      const res = await api(`/product/${productId}`, { method: 'PATCH', body: JSON.stringify(payload) })
      setMsg((res as any)?.message || 'Atualizado!')
      navigate('/products/mine')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao atualizar')
    }
  }

  async function onDelete() {
    if (!confirm('Deseja deletar este produto?')) return
    try {
      await api(`/product/${productId}`, { method: 'DELETE' })
      navigate('/products/mine')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao deletar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Editar Produto #{productId}</h2>
      <form onSubmit={onSubmit} className="grid" style={{ maxWidth: 380 }}>
        <input placeholder="nome" value={form.name || ''} onChange={e => set('name', e.target.value)} />
        <input placeholder="sku" value={form.sku || ''} onChange={e => set('sku', e.target.value)} />
        <input placeholder="preço" type="number" step="0.01" value={form.price ?? ''} onChange={e => set('price', parseFloat(e.target.value))} />
        <input placeholder="quantidade" type="number" value={form.quantity ?? ''} onChange={e => set('quantity', parseInt(e.target.value))} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Salvar</button>
          <button type="button" className="danger" onClick={onDelete}>Excluir</button>
        </div>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}

