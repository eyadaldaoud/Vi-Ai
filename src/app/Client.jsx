'use client'

const { ThemeProvider } = require("next-themes")
import { Analytics } from '@vercel/analytics/react';

const Client = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
        {children}
        <Analytics />
    </ThemeProvider>
  )
}

export default Client