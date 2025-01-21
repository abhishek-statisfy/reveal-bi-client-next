'use client'
import RevealBIScripts from './RevealBIScripts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RevealBIScripts />
      {children}
    </>
  )
}
