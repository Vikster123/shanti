import {LoginContextProvider } from '@/context/loginContext';
import HeadTag from './headTag';
export const metadata = {
  title: 'Mission Shanti',
  description: 'An App to track your daily mood',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <HeadTag></HeadTag>
      <body><LoginContextProvider>{children}</LoginContextProvider></body>
    </html>
  )
}
