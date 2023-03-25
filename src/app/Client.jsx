'use client'

const { ThemeProvider } = require("next-themes")

const Client = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
        {children}
    </ThemeProvider>
  )
}

export default Client