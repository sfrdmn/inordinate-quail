export type TitleProps = {
  className?: string
  children?: React.ReactNode
}

export default function Title({ className = '', children }: TitleProps) {
  return (
    <h1 className={`${className} text-2xl text-zinc-100 drop-shadow-lg`}>
      {children}
    </h1>
  )
}
