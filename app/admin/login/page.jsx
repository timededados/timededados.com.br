'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Login via Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    setLoading(false)
    if (!error) {
      localStorage.setItem('admin-auth', 'true')
      router.push('/admin')
    } else {
      if (error.message === 'Email not confirmed') {
        setError('Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.')
      } else if (error.message === 'Invalid login credentials') {
        setError('E-mail ou senha inválidos.')
      } else {
        setError('Erro ao fazer login: ' + error.message)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Login Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}