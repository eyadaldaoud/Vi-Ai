import Client from './Client'
import Navbar from './Components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Vi Ai',
  description: 'Your ai tool for getting answers and pictures',
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
