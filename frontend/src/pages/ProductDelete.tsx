export default function ProductDelete() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Deletar Produto</h2>
      <p>
        Esta tela está protegida e aparece apenas para usuários autenticados.
        Contudo, seu backend ainda não possui um endpoint de deleção de produto
        (ex.: <code>DELETE /product/:id</code>).
      </p>
      <p>
        Se quiser, posso adicionar a rota no backend e integrar aqui com um
        formulário que lista seus produtos e permite deletar por ID.
      </p>
    </div>
  )
}

