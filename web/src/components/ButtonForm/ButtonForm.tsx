/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import {
  CheckboxField,
  ColorField,
  FileField,
  Form,
  HiddenField,
  Label,
  NumberField,
  SelectField,
  Submit,
  TextAreaField,
  TextField,
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from '@redwoodjs/forms'

import ButtonPreview from 'src/components/ButtonPreview/ButtonPreview'
import ButtonPreviewCss from 'src/components/ButtonPreviewCss/ButtonPreviewCss'
import ButtonPreviewForm from 'src/components/ButtonPreviewForm/ButtonPreviewForm'
import CSSEditor from 'src/components/CSSEditor'
import { FormField } from 'src/components/forms/FormField/FormField'
import { FormFieldPill } from 'src/components/forms/FormFieldPill/FormFieldPill'
import { TagsInput } from 'src/components/forms/TagsInput/TagsInput'
import { HelpHoverInfoButton } from 'src/components/HelpHoverInfoButton/HelpHoverInfoButton'
import {
  buttonStates,
  ButtonStateType,
  buttonStylingTypes,
  buttonTransitionProperties,
} from 'src/lib/constants'
import {
  ButtonFormSchema,
  buttonSchema,
  ButtonStateSchema,
} from 'src/lib/schemas/buttonFormSchema'
import { sanitizeUserCSS } from 'src/lib/utils'

const defaultCSS = `
#my-button {

}

#my-button:hover, #my-button.clicked:hover {

}

#my-button:focus, #my-button.clicked:focus {

}

#my-button:active, #my-button.clicked:active {

}

#my-button.clicked {

}
`

const defaultValuesStateStyles: ButtonStateSchema = {
  copyBaseStyles: true,
  textColor: '#ffffff',
  fontSize: 16,
  fontWeight: 400,
  fontFamily: 'Arial',
  backgroundType: 'solid',
  backgroundColor: '#0a78ff',
  backgroundGradientAngle: 0,
  borderWidth: 0,
  borderRadius: 0,
  borderColor: '',
  borderStyle: 'solid',
}

const defaultValues: ButtonFormSchema = {
  name: '',
  text: '',
  message: '',
  tags: [],
  buttonStylingType: 'Form',
  base: defaultValuesStateStyles,
  hover: defaultValuesStateStyles,
  focus: defaultValuesStateStyles,
  active: defaultValuesStateStyles,
  clicked: defaultValuesStateStyles,
  cssStyles: defaultCSS,
}

export default function ButtonForm() {
  const formMethods = useForm<ButtonFormSchema>({
    defaultValues,
    resolver: zodResolver(buttonSchema),
  })

  const [activeTab, setActiveTab] = useState<ButtonStateType>('base')

  const [previewPinned, setPreviewPinned] = useState<boolean>(false)

  const setTagsError = useCallback(
    (error: string) => {
      formMethods.setError('tags', { message: error })
    },
    [formMethods]
  )

  const clearTagsError = useCallback(() => {
    formMethods.clearErrors('tags')
  }, [formMethods])

  const stylingType = formMethods.watch('buttonStylingType') || 'Form'

  const cssStyles = formMethods.watch('cssStyles')

  const buttonText = formMethods.watch('text')
  return (
    <>
      <Form
        // TODO: implement debounce on change, to update the preview button
        onChange={(data) => {
          // console.log(data)
        }}
        formMethods={formMethods}
        className="p-6 md:p-12"
        onSubmit={async (data: ButtonFormSchema) => {
          console.log(data)
        }}
      >
        <div className="flex flex-col gap-8">
          <FormField
            afterLabel={
              <HelpHoverInfoButton>
                Name your button. This is NOT the text that will be displayed
              </HelpHoverInfoButton>
            }
            label={<>Name</>}
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
            afterLabel={
              <HelpHoverInfoButton>
                This IS the text that will be displayed on the button
              </HelpHoverInfoButton>
            }
            label={<>Text</>}
            name="name"
          >
            <TextField name="text" className="form-input" />
          </FormField>

          <FormField
            label={
              <>
                Message
                <HelpHoverInfoButton />
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
                Styling Type
                <HelpHoverInfoButton />
              </>
            }
            name="buttonStylingType"
          >
            <SelectField
              defaultValue={'Form'}
              name="buttonStylingType"
              className="form-input"
            >
              {buttonStylingTypes.map((type) => (
                <option disabled={type === 'Tailwind'} key={type} value={type}>
                  {type}
                  {type === 'Tailwind' && ' (WIP!)'}
                </option>
              ))}
            </SelectField>
          </FormField>

          <div
            style={{
              position: previewPinned ? 'sticky' : 'relative',
            }}
            className={clsx(
              `top-0 z-10 -mx-6 mt-6 flex min-h-48  items-center justify-center rounded-base-small bg-base-950 md:-mx-12 md:mt-12`
            )}
          >
            <button
              onClick={() => setPreviewPinned(!previewPinned)}
              type="button"
              className="absolute right-4 top-4 "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 text-base-200"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {stylingType === 'Form' && (
              <ButtonPreviewForm formMethods={formMethods} />
            )}
            {stylingType === 'CSS' && (
              <ButtonPreview style={cssStyles}>
                {/* {formMethods.watch('name')} */}
                {buttonText}
              </ButtonPreview>
            )}
          </div>

          <section
            className={clsx(
              ` ${stylingType === 'Form' ? 'mt-4 block' : 'hidden'}`
            )}
          >
            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
              {buttonStates.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={`rounded-base-small border-1 px-2  font-semibold hover:border-transparent ${activeTab === tab ? ' border-transparent bg-secondary-900' : 'border-base-800 hover:bg-base-800'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={'mt-4'}>
              {activeTab === 'base' && (
                <ButtonFormBaseSection
                  formMethods={formMethods}
                  isActive={activeTab === 'base'}
                />
              )}
              {activeTab === 'hover' && (
                <ButtonFormHoverSection
                  formMethods={formMethods}
                  isActive={activeTab === 'hover'}
                />
              )}
              {activeTab === 'focus' && (
                <ButtonFormFocusSection
                  formMethods={formMethods}
                  isActive={activeTab === 'focus'}
                />
              )}
              {activeTab === 'active' && (
                <ButtonFormActiveSection
                  formMethods={formMethods}
                  isActive={activeTab === 'active'}
                />
              )}
              {activeTab === 'clicked' && (
                <ButtonFormClickedSection
                  formMethods={formMethods}
                  isActive={activeTab === 'clicked'}
                />
              )}
            </div>
          </section>

          <HiddenField name="cssStyles" />
          <CSSEditor
            onChange={(val, viewUpdate) => {
              formMethods.setValue('cssStyles', val)
            }}
            value={formMethods.watch('cssStyles')}
            className={clsx(
              `${stylingType === 'CSS' ? 'block' : 'hidden'} -mx-6 -mt-8 md:-mx-12 `
            )}
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                formMethods.reset()
              }}
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
    </>
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
function ButtonFormStylesSection({
  type,
  isActive,
  formMethods,
}: {
  type: ButtonStateType
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  console.log('type', type)

  const { fields, append, remove } = useFieldArray<ButtonFormSchema>({
    name: 'transitions',
    control: formMethods.control,
    rules: {
      validate: {
        maxLength: (value) => {
          return value.length <= buttonTransitionProperties.length - 1
        },
      },
    },
  })

  const activeTransitionProperties = useWatch({
    control: formMethods.control,
    name: 'transitions',
  })?.map((transition) => transition.property)

  console.log('activeTransitionProperties', activeTransitionProperties)

  const isTransitionAll = activeTransitionProperties?.includes('all')

  // get nested field name
  function fieldName(name: keyof ButtonStateSchema) {
    return `${type}.${name}` as keyof ButtonFormSchema
  }

  const backgroundType = formMethods.watch(fieldName('backgroundType'))

  const copyBaseStyles =
    type !== 'base' && formMethods.watch(fieldName('copyBaseStyles'))

  return (
    <div className={clsx(`${isActive ? '' : 'hidden'}  flex flex-col  gap-0`)}>
      {type !== 'base' && (
        <div className="my-6 flex items-center justify-start gap-2">
          <Label name={fieldName('copyBaseStyles')} className="">
            Copy Base Styles
          </Label>
          <CheckboxField
            name={fieldName('copyBaseStyles')}
            onChange={(e) => {
              if (e.target.checked) {
                formMethods.setValue(`${type}.copyBaseStyles`, true)
                copyStylesToState(formMethods, 'base', type)
              } else {
                formMethods.setValue(`${type}.copyBaseStyles`, false)
              }
            }}
            className="h-5 w-5"
          />
        </div>
      )}

      {!copyBaseStyles && (
        <>
          <StylesSectionAccordion title="Text Styles">
            {/* <div className="flex flex-col items-stretch w-full gap-4 justify-stretch md:flex-row "> */}
            <div className="grid w-full grid-cols-1 gap-4 p-2 pb-8 pt-4 sm:grid-cols-2 md:grid-cols-3">
              {/* <FormFieldPill label="Text" name={fieldName('text')}>
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
                  className="form-input-pill"
                />
              </FormFieldPill> */}
              <FormFieldPill label="Color" name={fieldName('textColor')}>
                <ColorField
                  name={fieldName('textColor')}
                  className="form-input-pill h-full"
                />
              </FormFieldPill>
              <FormFieldPill
                label="Letter Spacing"
                name={fieldName('letterSpacing')}
              >
                <NumberField
                  name={fieldName('letterSpacing')}
                  className="form-input-pill"
                />
              </FormFieldPill>
              <FormFieldPill label="Line Height" name={fieldName('lineHeight')}>
                <NumberField
                  name={fieldName('lineHeight')}
                  className="form-input-pill"
                />
              </FormFieldPill>
              <div className="col-span-full mt-2">
                <h5 className="form-label mb-2">Font</h5>
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <FormFieldPill label="Weight" name={fieldName('fontWeight')}>
                    <SelectField
                      name={fieldName('fontWeight')}
                      className="form-input-pill"
                    >
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                      <option value={300}>300</option>
                      <option value={400}>400</option>
                      <option value={500}>500</option>
                      <option value={600}>600</option>
                      <option value={700}>700</option>
                      <option value={800}>800</option>
                      <option value={900}>900</option>
                    </SelectField>
                  </FormFieldPill>
                  <FormFieldPill label="Size" name={fieldName('fontSize')}>
                    <NumberField
                      defaultValue={16}
                      name={fieldName('fontSize')}
                      className="form-input-pill"
                    />
                  </FormFieldPill>
                  <FormFieldPill label="Family" name={fieldName('fontFamily')}>
                    <SelectField
                      name={fieldName('fontFamily')}
                      className="form-input-pill"
                    >
                      <option style={{ fontFamily: 'Arial' }} value="Arial">
                        Arial
                      </option>
                      <option
                        style={{ fontFamily: 'Arial Black' }}
                        value="Arial Black"
                      >
                        Arial Black
                      </option>
                      <option
                        style={{ fontFamily: 'Comic Sans MS' }}
                        value="Comic Sans MS"
                      >
                        Comic Sans MS
                      </option>
                      <option
                        style={{ fontFamily: 'Courier New' }}
                        value="Courier New"
                      >
                        Courier New
                      </option>
                      <option style={{ fontFamily: 'Georgia' }} value="Georgia">
                        Georgia
                      </option>
                    </SelectField>
                  </FormFieldPill>
                  <FormFieldPill label="Style" name={fieldName('fontStyle')}>
                    <SelectField
                      name={fieldName('fontStyle')}
                      className="form-input-pill"
                    >
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                      <option value="oblique">Oblique</option>
                    </SelectField>
                  </FormFieldPill>
                </div>
              </div>
              <div className="col-span-full mt-2">
                <h5 className="form-label mb-2">Text Shadow</h5>
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <FormFieldPill
                    label="Offset X | Y"
                    name={fieldName('textShadowX')}
                  >
                    <NumberField
                      name={fieldName('textShadowX')}
                      className="form-input-pill border-collapse rounded-r-none text-center"
                    />
                    <NumberField
                      name={fieldName('textShadowY')}
                      className="form-input-pill text-center "
                    />
                  </FormFieldPill>
                  <FormFieldPill
                    label="Blur"
                    name={fieldName('textShadowBlur')}
                  >
                    <TextField
                      name={fieldName('textShadowBlur')}
                      className="form-input-pill h-full"
                    />
                  </FormFieldPill>
                  <FormFieldPill
                    label="Color"
                    name={fieldName('textShadowColor')}
                  >
                    <ColorField
                      name={fieldName('textShadowColor')}
                      className="form-input-pill h-full"
                    />
                  </FormFieldPill>
                </div>
              </div>
            </div>
          </StylesSectionAccordion>
          {/* Background Styles */}
          <StylesSectionAccordion title="Background Styles">
            <div className="grid w-full grid-cols-1 gap-4 p-2 pb-8 pt-4 sm:grid-cols-2 md:grid-cols-3">
              <FormFieldPill label="Image" name={fieldName('backgroundImage')}>
                <FileField
                  name={fieldName('backgroundImage')}
                  className="form-input-pill"
                />
              </FormFieldPill>
              <FormFieldPill
                label="Background Type"
                name={fieldName('backgroundType')}
              >
                <SelectField
                  name={fieldName('backgroundType')}
                  className="form-input-pill"
                >
                  <option value="solid">Solid</option>
                  <option value="gradient">Gradient</option>
                </SelectField>
              </FormFieldPill>
              <FormFieldPill
                label="Solid Color"
                name={fieldName('backgroundColor')}
                className={clsx(
                  ` ${backgroundType === 'solid' ? 'block' : 'hidden'}`
                )}
              >
                {/* FIXME: fix input and label not connecting visually, input is a little bit shorter  */}
                <ColorField
                  name={fieldName('backgroundColor')}
                  className="form-input-pill h-full"
                />
              </FormFieldPill>
              <div
                className={clsx(`
              ${backgroundType === 'gradient' ? 'block' : 'hidden'}
              col-span-full mt-2`)}
              >
                <h5 className="form-label mb-2">Gradient</h5>
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <FormFieldPill
                    label="From | To"
                    name={fieldName('backgroundGradientFrom')}
                  >
                    <ColorField
                      name={fieldName('backgroundGradientFrom')}
                      className="form-input-pill h-full rounded-r-none"
                    />
                    <ColorField
                      name={fieldName('backgroundGradientTo')}
                      className="form-input-pill h-full"
                    />
                  </FormFieldPill>
                  <FormFieldPill
                    label="Angle"
                    name={fieldName('backgroundGradientTo')}
                  >
                    <NumberField
                      max={360}
                      min={0}
                      name={fieldName('backgroundGradientAngle')}
                      className="form-input-pill"
                    />
                  </FormFieldPill>
                </div>
              </div>
            </div>
          </StylesSectionAccordion>
          {/* Border Styles */}
          <StylesSectionAccordion title="Border Styles">
            {/* TODO: enable selecting top/bottom/left/right border sides */}
            <div className="grid w-full grid-cols-1 gap-4 p-2 pb-8 pt-4 sm:grid-cols-2 md:grid-cols-3">
              <FormFieldPill
                label="Border Width"
                name={fieldName('borderWidth')}
              >
                <NumberField
                  min={0}
                  max={8}
                  name={fieldName('borderWidth')}
                  className="form-input-pill"
                />
              </FormFieldPill>
              <FormFieldPill
                label="Border Color"
                name={fieldName('borderColor')}
              >
                <ColorField
                  name={fieldName('borderColor')}
                  className="form-input-pill h-full"
                />
              </FormFieldPill>
              <FormFieldPill
                label="Border Radius"
                name={fieldName('borderRadius')}
              >
                <NumberField
                  max={999}
                  min={0}
                  name={fieldName('borderRadius')}
                  className="form-input-pill"
                />
              </FormFieldPill>
              <FormFieldPill
                label="Border Style"
                name={fieldName('borderStyle')}
              >
                <SelectField
                  name={fieldName('borderStyle')}
                  className="form-input-pill"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </SelectField>
              </FormFieldPill>
            </div>
          </StylesSectionAccordion>
          <StylesSectionAccordion title="Other">
            <div className="grid w-full grid-cols-1 gap-4 p-2 pb-8 pt-4 sm:grid-cols-2 md:grid-cols-3">
              <FormFieldPill label="Pading X | Y" name={fieldName('paddingX')}>
                <NumberField
                  name={fieldName('paddingX')}
                  className="form-input-pill border-collapse rounded-r-none text-center"
                />
                <NumberField
                  name={fieldName('paddingY')}
                  className="form-input-pill text-center "
                />
              </FormFieldPill>
              <FormFieldPill label="Opacity" name={fieldName('opacity')}>
                <NumberField
                  min={0}
                  max={1}
                  name={fieldName('opacity')}
                  className="form-input-pill"
                />
              </FormFieldPill>
            </div>
          </StylesSectionAccordion>
          <StylesSectionAccordion
            className={clsx(`${type === 'base' ? 'block' : 'hidden'}`)}
            title="Transition"
          >
            {fields.map((transition, index) => {
              return (
                <div
                  key={transition.id}
                  className={clsx(
                    `group relative mb-6 grid w-full grid-cols-1 gap-4 p-2 pt-4 last-of-type:pb-4 sm:grid-cols-2 md:grid-cols-3`
                  )}
                >
                  <button
                    className="absolute -left-4 top-3 hidden rotate-180 pb-2 pt-8 group-hover:block"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                      />
                    </svg>
                  </button>
                  <FormFieldPill
                    label="Property"
                    name={`transitions[${index}].property`}
                  >
                    <SelectField
                      name={`transitions[${index}].property`}
                      className="form-input-pill"
                    >
                      {buttonTransitionProperties.map((property) => (
                        <option
                          disabled={activeTransitionProperties?.includes(
                            property
                          )}
                          key={property}
                          value={property}
                        >
                          {property.charAt(0).toUpperCase() + property.slice(1)}
                        </option>
                      ))}
                    </SelectField>
                  </FormFieldPill>
                  <FormFieldPill
                    label="Duration"
                    name={`transitions[${index}].duration`}
                  >
                    <NumberField
                      defaultValue={0}
                      min={0}
                      name={`transitions[${index}].duration`}
                      className="form-input-pill"
                    />
                  </FormFieldPill>
                  <FormFieldPill
                    label="Delay"
                    name={`transitions[${index}].delay`}
                  >
                    <NumberField
                      defaultValue={0}
                      min={0}
                      name={`transitions[${index}].delay`}
                      className="form-input-pill"
                    />
                  </FormFieldPill>
                  <FormFieldPill
                    label="Timing"
                    name={`transitions[${index}].timingFunction`}
                  >
                    <SelectField
                      defaultValue="ease"
                      name={`transitions[${index}].timingFunction`}
                      className="form-input-pill"
                    >
                      <option value="ease">Ease</option>
                      <option value="ease-in">Ease In</option>
                      <option value="ease-out">Ease Out</option>
                      <option value="ease-in-out">Ease In Out</option>
                      <option value="linear">Linear</option>
                    </SelectField>
                  </FormFieldPill>
                </div>
              )
            })}
            <section
              className={clsx(
                `${fields.length === 0 ? 'flex w-full flex-col items-center justify-center gap-2 rounded-base-small  border-2 border-dashed border-base-700 bg-base-800 p-8' : ' -mt-6 flex w-full px-2'}`,
                'block'
              )}
            >
              <p
                className={clsx(
                  `${fields.length === 0 ? 'text-base-400' : 'hidden'}`
                )}
              >
                Add a transition to see the preview
              </p>
              <button
                disabled={
                  fields.length >= buttonTransitionProperties.length - 1 ||
                  isTransitionAll
                }
                onClick={() => {
                  if (fields.length < buttonTransitionProperties.length - 1) {
                    append({
                      duration: 0,
                      delay: 0,
                      property: buttonTransitionProperties.find(
                        (property) =>
                          !activeTransitionProperties?.includes(property) &&
                          property !== 'all'
                      ),
                      timingFunction: 'ease',
                    })
                  }
                }}
                type="button"
                className={clsx(
                  `${fields.length === 0 ? '' : 'self-start justify-self-start '} group flex items-center  justify-center rounded-base-small bg-secondary-800  p-2 text-xs disabled:bg-base-800 disabled:opacity-70`
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </section>
          </StylesSectionAccordion>
        </>
      )}
    </div>
  )
}

const NUMBER_OF_TRANSITIONS = 5

function ButtonFormBaseSection({
  isActive,
  formMethods,
}: {
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  return (
    <ButtonFormStylesSection
      formMethods={formMethods}
      type="base"
      isActive={isActive}
    />
  )
}

function ButtonFormHoverSection({
  isActive,
  formMethods,
}: {
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  return (
    <ButtonFormStylesSection
      formMethods={formMethods}
      type="hover"
      isActive={isActive}
    />
  )
}

function ButtonFormFocusSection({
  isActive,
  formMethods,
}: {
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  return (
    <ButtonFormStylesSection
      formMethods={formMethods}
      type="focus"
      isActive={isActive}
    />
  )
}

function ButtonFormActiveSection({
  isActive,
  formMethods,
}: {
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  return (
    <ButtonFormStylesSection
      formMethods={formMethods}
      type="active"
      isActive={isActive}
    />
  )
}

function ButtonFormClickedSection({
  isActive,
  formMethods,
}: {
  isActive?: boolean
  formMethods: UseFormReturn<ButtonFormSchema>
}) {
  return (
    <ButtonFormStylesSection
      formMethods={formMethods}
      type="clicked"
      isActive={isActive}
    />
  )
}

function StylesSectionAccordion({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <details
      className={`w-full border-base-700 last-of-type:rounded-b-base-small ${className}`}
    >
      <summary className="flex cursor-pointer select-none items-center gap-4 whitespace-nowrap py-2">
        {title}
        <div className="h-[1px] w-full bg-base-600" />
      </summary>
      <div className="flex flex-col items-center ">
        {/* gap-4 border-base-700 p-6 */}
        {children}
      </div>
    </details>
  )
}

function copyStylesToState(
  formMethods: UseFormReturn<ButtonFormSchema>,
  fromType: ButtonStateType,
  toType: ButtonStateType
) {
  const fromStyles = formMethods.getValues(fromType)

  formMethods.setValue(toType, {
    ...fromStyles,
    copyBaseStyles: true,
  })
}
