import { Button, Form as CForm } from '@contentful/f36-components'
import debounce from 'lodash.debounce'
import { ChangeEvent, Ref, useImperativeHandle, useRef, useState } from 'react'
import { DEFAULT_FORM_ERRORS, DEFAULT_FORM_VALUES } from '../Data'
import { Redirect } from './primitives'
import StatusFormControl from './StatusFormControl'
import UrlFormControl from './UrlFormControl'

type FormProps = {
  onSubmit: (data: Redirect) => void
  editMode: boolean
  formRef: Ref<any>
}

const Form = ({ onSubmit, editMode, formRef }: FormProps) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
  const [errors, setErrors] = useState(DEFAULT_FORM_ERRORS)

  const fromRef = useRef<HTMLInputElement>(null)
  const toRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(formRef, () => ({
    resetForm() {
      setFormData(DEFAULT_FORM_VALUES)
      fromRef.current!.value = DEFAULT_FORM_VALUES.from
      toRef.current!.value = DEFAULT_FORM_VALUES.to
    },
    edit({ from, to, status }: Redirect) {
      setFormData({ from, to, status: String(status) })
      fromRef.current!.value = from
      toRef.current!.value = to
      setErrors(DEFAULT_FORM_ERRORS)
    },
  }))

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    error?: boolean
  ): void => {
    const field = event.target.name
    const value = event.target.value
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: error })
  }

  const debouncedChangeHandler = debounce(handleChange, 500)

  const isFormInvalid =
    errors.from || errors.to || formData.from === '' || formData.to === ''

  return (
    <CForm
      onSubmit={() => onSubmit(formData)}
      style={{ width: '100%' }}
      ref={formRef}
    >
      <UrlFormControl
        label="From URL:"
        name="from"
        placeholder="e.g. '/de/entwickler/'"
        onChange={debouncedChangeHandler}
        inputRef={fromRef}
      />
      <UrlFormControl
        label="To URL:"
        name="to"
        placeholder="e.g. '/en/developer/'"
        onChange={debouncedChangeHandler}
        inputRef={toRef}
      />
      <StatusFormControl
        value={formData.status as string}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" isDisabled={isFormInvalid}>
        {editMode ? 'Save changes' : 'Submit'}
      </Button>
    </CForm>
  )
}

export default Form
