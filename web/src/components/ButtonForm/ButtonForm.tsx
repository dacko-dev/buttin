import { useCallback, useRef, useState } from 'react'

import clsx from 'clsx'

import {
  ColorField,
  FieldError,
  Form,
  HiddenField,
  Label,
  NumberField,
  SelectField,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'

const buttonStates = ['base', 'hover', 'focus', 'active', 'clicked'] as const
type StateType = (typeof buttonStates)[number]

const buttonStylingTypes = ['Form', 'CSS', 'Tailwind'] as const
// type ButtonStylingType = (typeof buttonStylingTypes)[number]

export default function ButtonForm() {
  const formMethods = useForm()
  const [activeTab, setActiveTab] = useState<StateType>('base')

  const setTagsError = useCallback(
    (error: string) => {
      formMethods.setError('tags', { message: error })
    },
    [formMethods]
  )

  const clearTagsError = useCallback(() => {
    formMethods.clearErrors('tags')
  }, [formMethods])

  return (
    <Form
      formMethods={formMethods}
      className="p-6 md:p-12"
      onSubmit={async (data) => {
        console.log(data)
      }}
    >
      <div className="flex flex-col gap-8">
        <FormField
          label={
            <>
              Name
              <HelpQuestionButton />
            </>
          }
          name="name"
        >
          <TextField
            validation={{
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
              maxLength: {
                value: 50,
                message: 'Name must be at most 50 characters',
              },
              required: 'Name is required',
            }}
            name="name"
            className="form-input"
          />
        </FormField>

        <FormField
          label={
            <>
              Message
              <HelpQuestionButton />
            </>
          }
          name="message"
        >
          <TextAreaField
            validation={{
              maxLength: {
                value: 500,
                message: 'Message must be at most 500 characters',
              },
            }}
            maxLength={500}
            name="message"
            className="form-input"
          />
        </FormField>

        <TagsInput
          setError={(error) => setTagsError(error)}
          clearError={clearTagsError}
          hiddenName="tags"
        />

        <FormField
          label={
            <>
              Styling
              <HelpQuestionButton />
            </>
          }
          name="buttonStylingType"
        >
          <SelectField
            defaultValue={'Form'}
            name="buttonState"
            className="form-input"
          >
            {buttonStylingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
        </FormField>

        <div className="flex flex-col">
          <p className="form-label text-base">Preview</p>
          <div className="sticky top-0 flex min-h-48 items-center justify-center rounded-base-small bg-base-950">
            <button type="button">
              <span>Button</span>
            </button>
          </div>
        </div>

        <section>
          {/* <FormField
            label={
              <>
                State
                <HelpQuestionButton />
              </>
            }
            name="buttonState"
          >
            <SelectField name="buttonState" className="form-input">

              {buttonStates.map((tab) => (
                <option key={tab} value={tab}>
                  {tab}
                </option>
              ))}
            </SelectField>
          </FormField> */}

          <div className="flex flex-wrap items-center">
            {buttonStates.map((tab) => (
              <button
                type="button"
                key={tab}
                className={`nav-tab ${
                  activeTab === tab ? 'nav-tab-active' : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            {activeTab === 'base' && (
              <ButtonFormDefaultSection isActive={activeTab === 'base'} />
            )}
            {activeTab === 'hover' && (
              <ButtonFormHoverSection isActive={activeTab === 'hover'} />
            )}
            {activeTab === 'focus' && (
              <ButtonFormFocusSection isActive={activeTab === 'focus'} />
            )}
            {activeTab === 'active' && (
              <ButtonFormActiveSection isActive={activeTab === 'active'} />
            )}
            {activeTab === 'clicked' && (
              <ButtonFormClickedSection isActive={activeTab === 'clicked'} />
            )}
          </div>
        </section>

        <div className="flex items-center justify-between">
          <button
            onClick={formMethods.reset}
            type="reset"
            className="btn-secondary rounded-base-big border border-base-700 px-4 py-2 hover:bg-base-700"
          >
            Reset
          </button>
          <Submit className="btn-primary rounded-base-big px-4 font-semibold">
            Submit
          </Submit>
        </div>
      </div>
    </Form>
  )
}

function FormField({
  label,
  name,
  children,
}: {
  label: string | React.ReactNode
  name: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <Label
        name={name}
        className="form-label mb-1 flex items-center gap-1 text-base"
      >
        {label}
      </Label>
      {children}
      <FieldError name={name} className="form-error" />
    </div>
  )
}

/**
 * ButtonFormTypeSection
 *
 * @description
 * This component is a form section that contains the fields for the button style.
 * It is used for each type of state the button (base, hover, focus, active, clicked).
 *
 **/
function ButtonFormTypeSection({
  type,
  isActive,
}: {
  type: StateType
  isActive?: boolean
}) {
  console.log('type', type)
  function fieldName(name: string) {
    return `${type}-${name}`
  }
  return (
    // <div className="flex flex-col gap-8 mt-12">
    <div
      className={clsx(`${isActive ? '' : 'hidden'} mt-12 flex flex-col gap-8`)}
    >
      <FormField label="Text" name={fieldName('text')}>
        <TextField
          validation={{
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            maxLength: {
              value: 50,
              message: 'Name must be at most 50 characters',
            },
            required: 'Name is required',
          }}
          name={fieldName('text')}
          className="form-input"
        />
      </FormField>

      <div className="flex w-full flex-row items-end gap-8 ">
        <FormField label="Text Color" name={fieldName('textColor')}>
          <ColorField
            name={fieldName('textColor')}
            className="form-input h-12 rounded-base-small p-1"
          />
        </FormField>
        <FormField label="Background" name={fieldName('backgroundColor')}>
          <ColorField
            name={fieldName('backgroundColor')}
            className="form-input h-12 rounded-base-small p-1"
          />
        </FormField>
      </div>

      <div className="flex w-full flex-row items-end gap-8 ">
        <FormField label="Border Width" name={fieldName('borderWidth')}>
          <NumberField name={fieldName('borderWidth')} className="form-input" />
        </FormField>
        <FormField label="Border Radius" name={fieldName('borderRadius')}>
          <NumberField
            name={fieldName('borderRadius')}
            className="form-input"
          />
        </FormField>
      </div>
    </div>
  )
}

function ButtonFormDefaultSection({ isActive }: { isActive?: boolean }) {
  return <ButtonFormTypeSection type="base" isActive={isActive} />
}

function ButtonFormHoverSection({ isActive }: { isActive?: boolean }) {
  return <ButtonFormTypeSection type="hover" isActive={isActive} />
}

function ButtonFormFocusSection({ isActive }: { isActive?: boolean }) {
  return <ButtonFormTypeSection type="focus" isActive={isActive} />
}

function ButtonFormActiveSection({ isActive }: { isActive?: boolean }) {
  return <ButtonFormTypeSection type="active" isActive={isActive} />
}

function ButtonFormClickedSection({ isActive }: { isActive?: boolean }) {
  return <ButtonFormTypeSection type="clicked" isActive={isActive} />
}

const MAX_TAGS = 5

function TagsInput({
  hiddenName,
  inputName = 'tagInput',
  label = 'Tags',
  setError,
  clearError,
}: {
  setError: (error: string) => void
  clearError: () => void
  hiddenName: string
  inputName?: string
  label?: string
}) {
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const addTag = useCallback(
    (newTag: string) => {
      if (!newTag || newTag.length < 3) {
        setError('Tag must be at least 3 characters')
        return
      }
      if (tags.length >= MAX_TAGS) {
        setError(`You can only add ${MAX_TAGS} tags`)
        return
      }
      if (tags.includes(newTag)) {
        setError('Tag already exists')
        return
      }

      const updatedTags = [...tags, newTag]

      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = updatedTags.join(',')
      }
      setTags(updatedTags)
      setTagInput('')
      clearError()
      // Update hidden input value
    },
    [tags, setError, clearError]
  )

  const deleteTag = useCallback(
    (tagToDelete: string) => {
      const updatedTags = tags.filter((tag) => tag !== tagToDelete)
      setTags(updatedTags)
      clearError()
      // Update hidden input value
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = updatedTags.join(',')
      }
    },
    [tags, clearError]
  )

  return (
    <div>
      <Label
        className="form-label mb-1 flex items-center gap-1 text-base"
        name={inputName}
      >
        {label}
      </Label>
      <div className="relative">
        <TextField
          name={inputName}
          className="form-input pl-6 pr-12"
          value={tagInput}
          maxLength={20}
          onChange={(e) => {
            setTagInput(e.target.value)
            clearError()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag(tagInput)
            }
          }}
        />
        <p className="absolute left-3 top-1/2 -translate-y-1/2 transform select-none text-base text-base-400">
          #
        </p>
        <button
          type="button"
          onClick={() => addTag(tagInput)}
          className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2 rounded-base-small bg-secondary-700 p-1 px-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <HiddenField ref={hiddenInputRef} name={hiddenName} />
      </div>
      <FieldError name={hiddenName} className="form-error" />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <button
            onClick={() => deleteTag(tag)}
            type="button"
            key={tag}
            className="flex select-none items-center gap-1 rounded-base-big bg-secondary-700 px-2 py-1 text-sm text-base-200"
          >
            <span className="flex items-center">
              <span className="font-semibold">#</span>
              {tag}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

function HelpQuestionButton() {
  return (
    <button aria-label="Info" type="button" className="flex rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    </button>
  )
}
