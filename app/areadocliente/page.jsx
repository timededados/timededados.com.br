'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'

const names = {
  medhelper: 'MedHelper',
  medquiz: 'MedQuiz',
  prquest: 'PR QUEST'
}

export default function AreaDoClientePage() {
  const [selected, setSelected] = useState('medhelper')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('cliente-auth')
      if (!isAuth) {
        router.push('/areadocliente/login')
      }
    }
  }, [router])

  function handleLogout() {
    localStorage.removeItem('cliente-auth')
    window.location.href = '/areadocliente/login'
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