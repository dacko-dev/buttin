import type { EditButtonById, UpdateButtonInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  TextAreaField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormButton = NonNullable<EditButtonById['button']>

interface ButtonFormProps {
  button?: EditButtonById['button']
  onSave: (data: UpdateButtonInput, id?: FormButton['id']) => void
  error: RWGqlError
  loading: boolean
}

const ButtonForm = (props: ButtonFormProps) => {
  const onSubmit = (data: FormButton) => {
    props.onSave(data, props?.button?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormButton> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.button?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="expiresAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Expires at
        </Label>

        <DatetimeLocalField
          name="expiresAt"
          defaultValue={formatDatetime(props.button?.expiresAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="expiresAt" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.button?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="color"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color
        </Label>

        <TextField
          name="color"
          defaultValue={props.button?.color}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="color" className="rw-field-error" />

        <Label
          name="backgroundColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Background color
        </Label>

        <TextField
          name="backgroundColor"
          defaultValue={props.button?.backgroundColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="backgroundColor" className="rw-field-error" />

        <Label
          name="backgroundImg"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Background img
        </Label>

        <TextField
          name="backgroundImg"
          defaultValue={props.button?.backgroundImg}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="backgroundImg" className="rw-field-error" />

        <Label
          name="borderRadius"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Border radius
        </Label>

        <NumberField
          name="borderRadius"
          defaultValue={props.button?.borderRadius}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="borderRadius" className="rw-field-error" />

        <Label
          name="borderStyle"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Border style
        </Label>

        <TextField
          name="borderStyle"
          defaultValue={props.button?.borderStyle}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="borderStyle" className="rw-field-error" />

        <Label
          name="hoverState"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hover state
        </Label>

        <TextAreaField
          name="hoverState"
          defaultValue={JSON.stringify(props.button?.hoverState)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="hoverState" className="rw-field-error" />

        <Label
          name="clickState"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Click state
        </Label>

        <TextAreaField
          name="clickState"
          defaultValue={JSON.stringify(props.button?.clickState)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="clickState" className="rw-field-error" />

        <Label
          name="clickedState"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Clicked state
        </Label>

        <TextAreaField
          name="clickedState"
          defaultValue={JSON.stringify(props.button?.clickedState)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="clickedState" className="rw-field-error" />

        <Label
          name="clickCount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Click count
        </Label>

        <NumberField
          name="clickCount"
          defaultValue={props.button?.clickCount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="clickCount" className="rw-field-error" />

        <Label
          name="maxClicksPerDay"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max clicks per day
        </Label>

        <NumberField
          name="maxClicksPerDay"
          defaultValue={props.button?.maxClicksPerDay}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxClicksPerDay" className="rw-field-error" />

        <Label
          name="maxClicksPerUser"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max clicks per user
        </Label>

        <NumberField
          name="maxClicksPerUser"
          defaultValue={props.button?.maxClicksPerUser}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxClicksPerUser" className="rw-field-error" />

        <Label
          name="size"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Size
        </Label>

        <TextField
          name="size"
          defaultValue={props.button?.size}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="size" className="rw-field-error" />

        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>

        <TextField
          name="message"
          defaultValue={props.button?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="message" className="rw-field-error" />

        <Label
          name="messageColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message color
        </Label>

        <TextField
          name="messageColor"
          defaultValue={props.button?.messageColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="messageColor" className="rw-field-error" />

        <Label
          name="messageBg"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message bg
        </Label>

        <TextField
          name="messageBg"
          defaultValue={props.button?.messageBg}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="messageBg" className="rw-field-error" />

        <Label
          name="messageBgImg"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message bg img
        </Label>

        <TextField
          name="messageBgImg"
          defaultValue={props.button?.messageBgImg}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="messageBgImg" className="rw-field-error" />

        <Label
          name="animation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Animation
        </Label>

        <TextAreaField
          name="animation"
          defaultValue={JSON.stringify(props.button?.animation)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="animation" className="rw-field-error" />

        <Label
          name="behavior"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Behavior
        </Label>

        <TextAreaField
          name="behavior"
          defaultValue={JSON.stringify(props.button?.behavior)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="behavior" className="rw-field-error" />

        <Label
          name="isVisible"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is visible
        </Label>

        <CheckboxField
          name="isVisible"
          defaultChecked={props.button?.isVisible}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isVisible" className="rw-field-error" />

        <Label
          name="creatorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Creator id
        </Label>

        <TextField
          name="creatorId"
          defaultValue={props.button?.creatorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="creatorId" className="rw-field-error" />

        <Label
          name="uniqueClicks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Unique clicks
        </Label>

        <NumberField
          name="uniqueClicks"
          defaultValue={props.button?.uniqueClicks}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="uniqueClicks" className="rw-field-error" />

        <Label
          name="wallId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wall id
        </Label>

        <NumberField
          name="wallId"
          defaultValue={props.button?.wallId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="wallId" className="rw-field-error" />

        <Label
          name="tags"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tags
        </Label>

        <TextField
          name="tags"
          defaultValue={props.button?.tags}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tags" className="rw-field-error" />

        <Label
          name="tagId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tag id
        </Label>

        <NumberField
          name="tagId"
          defaultValue={props.button?.tagId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="tagId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ButtonForm
