import { render } from '@testing-library/react'
import { mockFieldValue, mockSdk } from '../../test/mocks'
import Field from './Field'

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useFieldValue: () => mockFieldValue,
}))

describe('Field component', () => {
  it('Component text exists', () => {
    const { getByText } = render(<Field />)

    expect(getByText('From URL:')).toBeInTheDocument()
    expect(getByText('To URL:')).toBeInTheDocument()
    expect(getByText('Status Code:')).toBeInTheDocument()
  })
})
