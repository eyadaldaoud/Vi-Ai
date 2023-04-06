import Client from './Client'
import Navbar from './Components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Violet AI',
  description: 'Your Ai assistant and image generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Client>
          <Navbar>
           {children}  
          </Navbar>
        </Client>
      </body>
    </html>
  )
}
