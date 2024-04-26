'use client'

import { useFormStatus } from 'react-dom'

export type SubmitProps = {
  className?: string
  children: React.ReactNode
}

/**
 * Generic form submission with useFormStatus state.
 */
export default function Submit({ className = '', children }: SubmitProps) {
  const { pending } = useFormStatus()

  return (
    <button className={`${className} bg-blue-400 border border-blue-500 rounded`} type="submit" aria-disabled={pending}>
      {children}
    </button>
  )
}
