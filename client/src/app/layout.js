import ReduxProvider from './redux/provider/ReduxProvider'

import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navabar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hasin Ishrak',
  description: 'Ecommerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
 
  

        <Navbar/>
        <Toaster position="top-right" />  
      {children}

      
        </ReduxProvider>
        </body>
    </html>
  )
}
