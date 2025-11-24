interface CustomInputProps {
  error?: string
  children: React.ReactNode
}

export function CustomInput({ error, children }: CustomInputProps) {
  return (
    <div className="relative w-full space-y-0.5">
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
