'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'

const names = {
  medhelper: 'MedHelper',
  medquiz: 'MedQuiz',
  prquest: 'PR QUEST'
}

export default function AreaDoClientePage() {
  const [selected, setSelected] = useState('medhelper')
  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="flex-1 flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">
          Olá, Mundo {names[selected]}
        </h1>
      </main>
    </div>
  )
}