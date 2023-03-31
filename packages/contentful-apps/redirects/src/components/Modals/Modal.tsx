import { ModalConfirm } from '@contentful/f36-components'
import { ReactNode } from 'react'

export type ModalProps = {
  onClose: (confirm: boolean) => void
  isShown: boolean
  title?: string
  children?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  intent?: 'primary' | 'positive' | 'negative'
  size?: 'small' | 'medium' | 'large' | 'fullWidth' | 'zen'
}

const Modal = ({
  isShown,
  onClose,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  intent = 'negative',
  size = 'large',
}: ModalProps) => (
  <ModalConfirm
    title={title}
    intent={intent}
    isShown={isShown}
    onCancel={() => onClose(false)}
    onConfirm={() => onClose(true)}
    confirmLabel={confirmLabel}
    cancelLabel={cancelLabel}
    size={size}
  >
    {children}
  </ModalConfirm>
)

export default Modal
