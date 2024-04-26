'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type HeaderProps = {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname()
  let title: React.ReactNode

  if (/^\/patients/.test(pathname)) {
    title = (
      <span>
        <Link className="underline" href="/">My Patients</Link> &gt; Detail
      </span>
    )
  } else {
    title = 'My Patients'
  }
  
  return (
    <h1 className={`${className} p-4 bg-blue-500 text-zinc-50 text-2xl rounded`}>
      {title}
    </h1>
  )
}
