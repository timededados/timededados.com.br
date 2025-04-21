'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import Sidebar from './Sidebar'

const names = {
  medhelper: 'MedHelper',
  medquiz: 'MedQuiz',
  prquest: 'PR QUEST'
}

export default function AreaDoClientePage() {
  const [selected, setSelected] = useState('medhelper')
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/areadocliente/login')
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/areadocliente/login'
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <span>Carregando...</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen relative">
      <button
        className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded z-50"
        onClick={handleLogout}
      >
        Sair
      </button>
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="flex-1 flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">
          Olá, Mundo {names[selected]}
        </h1>
      </main>
    </div>
  )
}