import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from './components/Navbar'
import UserProvider from './context/usercontext'

const monument = localFont({
  src: [
    {
      path: '../public/fonts/MonumentExtended-Regular.otf',
      weight: '400'
    },
    {
      path: '../public/fonts/MonumentExtended-Ultrabold.otf',
      weight: '700'
    }
  ],
  variable: '--font-monument'
})
export const metadata: Metadata = {
  title: 'vBlog - Home',
  description: 'blog project by vaxad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-slate-950'>
      <body className={`${monument.variable} font-sans bg-transparent max-h-screen overflow-x-hidden`}>
        <UserProvider>
        <Navbar/>
        {children}
        </UserProvider>
        
        </body>
    </html>
  )
}
