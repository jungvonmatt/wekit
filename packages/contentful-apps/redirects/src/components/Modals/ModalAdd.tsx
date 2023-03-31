import { useRef } from 'react'
import { Redirect } from '../../types'
import Form from '../Form'
import Modal from './Modal'

type ModalAddProps = {
  isShown: boolean
  onClose: (data: Redirect) => void
  redirect?: Redirect
}

const ModalAdd = ({ isShown, onClose, redirect }: ModalAddProps) => {
  const formRef = useRef<any>()

  const onCloseIntercept = (confirm: boolean): void => {
    const data = confirm ? formRef.current.getFormData() : undefined
    onClose(data)
  }

  return (
    <Modal
      isShown={isShown}
      onClose={onCloseIntercept}
      title="Add new redirect"
      intent="primary"
    >
      <Form formRef={formRef} redirect={redirect} />
    </Modal>
  )
}

export default ModalAdd
