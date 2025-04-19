'use client'
import { motion } from 'framer-motion'

export default function Contato() {
  return (
    <section
      id="contato"
      className="min-h-screen bg-neutral-900 text-white px-6 py-20 flex flex-col items-center justify-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Entre em Contato
      </motion.h2>

      <motion.form
        className="w-full max-w-xl space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={(e) => {
          e.preventDefault();
          alert('Mensagem enviada!');
        }}
      >
        <div>
          <label htmlFor="nome" className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium mb-1">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="4"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Enviar
        </button>
      </motion.form>

      <motion.div
        className="mt-12 text-sm text-center text-neutral-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p><strong>Time de Dados Ltda</strong></p>
        <p>CNPJ: 59.820.948/0001-36</p>
        <p>Rua Paulista, 1106, Andar 16 Sala 01 – São Paulo/SP</p>
        <p>contato@timededados.com.br</p>
      </motion.div>
    </section>
  )
}