'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black pt-1 pb-0 text-white z-50 font-sans shadow">
      <div className="max-w-7xl bg-black mx-auto px-4 py-0 flex items-center justify-between">
        
        {/* Esquerda (logo) */}
        <div className="flex items-center bg-black space-x-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
        </div>

        {/* Centro (links) */}
        <ul className="flex space-x-8 text-sm bg-black font-semibold">
          <li><a href="#hero" className="hover:text-gray-400 transition-colors">Home</a></li>
          <li><a href="#sobre" className="hover:text-gray-400 transition-colors">Sobre</a></li>
          <li><a href="#produtos" className="hover:text-gray-400 transition-colors">Produtos</a></li>
          <li><a href="#servicos" className="hover:text-gray-400 transition-colors">Serviços</a></li>
          <li><a href="#contato" className="hover:text-gray-400 transition-colors">Contato</a></li>
        </ul>

        {/* Direita (ícones) */}
        <div className="flex items-center bg-black space-x-4">
          <Search size={18} className="hover:text-gray-400 transition-colors cursor-pointer" />
          <ShoppingCart size={18} className="hover:text-gray-400 transition-colors cursor-pointer" />
          <a
                href="/areadocliente"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-3 py-1 rounded hover:text-gray-400 transition-colors font-semibold text-sm"
>
  Área do Cliente
</a>
        </div>
      </div>
    </nav>
  )
}
