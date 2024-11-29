import type { EditButtonClickById, UpdateButtonClickInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormButtonClick = NonNullable<EditButtonClickById['buttonClick']>

interface ButtonClickFormProps {
  buttonClick?: EditButtonClickById['buttonClick']
  onSave: (data: UpdateButtonClickInput, id?: FormButtonClick['id']) => void
  error: RWGqlError
  loading: boolean
}

const ButtonClickForm = (props: ButtonClickFormProps) => {
  const onSubmit = (data: FormButtonClick) => {
    props.onSave(data, props?.buttonClick?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormButtonClick> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="ipAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ip address
        </Label>

        <TextField
          name="ipAddress"
          defaultValue={props.buttonClick?.ipAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="ipAddress" className="rw-field-error" />

        <Label
          name="buttonId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button id
        </Label>

        <TextField
          name="buttonId"
          defaultValue={props.buttonClick?.buttonId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="buttonId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.buttonClick?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ButtonClickForm
