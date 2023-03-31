import { ReactElement, useRef } from 'react'
import { Redirect } from '../../types'
import Form from '../Form'
import ConfirmationModal from './ConfirmationModal'

type ConfirmAddModalProps = {
  isShown: boolean
  onClose: (data: Redirect) => void
  redirect?: Redirect
}

const ConfirmAddModal = ({
  isShown,
  onClose,
  redirect,
}: ConfirmAddModalProps): ReactElement => {
  const formRef = useRef<any>()

  const onCloseIntercept = (confirm: boolean): void => {
    const data = confirm ? formRef.current.getFormData() : undefined
    onClose(data)
  }

  return (
    <ConfirmationModal
      isShown={isShown}
      onClose={onCloseIntercept}
      title="Add new redirect"
      intent="primary"
    >
      <Form formRef={formRef} redirect={redirect} />
    </ConfirmationModal>
  )
}

export default ConfirmAddModal
