import { FormControl, Radio } from '@contentful/f36-components'
import { css } from 'emotion'
import { ChangeEvent, ReactElement } from 'react'
import { DEFAULT_STATUS } from '../constants'

type StatusFormControlProps = {
  value: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const radioStyle = css`
  &:hover label {
    cursor: pointer;
  }
`

const StatusFormControl = ({
  value,
  onChange,
}: StatusFormControlProps): ReactElement => {
  return (
    <FormControl>
      <FormControl.Label>Status Code:</FormControl.Label>
      <Radio.Group name="status" value={value.toString()} onChange={onChange}>
        {Object.entries(DEFAULT_STATUS).map(([value, text]) => (
          <Radio key={value} value={value} className={radioStyle}>
            {text}
          </Radio>
        ))}
      </Radio.Group>
    </FormControl>
  )
}

export default StatusFormControl
