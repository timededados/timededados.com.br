'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const roles = [
  'Engenheiro de Dados',
  'Desenvolvedor',
  'Analista de Dados',
  'Cientista de Dados',
  'Product Owner',
  'UX Designer',
  'Arquiteto de Software',
  'DevOps',
  'Especialista em IA',
  'Gestor de Projetos',
  'Scrum Master'
]

// Valores fixos para controlar o tempo de entrada e saída de cada palavra
const timings = [
  [0.00, 0.40],
  [0.00, 0.45],
  [0.05, 0.35],
  [0.10, 0.45],
  [0.10, 0.50],
  [0.10, 0.55],
  [0.30, 0.50],
  [0.35, 0.55],
  [0.35, 0.60],
  [0.35, 0.65],
  [0.40, 0.70],
]

export default function FeatureSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  return (
    <section id="Feature"
      ref={sectionRef}
      className="relative min-h-[120vh] w-full overflow-hidden"
    >
      {/* Fundo com imagem */}
      <Image
        src="/FundoFeature.jpg"
        alt="Fundo Feature"
        fill
        priority
        className="object-cover object-center z-0"
      />

      {/* Palavras animadas com controle total */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 gap-10 bg-black/50 overflow-hidden">
        {roles.map((role, index) => {
          const [start, end] = timings[index]

          const x = useTransform(
            scrollYProgress,
            [start, end],
            ['-100vw', '100vw']
          )

          const opacity = useTransform(
            scrollYProgress,
            [start, start + 0.02, end - 0.02, end],
            [0, 1, 1, 0]
          )

          return (
            <motion.div
              key={role}
              style={{ x, opacity }}
              className="text-white text-4xl font-bold whitespace-nowrap"
            >
              {role}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
