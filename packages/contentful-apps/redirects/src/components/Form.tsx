import { Button, Form as CForm } from '@contentful/f36-components'
import { ChangeEvent, useState } from 'react'
import { DEFAULT_FORM } from '../Data'
import { FormType } from './primitives'
import StatusFormControl from './StatusFormControl'
import UrlFormControl from './UrlFormControl'

type FormProps = {
  onSubmit: (data: FormType) => void
  setFormData: (form: FormType) => void
  formData: FormType
  editMode: boolean
}

const Form = ({ onSubmit, setFormData, formData, editMode }: FormProps) => {
  const [formValid, isFormValid] = useState(false)

  const hasError = (value: string): boolean => {
    if (value === '') {
      return true
    }
    return false
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name
    const value = event.target.value
    const error = hasError(value)

    const { fields, errors } = formData
    setFormData({
      fields: { ...fields, [field]: value },
      errors: { ...errors, [field]: error },
    })

    if (!errors.from && !errors.to) {
      isFormValid(true)
    }
  }

  const resetForm = (): void => {
    setFormData(DEFAULT_FORM)
    isFormValid(false)
  }

  const submitForm = (): void => {
    onSubmit(formData)
    resetForm()
  }

  return (
    <CForm onSubmit={submitForm} style={{ width: '100%' }}>
      <UrlFormControl
        label="From URL:"
        name="from"
        placeholder="e.g. '/de/entwickler/'"
        value={formData.fields.from}
        error={formData.errors.from}
        onChange={handleChange}
      />
      <UrlFormControl
        label="To URL:"
        name="to"
        placeholder="e.g. '/en/developer/'"
        value={formData.fields.to}
        error={formData.errors.to}
        onChange={handleChange}
      />
      <StatusFormControl
        value={formData.fields.status as string}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" isDisabled={!formValid}>
        {editMode ? 'Save changes' : 'Submit'}
      </Button>
    </CForm>
  )
}

export default Form
