'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

// Formulário de clientes
function ClienteForm() {
  const [form, setForm] = useState({
    nomeCliente: '',
    emailCliente: '',
    loginCliente: '',
    senhaCliente: '',
    MedHelper: false,
    MedQuiz: false,
    PRQUEST: false,
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    // Primeiro, cadastra no Auth do Supabase
    const { error: authError, data: authData } = await supabase.auth.signUp({
      email: form.emailCliente,
      password: form.senhaCliente,
      options: {
        data: {
          nome: form.nomeCliente,
          login: form.loginCliente,
          MedHelper: form.MedHelper,
          MedQuiz: form.MedQuiz,
          PRQUEST: form.PRQUEST,
        }
      }
    })
    if (authError) {
      setMessage('Erro ao cadastrar no Auth: ' + authError.message)
      setLoading(false)
      return
    }
    // Depois, cadastra na tabela clientes
    const { error: dbError } = await supabase
      .from('clientes')
      .insert([form])
    if (dbError) {
      setMessage('Cadastrado no Auth, mas erro ao salvar na tabela clientes: ' + dbError.message)
    } else {
      setMessage('Cliente cadastrado com sucesso!')
      setForm({
        nomeCliente: '',
        emailCliente: '',
        loginCliente: '',
        senhaCliente: '',
        MedHelper: false,
        MedQuiz: false,
        PRQUEST: false,
      })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nome do Cliente"
          value={form.nomeCliente}
          onChange={e => setForm({ ...form, nomeCliente: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="E-mail do Cliente"
          type="email"
          value={form.emailCliente}
          onChange={e => setForm({ ...form, emailCliente: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Login"
          value={form.loginCliente}
          onChange={e => setForm({ ...form, loginCliente: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Senha"
          type="password"
          value={form.senhaCliente}
          onChange={e => setForm({ ...form, senhaCliente: e.target.value })}
          required
        />
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.MedHelper}
              onChange={e => setForm({ ...form, MedHelper: e.target.checked })}
            />
            MedHelper
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.MedQuiz}
              onChange={e => setForm({ ...form, MedQuiz: e.target.checked })}
            />
            MedQuiz
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.PRQUEST}
              onChange={e => setForm({ ...form, PRQUEST: e.target.checked })}
            />
            PRQUEST
          </label>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {message && <p className="mt-4 text-black">{message}</p>}
    </div>
  )
}

// Formulário de admin
function AdminForm() {
  const [form, setForm] = useState({
    nomeAdmin: '',
    emailAdmin: '',
    loginAdmin: '',
    senhaAdmin: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    // Primeiro, cadastra no Auth do Supabase
    const { error: authError, data: authData } = await supabase.auth.signUp({
      email: form.emailAdmin,
      password: form.senhaAdmin,
      options: {
        data: {
          nome: form.nomeAdmin,
          login: form.loginAdmin,
        }
      }
    })
    if (authError) {
      setMessage('Erro ao cadastrar no Auth: ' + authError.message)
      setLoading(false)
      return
    }
    // Depois, cadastra na tabela admin
    const { error: dbError } = await supabase
      .from('admin')
      .insert([{
        nomeAdmin: form.nomeAdmin,
        emailAdmin: form.emailAdmin,
        loginAdmin: form.loginAdmin,
        senhaAdmin: form.senhaAdmin,
      }])
    if (dbError) {
      setMessage('Cadastrado no Auth, mas erro ao salvar na tabela admin: ' + dbError.message)
    } else {
      setMessage('Admin cadastrado com sucesso!')
      setForm({
        nomeAdmin: '',
        emailAdmin: '',
        loginAdmin: '',
        senhaAdmin: '',
      })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Cadastro de Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nome do Admin"
          value={form.nomeAdmin}
          onChange={e => setForm({ ...form, nomeAdmin: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="E-mail do Admin"
          type="email"
          value={form.emailAdmin}
          onChange={e => setForm({ ...form, emailAdmin: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Login"
          value={form.loginAdmin}
          onChange={e => setForm({ ...form, loginAdmin: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Senha"
          type="password"
          value={form.senhaAdmin}
          onChange={e => setForm({ ...form, senhaAdmin: e.target.value })}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {message && <p className="mt-4 text-black">{message}</p>}
    </div>
  )
}

// Proteção da área de admin
export default function AdminPage() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth')
      if (!isAuth) {
        router.push('/admin/login')
      }
    }
  }, [router])

  // Botão de logout
  function handleLogout() {
    localStorage.removeItem('admin-auth')
    window.location.href = '/admin/login'
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="self-end mb-4 bg-red-600 text-white px-3 py-1 rounded"
        onClick={handleLogout}
      >
        Sair
      </button>
      <div className="flex gap-8 justify-center mt-4">
        <ClienteForm />
        <AdminForm />
      </div>
    </div>
  )
}