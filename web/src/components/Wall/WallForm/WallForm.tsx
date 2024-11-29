import type { EditWallById, UpdateWallInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormWall = NonNullable<EditWallById['wall']>

interface WallFormProps {
  wall?: EditWallById['wall']
  onSave: (data: UpdateWallInput, id?: FormWall['id']) => void
  error: RWGqlError
  loading: boolean
}

const WallForm = (props: WallFormProps) => {
  const onSubmit = (data: FormWall) => {
    props.onSave(data, props?.wall?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormWall> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.wall?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.wall?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="number"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Number
        </Label>

        <NumberField
          name="number"
          defaultValue={props.wall?.number}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="number" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.wall?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="maxClicks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max clicks
        </Label>

        <NumberField
          name="maxClicks"
          defaultValue={props.wall?.maxClicks}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxClicks" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WallForm
