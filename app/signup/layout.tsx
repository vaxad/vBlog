import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'vBlog - Sign up',
  description: 'blog project by vaxad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
        {children}
    </main>
        
  )
}
