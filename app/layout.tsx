import '../styles/globals.css'
import Header from './Header'
import { Providers } from './Providers' 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Header session={undefined}/>
        {children}
      </body>
    </html>
  )
}
