interface CustomInputProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function CustomInput({ label, error, children }: CustomInputProps) {
  return (
    <div className="space-y-1">
      <label>{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
