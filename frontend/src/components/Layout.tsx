import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const hideAside = location.pathname.startsWith('/marketplac/')

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo" />
          <span>FAEX Store</span>
        </div>
        <div className="userbox">
          {isAuthenticated ? (
            <>
              <span>Olá, {user?.name || 'usuário'} </span>
              <button className="secondary" onClick={logout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="secondary" style={{ padding: '8px 12px', borderRadius: 8 }}>Entrar</Link>
              <Link to="/register" style={{ padding: '8px 12px', borderRadius: 8 }}>Criar conta</Link>
            </>
          )}
        </div>
      </header>

      <div className="content-area" style={hideAside ? { gridTemplateColumns: '1fr' } : undefined}>
        {!hideAside && (
        <aside className="aside">
          <nav className="nav">
            <h4>Conta</h4>
            {isAuthenticated ? (
              <>
                <Link to="/me">Perfil</Link>
                <Link to="/user/update">Atualizar Usuário</Link>
                <Link to="/user/delete">Deletar Usuário</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registrar</Link>
              </>
            )}

            <h4>Produtos</h4>
            {isAuthenticated ? (
              <>
                <Link to="/products/mine">Meus Produtos</Link>
                <Link to="/product/create">Cadastrar Produto</Link>
              </>
            ) : (
              <span style={{ color: '#a8b1d4' }}>Entre para gerenciar produtos</span>
            )}

            <h4>Marketplace</h4>
            <Link to="/marketplac/1">Abrir vendedor #1</Link>
          </nav>
        </aside>
        )}

        <main className="page">{children}</main>
      </div>
    </div>
  )
}
