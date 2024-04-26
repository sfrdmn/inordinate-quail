export type TabularHeaderProps = {
  className?: string
  data: {
    key: React.ReactNode,
    value: React.ReactNode
  }[]
}

export default function TabularHeader({ className = '', data }: TabularHeaderProps) {
  return (
    <div className={`${className} grid grid-cols-4`}>
      {data.map(({ key, value }) => (
        <>
          <strong key={`${key}`}>{key}</strong>
          <span key={`${key}-value`}>{value}</span>
        </>
      ))}
    </div>
  )
}
