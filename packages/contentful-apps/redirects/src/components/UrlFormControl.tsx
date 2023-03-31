import { FormControl, TextInput } from '@contentful/f36-components'
import { css } from 'emotion'
import { ChangeEvent, ReactElement, Ref, useState } from 'react'
import { urlHasError } from '../utils'

type UrlFormControlProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>, error: boolean) => void
  inputRef: Ref<HTMLInputElement>
  label: string
  name: string
  placeholder: string
  value: string
}

const UrlFormControl = (prop: UrlFormControlProps): ReactElement => {
  const { onChange, label, name, placeholder, inputRef, value } = prop
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
      {error && (
        <FormControl.ValidationMessage>
          URL provided is not valid
        </FormControl.ValidationMessage>
      )}
    </FormControl>
  )
}

export default UrlFormControl
