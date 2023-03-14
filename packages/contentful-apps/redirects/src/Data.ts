import { FormErrors, FormType, Redirect, Status } from "./components"

export const DEFAULT_STATUS: Status = {
  "200": "200 - OK",
  "301": "301 - Moved Permanently",
  "302": "302 - Found",
  "404": "404 - Not Found",
  "410": "410 - Gone",
}

export const DEFAULT_FORM_VALUES: Redirect = {
  from: "",
  to: "",
  status: "200",
}

export const DEFAULT_FORM_ERRORS: FormErrors = {
  from: false,
  to: false,
}

export const DEFAULT_FORM: FormType = {
  fields: DEFAULT_FORM_VALUES,
  errors: DEFAULT_FORM_ERRORS,
}

export default { DEFAULT_STATUS, DEFAULT_FORM_VALUES }
