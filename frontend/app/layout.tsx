import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <title>Challenge App</title>
        <meta name="description" content="Платформа для челленджей" />
      </head>
      <body>{children}</body>
    </html>
  )
}