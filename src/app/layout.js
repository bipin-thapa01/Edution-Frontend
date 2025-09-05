import "./global.css";

export const metadata = {
  title: 'EDUTION - Home',
  description: 'Homepage of EDUTION. Nepals one and only social media site with the feature of learning integrated.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
