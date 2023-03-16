import { FormControl, TextInput } from '@contentful/f36-components'
import { ChangeEvent, useState } from 'react'
import { URL_REGEX } from '../Data'

type UrlFormControlProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>, error: boolean) => void
  value: string
  label: string
  name: string
  placeholder: string
}

const UrlFormControl = (prop: UrlFormControlProps) => {
  const { onChange, value, label, name, placeholder } = prop
  const [error, setError] = useState(false)
  const hasError = (value: string): boolean => !URL_REGEX.test(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setError(hasError(value))
    onChange(event, error)
  }

  return (
    <FormControl isRequired>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInput
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {value !== '' && error && (
        <FormControl.ValidationMessage>
          URL provided is not valid
        </FormControl.ValidationMessage>
      )}
    </FormControl>
  )
}

export default UrlFormControl
