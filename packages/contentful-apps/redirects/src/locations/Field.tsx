import { FieldExtensionSDK } from "@contentful/app-sdk"
import { Stack } from "@contentful/f36-components"
import { useFieldValue, useSDK } from "@contentful/react-apps-toolkit"
import { useEffect, useState } from "react"
import { Form, Redirect, Table } from "../components"
import { DEFAULT_FORM, DEFAULT_FORM_ERRORS } from "../Data"
import { arrayMove } from "../Utils"

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>()

  const [redirects, setRedirects] = useFieldValue<Redirect[]>()
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    sdk.window.startAutoResizer()
    return () => sdk.window.stopAutoResizer()
  }, [sdk.window])

  const getRedirectIndex = (from: string): number => {
    return redirects!.findIndex((redirect: Redirect) => redirect.from === from)
  }

  const removeRedirect = (index: number): void => {
    const tempArr = [...redirects!]
    tempArr.splice(index, 1)
    setRedirects(tempArr)
  }

  const addRedirect = (redirect: Redirect): void => {
    setRedirects([redirect, ...redirects!] as Redirect[])
  }

  const submitForm = ({ from, to, status }: Redirect): void => {
    const index = getRedirectIndex(from)
    const redirect = { from, to, status: +status, date: new Date().getTime() }

    // In case the 'from' url already exists, replace it with the new one
    if (index !== -1) {
      const tempArr = [...redirects!]
      tempArr[index] = redirect
      arrayMove(tempArr, index)
      setRedirects(tempArr)
    } else {
      addRedirect(redirect)
    }
    setEditMode(false)
  }

  const onEdit = (redirect: Redirect): void => {
    setEditMode(true)
    const { from, to, status } = redirect
    setFormData({
      fields: { from, to, status: String(status) },
      errors: DEFAULT_FORM_ERRORS,
    })
  }

  const onDelete = (redirect: Redirect, index: number): void => {
    removeRedirect(index)
  }

  return (
    <Stack
      flexDirection="column"
      spacing="spacingL"
      style={{ margin: "2rem 4px 3rem" }}
    >
      <Form
        onSubmit={submitForm}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
      />
      {redirects && (
        <Table data={redirects} onEdit={onEdit} onDelete={onDelete} />
      )}
    </Stack>
  )
}

export default Field
