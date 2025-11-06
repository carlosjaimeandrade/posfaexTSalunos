import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

export default function Notify() {
  const [externalRef, setExternalRef] = useState('F-')
  const [status, setStatus] = useState('approved')
  const [msg, setMsg] = useState('')
  const [raw, setRaw] = useState<any>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMsg('')
    setRaw(null)
    try {
      const body = { data: { external_reference: externalRef, status } }
      const res = await api('/order/notify', { method: 'POST', body: JSON.stringify(body) })
      setRaw(res)
      setMsg('Notificação enviada')
    } catch (err: any) {
      setMsg(err.message || 'Erro ao notificar')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Notificar Pedido (POST /order/notify)</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
        <input placeholder="external_reference (ex: F-<uuid>)" value={externalRef} onChange={e => setExternalRef(e.target.value)} />
        <input placeholder="status" value={status} onChange={e => setStatus(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {msg && <p>{msg}</p>}
      {raw && (
        <pre style={{ background: '#0d142b', border: '1px solid #1f2a4d', padding: 8, overflow: 'auto', borderRadius: 8 }}>{JSON.stringify(raw, null, 2)}</pre>
      )}
      <small>
        Observação: o backend busca por referência exatamente igual ao recebido (inclui ou não o prefixo "F-").
      </small>
    </div>
  )}
