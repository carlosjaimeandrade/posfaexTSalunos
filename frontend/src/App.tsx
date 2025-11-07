import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UpdateUser from './pages/UpdateUser'
import DeleteUser from './pages/DeleteUser'
import ProductCreate from './pages/ProductCreate'
import SalesProducts from './pages/SalesProducts'
import OrderCreate from './pages/OrderCreate'
import Notify from './pages/Notify'
import Success from './pages/Success'
import Failure from './pages/Failure'
import Pending from './pages/Pending'
import MyProducts from './pages/MyProducts'
import ProductEdit from './pages/ProductEdit'
import Marketplace from './pages/Marketplace'
import Layout from './components/Layout'
import Protected from './components/Protected'
import AdminRoute from './components/AdminRoute'
import AdminOrders from './pages/AdminOrders'
import AdminUsers from './pages/AdminUsers'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/sales" element={<SalesProducts />} />
        <Route path="/marketplac/:id" element={<Marketplace />} />
        <Route path="/order/create" element={<OrderCreate />} />
        <Route path="/order/notify" element={<Notify />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

        <Route path="/me" element={<Protected><Profile /></Protected>} />
        <Route path="/user/update" element={<Protected><UpdateUser /></Protected>} />
        <Route path="/user/delete" element={<Protected><DeleteUser /></Protected>} />
        <Route path="/products/mine" element={<Protected><MyProducts /></Protected>} />
        <Route path="/product/create" element={<Protected><ProductCreate /></Protected>} />
        <Route path="/product/:id/edit" element={<Protected><ProductEdit /></Protected>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

function Home() {
  return (
    <div className="grid">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Bem-vindo</h2>
        <p>Use o menu lateral para navegar entre as funcionalidades.</p>
        <ul>
          <li>Autenticação: Registrar, Login, Perfil, Atualizar, Deletar</li>
          <li>Produto: Criar produto, Listar produtos por vendedor</li>
          <li>Pedido: Criar pedido (Mercado Pago), Notificar</li>
        </ul>
        <small>Backend padrão em <code>http://localhost:3000</code>. Vite usa proxy para evitar CORS.</small>
      </div>
    </div>
  )
}
