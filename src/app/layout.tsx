import './globals.css'
 import SessionProvider from './SessionProvider';


export const metadata = {
  title: 'Vidrioku',
  description: 'Frank Gimeno Portfolio',

}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en" className="h-full  ">
      <head>
        <link rel="icon" href="/logos/4.png" sizes="any" />
      </head>
      <body className="h-full ">
        <SessionProvider>
             {children}
         </SessionProvider>
      </body>
    </html>
  )
}