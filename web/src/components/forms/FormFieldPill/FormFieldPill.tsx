import { FieldError, Label } from '@redwoodjs/forms'
import clsx from 'clsx'

export function FormFieldPill({
  label,
  name,
  className,
  children,
}: {
  label: string | React.ReactNode
  name: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col'>
      <div className={clsx('flex w-full ', className)}>
        <Label name={name} className="form-label-pill">
          {label}
        </Label>
        {children}
      </div>
        <FieldError name={name} className="form-error" />
    </div>
  )
}
