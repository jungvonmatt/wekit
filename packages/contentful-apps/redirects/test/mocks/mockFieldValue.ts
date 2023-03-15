const value: any[] = []
const setValue = (newValue: any) => jest.fn()

const mockFieldValue = () => {
  return [value, setValue]
}

export { mockFieldValue }
