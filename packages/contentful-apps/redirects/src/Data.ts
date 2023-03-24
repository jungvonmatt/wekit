import { FormErrors, Redirect, Status } from './types'

export const DEFAULT_STATUS: Status = {
  200: '200 - OK',
  301: '301 - Moved Permanently',
  302: '302 - Found',
  404: '404 - Not Found',
  410: '410 - Gone',
}

export const DEFAULT_FORM_VALUES: Redirect = {
  from: '',
  to: '',
  status: 200,
}

export const DEFAULT_FORM_ERRORS: FormErrors = {
  from: false,
  to: false,
}

export const URL_REGEX = /(^\/)\S+/

export const SLASH_REGEX = /\//g
