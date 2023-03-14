// Move an array element
export const arrayMove = (
  arr: any[],
  fromIndex: number,
  toIndex: number = 0
): void => {
  const element = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, element)
}

export default { arrayMove }
