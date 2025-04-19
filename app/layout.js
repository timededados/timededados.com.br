import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Apple Style Site',
  description: 'Scroll animations com Next.js e Framer Motion',
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