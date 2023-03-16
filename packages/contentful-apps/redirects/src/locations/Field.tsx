import { FieldExtensionSDK } from '@contentful/app-sdk'
import { ModalLauncher, Stack, Text } from '@contentful/f36-components'
import { useFieldValue, useSDK } from '@contentful/react-apps-toolkit'
import { useEffect, useState } from 'react'
import { Form, FormType, Modal, Redirect, Table } from '../components'
import { DEFAULT_FORM, DEFAULT_FORM_ERRORS } from '../Data'
import { arrayMove } from '../Utils'

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>()

  const [redirects, setRedirects] = useFieldValue<Redirect[]>()
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    sdk.window.startAutoResizer()
    return () => sdk.window.stopAutoResizer()
  }, [sdk.window])

  const resetForm = (): void => {
    setFormData(DEFAULT_FORM)
    setEditMode(false)
  }

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

  const submitForm = (data: FormType): void => {
    const { from, to, status } = data.fields
    const index = getRedirectIndex(from)
    const redirect = { from, to, status: +status, date: new Date().getTime() }

    const oldRedirect = redirects![index]
    // In case the 'from' url already exists, replace it with the new one
    if (
      index !== -1 &&
      (oldRedirect.to !== redirect.to || oldRedirect.status !== redirect.status)
    ) {
      showEditModal(redirect, oldRedirect, index)
    } else {
      addRedirect(redirect)
      resetForm()
    }
  }

  const onEdit = (redirect: Redirect): void => {
    setEditMode(true)
    const { from, to, status } = redirect
    setFormData({
      fields: { from, to, status: String(status) },
      errors: DEFAULT_FORM_ERRORS,
    })
  }

  const showEditModal = (
    redirect: Redirect,
    oldRedirect: Redirect,
    index: number
  ): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <Modal
          isShown={isShown}
          onClose={onClose}
          title="Do you want to edit this redirect?"
        >
          <Stack flexDirection="column" alignItems="start" spacing="spacingL">
            <Stack
              flexDirection="column"
              alignItems="start"
              spacing="spacing2Xs"
            >
              <Text>This redirect already exists:</Text>
              <Text fontWeight="fontWeightDemiBold">
                from: <Text>{oldRedirect.from}</Text>
              </Text>
            </Stack>
            <Stack
              flexDirection="column"
              alignItems="start"
              spacing="spacing2Xs"
            >
              <Text fontSize="fontSizeL" fontWeight="fontWeightDemiBold">
                Old values:
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                to: <Text>{oldRedirect.to}</Text>
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                status: <Text>{oldRedirect.status}</Text>
              </Text>
            </Stack>
            <Stack
              flexDirection="column"
              alignItems="start"
              spacing="spacing2Xs"
            >
              <Text fontSize="fontSizeL" fontWeight="fontWeightDemiBold">
                New values:
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                to: <Text>{redirect.to}</Text>
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                status: <Text>{redirect.status}</Text>
              </Text>
            </Stack>
          </Stack>
        </Modal>
      )
    }).then((result) => {
      if (result) {
        const tempArr = [...redirects!]
        tempArr[index] = redirect
        arrayMove(tempArr, index)
        setRedirects(tempArr)
        resetForm()
      }
    })
  }

  const onDelete = (redirect: Redirect, index: number): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <Modal isShown={isShown} onClose={onClose} title="Delete this entry?">
          <Stack flexDirection="column" alignItems="start">
            <Stack
              flexDirection="column"
              alignItems="start"
              spacing="spacing2Xs"
            >
              <Text fontWeight="fontWeightDemiBold">
                from: <Text>{redirect.from}</Text>
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                to: <Text>{redirect.to}</Text>
              </Text>
              <Text fontWeight="fontWeightDemiBold">
                status: <Text>{redirect.status}</Text>
              </Text>
            </Stack>
          </Stack>
        </Modal>
      )
    }).then((result) => {
      if (result) {
        removeRedirect(index)
      }
    })
  }

  return (
    <Stack
      flexDirection="column"
      spacing="spacingL"
      style={{ margin: '2rem 4px 3rem' }}
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
