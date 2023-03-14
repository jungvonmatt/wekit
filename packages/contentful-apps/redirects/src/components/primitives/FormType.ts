import { FormErrors } from "./FormErrors"
import { Redirect } from "./Redirect"

export type FormType = {
  fields: Redirect
  errors: FormErrors
}
