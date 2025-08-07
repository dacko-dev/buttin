import { FieldError, Label } from '@redwoodjs/forms'

export function FormField({
  label,
  name,
  afterLabel,
  children,
}: {
  label: string | React.ReactNode
  name: string
  afterLabel?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mb-1 flex items-baseline gap-1">
        <Label
          name={name}
          className="form-label flex w-fit items-center gap-1 text-base"
        >
          {label}
        </Label>
        {afterLabel}
      </div>
      {children}
      <FieldError name={name} className="form-error" />
    </div>
  )
}
