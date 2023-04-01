import { FormControl, TextInput } from '@contentful/f36-components'
import { css } from 'emotion'
import { ChangeEvent, ReactElement, Ref, useState } from 'react'

type UrlFormControlProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>, error: boolean) => void
  getError: (value: string) => string
  inputRef: Ref<HTMLInputElement>
  label: string
  name: string
  placeholder: string
  value: string
}

const UrlFormControl = (prop: UrlFormControlProps): ReactElement => {
  const { onChange, label, name, placeholder, inputRef, value, getError } = prop
  const [error, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const errorMsg = getError(value)
    setError(errorMsg)
    onChange(event, !!errorMsg)
  }

  const inputStyle = css`
    margin-bottom: ${error ? '0' : '1.75rem'};
  `

  return (
    <FormControl isRequired>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInput
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputStyle}
        value={value}
      />
      {!!error && (
        <FormControl.ValidationMessage>{error}</FormControl.ValidationMessage>
      )}
    </FormControl>
  )
}

export default UrlFormControl
