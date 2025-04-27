"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"

function ResetPasswordContent() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionChecked, setSessionChecked] = useState(false)
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  let access_token = searchParams.get("access_token")

  useEffect(() => {
    let cancelled = false
    async function checkSession() {
      let tries = 0
      while (tries < 15) {
        const { data } = await supabase.auth.getUser()
        if (data && data.user) {
          if (!cancelled) setUserAuthenticated(true)
          break
        }
        await new Promise(res => setTimeout(res, 400))
        tries++
      }
      if (!cancelled) setSessionChecked(true)
    }
    checkSession()
    return () => { cancelled = true }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!password || password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (!error) {
      setSuccess("Senha redefinida com sucesso! Faça login com sua nova senha.")
      setTimeout(() => router.push("/areadocliente/login"), 3000)
    } else {
      setError("Erro ao redefinir senha: " + error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Redefinir Senha</h1>
      {!sessionChecked ? (
        <p className="mb-4 text-gray-600">Carregando...</p>
      ) : !userAuthenticated ? (
        <p className="mb-4 text-red-600">Token inválido, expirado ou já utilizado. Solicite um novo link de recuperação.</p>
      ) : error ? (
        <p className="mb-4 text-red-600">{error}</p>
      ) : success ? (
        <p className="mb-4 text-green-600">{success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Confirme a nova senha"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
      )}
      <p className="mt-6 text-sm text-gray-500">Se você não solicitou a redefinição ou o link expirou, volte ao login e solicite novamente.</p>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ResetPasswordContent />
    </Suspense>
  )
}