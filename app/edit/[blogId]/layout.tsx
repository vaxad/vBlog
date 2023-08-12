
import '../../globals.css'
import { Metadata } from 'next'


type Params = {
    params: {
        blogId:string
    }
}

export const metadata: Metadata = {
  title: 'vBlog - Edit your Blog',
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
