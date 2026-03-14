import { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-004">
      <label className="font-roboto text-c9 text-sm">{label}</label>
      <input className="input-field" {...inputProps} />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
