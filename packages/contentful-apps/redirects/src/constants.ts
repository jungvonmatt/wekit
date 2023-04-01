import { FormErrors, Redirect, Status } from './types'

export const DEFAULT_STATUS: Status = {
  200: '200 - Ok (Forward Request)',
  301: '301 - Moved Permanently',
  302: '302 - Found (Moved Temporarily)',
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

export const FROM_REGEX =
  /^\/([-a-zA-Z0-9@:%._\+~#=\/]*?(\/\*)?|\*?)(\s\w+=:\w+)*?$/

export const TO_REGEX =
  /^(https?:\/\/[.\w]+(:\d+)?|\/)[-a-zA-Z0-9@:%._\+~#=\/]*?$/

export const SLASH_REGEX = /\//g
