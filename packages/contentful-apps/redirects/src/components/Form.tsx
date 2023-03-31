import { Form as CForm } from '@contentful/f36-components'
import {
  ChangeEvent,
  MutableRefObject,
  ReactElement,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { DEFAULT_FORM_ERRORS, DEFAULT_FORM_VALUES } from '../constants'
import { Redirect } from '../types'
import StatusFormControl from './StatusFormControl'
import UrlFormControl from './UrlFormControl'

type FormProps = {
  formRef: Ref<any>
  redirect?: Redirect
}

const Form = ({ formRef, redirect }: FormProps): ReactElement => {
  const [formData, setFormData] = useState(redirect || DEFAULT_FORM_VALUES)
  const [errors, setErrors] = useState(DEFAULT_FORM_ERRORS)

  const fromRef = useRef() as MutableRefObject<HTMLInputElement>
  const toRef = useRef() as MutableRefObject<HTMLInputElement>

  useImperativeHandle(formRef, () => ({
    getFormData: (): Redirect => formData,
  }))

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    error?: boolean
  ): void => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: error })
  }

  return (
    <CForm style={{ width: '100%' }} ref={formRef}>
      <UrlFormControl
        label="From URL:"
        name="from"
        placeholder="e.g. '/de/entwickler/'"
        onChange={handleChange}
        inputRef={fromRef}
        value={formData.from}
      />
      <UrlFormControl
        label="To URL:"
        name="to"
        placeholder="e.g. '/en/developer/'"
        onChange={handleChange}
        inputRef={toRef}
        value={formData.to}
      />
      <StatusFormControl value={formData.status} onChange={handleChange} />
    </CForm>
  )
}

export default Form
