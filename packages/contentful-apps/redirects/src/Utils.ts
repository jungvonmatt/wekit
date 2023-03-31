import { SLASH_REGEX, URL_REGEX } from './constants'

/**
 * Move an array element
 * @param arr
 * @param fromIndex
 * @param toIndex
 */
export const arrayMove = (
  arr: any[],
  fromIndex: number,
  toIndex: number = 0
): void => {
  const element = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, element)
}

export const urlHasError = (value: string): boolean => !URL_REGEX.test(value)

export const countSlashes = (value: string): number =>
  (value.match(SLASH_REGEX) || []).length

export default { arrayMove, urlHasError }
