'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function FinalSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacityProdutos = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const opacitySolucoes = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 1, 1])

  const [hovered, setHovered] = useState(null)

  const descriptions = {
    MedHelper: 'Domine a gasometria e os distúrbios hidroeletrolíticos com a ajuda da inteligência artificial. O MedHelper transforma dados em conhecimento prático, direto no seu ritmo.',
    MedQuiz: 'Faça quizzes com seu grupo de médicos direto no WhatsApp. O MedQuiz é rápido, gratuito e perfeito para transformar revisão em conversa.',
    PRQUEST: 'Aprender medicina pode ser divertido. O PR Quest usa gamificação para transformar ensino sério em experiência envolvente — com desafios, rankings e evolução.'
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <motion.h2
        style={{ opacity: opacityProdutos }}
        className="text-6xl font-bold absolute top-24"
      >
        Produtos
      </motion.h2>

      <motion.h2
        style={{ opacity: opacitySolucoes }}
        className="text-6xl font-bold absolute top-24"
      >
        Soluções
      </motion.h2>

      <div className="mt-5 flex flex-wrap justify-center items-center gap-10 z-10">
        {['MedHelper', 'MedQuiz', 'PRQUEST'].map((key) => (
          <div
            key={key}
            className="flex flex-col items-center"
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="bg-white rounded-full p-4">
              <Image
                src={`/${key}.png`}
                alt={key}
                width={180}
                height={180}
                className="rounded-full"
              />
            </div>
            {hovered === key && (
              <motion.p
                className="text-sm text-center mt-4 max-w-xs text-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {descriptions[key]}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}