interface CustomInputProps {
  error?: string
  children: React.ReactNode
  className?: string
}

export function CustomInput({ error, children, className = "" }: CustomInputProps) {
  return (
    <div className={`relative w-full space-y-0.5 ${className}`}>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
