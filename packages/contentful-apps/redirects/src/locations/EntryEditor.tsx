import { ModalLauncher, Stack, Text } from '@contentful/f36-components'
import { WorkbenchContent } from '@contentful/f36-workbench'

import { useFieldValue } from '@contentful/react-apps-toolkit'
import { useRef, useState } from 'react'
import { Form, Modal, Table } from '../components'
import { Redirect } from '../types'
import { arrayMove } from '../Utils'

const Field = () => {
  const [redirects, setRedirects] = useFieldValue<Redirect[]>('redirects')
  const [editMode, setEditMode] = useState(false)
  const formRef = useRef<any>()

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

  const submitForm = (data: Redirect): void => {
    const { from, to, status } = data
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
      formRef.current.resetForm()
    }
  }

  const onEdit = (redirect: Redirect): void => {
    setEditMode(true)
    formRef.current.edit(redirect)
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
        formRef.current.resetForm()
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
    <WorkbenchContent type="default">
      <Stack
        flexDirection="column"
        spacing="spacingL"
        style={{ margin: '2rem 4px 3rem' }}
      >
        <Form formRef={formRef} onSubmit={submitForm} editMode={editMode} />
        {redirects && (
          <Table data={redirects} onEdit={onEdit} onDelete={onDelete} />
        )}
      </Stack>
    </WorkbenchContent>
  )
}

export default Field
