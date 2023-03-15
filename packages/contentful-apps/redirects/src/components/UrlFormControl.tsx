import { FormControl, TextInput } from '@contentful/f36-components'
import { ChangeEvent } from 'react'

type UrlFormControlProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label: string
  name: string
  placeholder: string
  error: boolean
}

const UrlFormControl = (prop: UrlFormControlProps) => {
  const { value, onChange, label, name, placeholder, error } = prop
  return (
    <FormControl isRequired>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInput
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <FormControl.ValidationMessage>
          URL provided is not valid
        </FormControl.ValidationMessage>
      )}
    </FormControl>
  )
}

export default UrlFormControl
