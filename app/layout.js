import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'TimeDeDados',
  description: 'Time de Dados: Engenharia de Dados, Análise de Dados, Ciência de Dados e Inteligência Artificial. Especialistas em Gamificação de Treinamentos Online.',
  keywords: 'Engenharia de Dados, Análise de Dados, Ciência de Dados, Inteligência Artificial, Gamificação, Treinamentos Online',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-white text-black">
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  )
}