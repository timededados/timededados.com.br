'use client'
import { useState } from 'react'
import Image from 'next/image'


const links = [
    { name: 'MedHelper', slug: 'medhelper', img: '/MedHelper.png' },
    { name: 'MedQuiz', slug: 'medquiz', img: '/MedQuiz.png' },
    { name: 'PR QUEST', slug: 'prquest', img: '/PRQUEST.png' }
  ]
  export default function Sidebar({ selected, onSelect }) {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <aside className={`bg-neutral-800 h-screen p-4 transition-all duration-300 ${collapsed ? 'w-16' : 'w-48'}`}>
        <button
          className="mb-6 w-12 h-12 text-white flex items-center justify-center text-2xl"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Colapsar sidebar"
        >
          <Image
            src={collapsed ? "/logo.png" : "/logo.png"}
            alt="Colapsar"
            width={28}
            height={28}
            className="rounded-full"
          />
        </button>
        <nav>
          <ul className="space-y-4">
            {links.map(link => (
              <li key={link.slug}>
                <button
                  className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded ${selected === link.slug ? 'bg-white text-black' : 'text-white hover:bg-neutral-700'}`}
                  onClick={() => onSelect(link.slug)}
                >
                  <Image
                    src={link.img}
                    alt={link.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  {!collapsed && <span>{link.name}</span>}
                </button>
                </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}