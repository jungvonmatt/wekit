import { ModalLauncher, Stack } from '@contentful/f36-components'
import { WorkbenchContent } from '@contentful/f36-workbench'
import { useFieldValue } from '@contentful/react-apps-toolkit'
import { useEffect, useRef, useState } from 'react'
import { Form, ModalDelete, ModalEdit, Table } from '../components'
import { Redirect } from '../types'
import { arrayMove, countSlashes } from '../Utils'

const Field = () => {
  const [redirects = [], setRedirects] = useFieldValue<Redirect[]>('redirects')
  const [editMode, setEditMode] = useState(false)
  const formRef = useRef<any>()

  useEffect(() => {
    // In case redirects is anything other than array resets it
    if (!Array.isArray(redirects)) setRedirects([])
  }, [redirects])

  const getRedirectIndex = (from: string): number => {
    return redirects.findIndex((redirect: Redirect) => redirect.from === from)
  }

  const removeRedirect = (index: number): void => {
    const tempArr = [...redirects]
    tempArr.splice(index, 1)
    setRedirects(tempArr)
  }

  // Find the position to add the new redirect using the '/' count
  const findArrayPosition = (currentCount: number): number => {
    for (let index = redirects.length - 1; index > 0; index--) {
      const count = countSlashes(redirects[index].from)
      if (currentCount <= count) {
        return index + 1
      }
    }
    return 0
  }

  const addRedirect = (redirect: Redirect): void => {
    // In case it uses Netlify wildcard adds the redirect in order at bottom
    if (redirect.from.endsWith('*')) {
      const slashCount = countSlashes(redirect.from)
      const index = findArrayPosition(slashCount)
      const tempArr = [...redirects]
      tempArr.splice(index, 0, redirect)
      setRedirects(tempArr)
    } else {
      setRedirects([redirect, ...redirects])
    }
  }

  const submitForm = (data: Redirect): void => {
    const { from, to, status } = data
    const index = getRedirectIndex(from)
    const redirect = { from, to, status, date: new Date().getTime() }

    const oldRedirect = redirects[index]
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

  // TODO add wildcard
  const showEditModal = (
    redirect: Redirect,
    oldRedirect: Redirect,
    index: number
  ): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ModalEdit
          redirect={redirect}
          oldRedirect={oldRedirect}
          isShown={isShown}
          onClose={onClose}
        />
      )
    }).then((result) => {
      if (result) {
        const tempArr = [...redirects]
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
        <ModalDelete redirect={redirect} isShown={isShown} onClose={onClose} />
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
        {redirects.length > 0 && (
          <Table data={redirects} onEdit={onEdit} onDelete={onDelete} />
        )}
      </Stack>
    </WorkbenchContent>
  )
}

export default Field
