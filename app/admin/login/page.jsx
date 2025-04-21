'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('loginAdmin', login)
      .eq('senhaAdmin', senha)
      .single()
    if (data) {
      // Salva um token simples (atenção: para produção, use JWT ou cookies httpOnly)
      localStorage.setItem('admin-auth', 'true')
      router.push('/admin')
    } else {
      setError('Login ou senha inválidos')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Login Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Entrar
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}