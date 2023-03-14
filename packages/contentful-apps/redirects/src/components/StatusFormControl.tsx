import { FormControl, Radio } from "@contentful/f36-components"
import { DEFAULT_STATUS } from "../Data"

type StatusFormControlProps = {
  value: string
  onChange: (event: any) => void
}

const StatusFormControl = ({ value, onChange }: StatusFormControlProps) => {
  return (
    <FormControl>
      <FormControl.Label>Status Code:</FormControl.Label>
      <Radio.Group name="status" value={value} onChange={onChange}>
        {Object.entries(DEFAULT_STATUS).map(([value, text]) => (
          <Radio key={value} value={value}>
            {text}
          </Radio>
        ))}
      </Radio.Group>
    </FormControl>
  )
}

export default StatusFormControl
