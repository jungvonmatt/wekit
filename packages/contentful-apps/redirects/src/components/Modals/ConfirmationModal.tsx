import { ModalConfirm } from '@contentful/f36-components'
import { ReactElement, ReactNode } from 'react'

export type ConfirmationModalProps = {
  onClose: (confirm: boolean) => void
  isShown: boolean
  title?: string
  children?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  intent?: 'primary' | 'positive' | 'negative'
  size?: 'small' | 'medium' | 'large' | 'fullWidth' | 'zen'
}

const ConfirmationModal = ({
  isShown,
  onClose,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  intent = 'negative',
  size = 'large',
}: ConfirmationModalProps): ReactElement => (
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

export default ConfirmationModal
