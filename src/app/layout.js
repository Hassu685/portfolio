import './globals.css'

export const metadata = {
  title: 'Hassan Yousuf — Full Stack Developer',
  description: 'Full Stack Developer specializing in Next.js, React, Node.js and modern web technologies.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  )
}
