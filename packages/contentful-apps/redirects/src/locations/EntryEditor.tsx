import { Button, ModalLauncher, Stack } from '@contentful/f36-components'
import { WorkbenchContent } from '@contentful/f36-workbench'
import { useFieldValue } from '@contentful/react-apps-toolkit'
import { ReactElement, useEffect } from 'react'
import {
  ConfirmAddEditModal,
  ConfirmDeleteModal,
  ConfirmOverwriteModal,
  Table,
} from '../components'
import { Redirect } from '../types'
import { arrayMove, countSlashes } from '../utils'

const Field = (): ReactElement => {
  const [redirects = [], setRedirects] = useFieldValue<Redirect[]>('redirects')

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

  /**
   * Find the position to add the new redirect using the '/' count
   * @param currentCount
   * @returns position
   */
  const findRedirectInsertIndex = (currentCount: number): number => {
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
    if (redirect.from.endsWith('/*')) {
      const slashCount = countSlashes(redirect.from)
      const index = findRedirectInsertIndex(slashCount)
      const tempArr = [...redirects]
      tempArr.splice(index, 0, redirect)
      setRedirects(tempArr)
    } else {
      setRedirects([redirect, ...redirects])
    }
  }

  const showConfirmAddEditModal = (redirect?: Redirect): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ConfirmAddEditModal
          isShown={isShown}
          onClose={onClose}
          redirect={redirect}
        />
      )
    }).then((result: Redirect) => {
      if (result) {
        const { from, to, status } = result
        const index = getRedirectIndex(from)
        const redirect = { from, to, status, date: Date.now() }

        const oldRedirect = redirects[index]
        // In case the 'from' url already exists, replace it with the new one
        if (
          index !== -1 &&
          (oldRedirect.to !== redirect.to ||
            oldRedirect.status !== redirect.status)
        ) {
          showConfirmOverwriteModal(redirect, oldRedirect, index)
        } else {
          addRedirect(redirect)
        }
      }
    })
  }

  const showConfirmOverwriteModal = (
    redirect: Redirect,
    oldRedirect: Redirect,
    index: number
  ): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ConfirmOverwriteModal
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
      }
    })
  }

  const showConfirmDeleteModal = (redirect: Redirect, index: number): void => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ConfirmDeleteModal
          redirect={redirect}
          isShown={isShown}
          onClose={onClose}
        />
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
        <Button
          variant="primary"
          type="button"
          onClick={() => showConfirmAddEditModal()}
          style={{ marginRight: 'auto' }}
        >
          Add
        </Button>
        {redirects.length > 0 && (
          <Table
            data={redirects}
            onEdit={showConfirmAddEditModal}
            onDelete={showConfirmDeleteModal}
          />
        )}
      </Stack>
    </WorkbenchContent>
  )
}

export default Field
