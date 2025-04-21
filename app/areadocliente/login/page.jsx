'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function ClienteLogin() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMsg, setResetMsg] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    setLoading(false)
    if (!error) {
      router.push('/areadocliente')
    } else {
      setError('Login ou senha inválidos')
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault()
    setResetMsg('')
    setResetLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/reset-password'
    })
    setResetLoading(false)
    if (!error) {
      setResetMsg('Se o e-mail estiver cadastrado, você receberá instruções para redefinir a senha.')
    } else {
      setResetMsg('Erro ao solicitar redefinição: ' + error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Login do Cliente</h1>
      {!showReset ? (
        <>
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
          <button
            className="mt-2 text-blue-600 underline text-sm"
            type="button"
            onClick={() => setShowReset(true)}
          >
            Esqueci minha senha
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Digite seu e-mail"
            type="email"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={resetLoading}>
            {resetLoading ? 'Enviando...' : 'Enviar link de redefinição'}
          </button>
          <button
            className="text-gray-600 underline text-sm ml-2"
            type="button"
            onClick={() => { setShowReset(false); setResetMsg(''); }}
          >
            Voltar ao login
          </button>
          {resetMsg && <p className="mt-4 text-black">{resetMsg}</p>}
        </form>
      )}
    </div>
  )
}