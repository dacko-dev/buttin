import { useCallback, useRef, useState } from 'react'

import { FieldError, HiddenField, Label, TextField } from '@redwoodjs/forms'

const MAX_TAGS = 5

export function TagsInput({
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
          className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2 rounded-base-small bg-secondary-700 p-1"
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
