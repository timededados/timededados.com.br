'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  const sectionRef = useRef(null)

  // Scroll restrito à hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'] // do início ao fim da hero
  })

  // Texto sobe de baixo (80%) até topo (5%)
  const y = useTransform(scrollYProgress, [0, 1], ['80%', '5%'])
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  return (
    <section id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full mt-0 pt-0 pb-1 bg-black overflow-hidden"
    >
      {/* Imagem de fundo */}
      <Image
        src="/fundoHero.jpg"
        alt="Fundo Hero"
        fill
        priority
        className="object-cover object-center z-0"
      />

      {/* Texto que sobe com o scroll da hero */}
      <motion.div
        style={{ top: y }}
        className="absolute right-6 z-20"
      >
        <span className="text-white text-5xl font-bold bg-black/70 px-4 py-2 rounded-md shadow-lg">
          Time de Dados
        </span>

        {/* Descrição que aparece junto */}
        <motion.p
          style={{ opacity }}
          className="mt-4 text-white text-base bg-black/60 p-4 rounded-md shadow-md max-w-sm"
        >
          A Time de Dados é uma empresa especializada em encontrar soluções criativas
          para problemas difíceis. Combinamos inteligência de dados, design e tecnologia
          para criar experiências únicas. Conheça nossos produtos.
        </motion.p>
      </motion.div>
    </section>
  )
}

