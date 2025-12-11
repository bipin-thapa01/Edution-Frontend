import "./global.css";

export const metadata = {
  title: 'SOCIALZ - Home',
  description: 'Homepage of SOCIALZ. Nepals one and only social media site with the feature of learning integrated.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
