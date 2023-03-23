import { FormControl, TextInput } from '@contentful/f36-components'
import { css } from 'emotion'
import { ChangeEvent, Ref, useState } from 'react'
import { urlHasError } from '../Utils'

type UrlFormControlProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>, error: boolean) => void
  inputRef: Ref<HTMLInputElement>
  label: string
  name: string
  placeholder: string
}

const UrlFormControl = (prop: UrlFormControlProps) => {
  const { onChange, label, name, placeholder, inputRef } = prop
  const [error, setError] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const hasError = urlHasError(value)
    setError(hasError)
    onChange(event, hasError)
  }

  const inputStyle = css`
    margin-bottom: ${error ? '0' : '1.75rem'};
  `

  return (
    <FormControl style={{ width: '70%' }} isRequired>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInput
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputStyle}
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
