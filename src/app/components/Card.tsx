export type CardProps = {
  className?: string
  children?: React.ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`${className} bg-blue-300 text-zinc-800 p-4 rounded`}>
      {children}
    </div>
  )
}
