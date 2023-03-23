import { ModalConfirm } from '@contentful/f36-components'

type ModalProps = {
  onClose: (confirm: boolean) => void
  isShown: boolean
  title: string
  children: any
  confirmLabel?: string
  cancelLabel?: string
}

const Modal = ({
  isShown,
  onClose,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ModalProps) => (
  <ModalConfirm
    title={title}
    intent="negative"
    isShown={isShown}
    onCancel={() => onClose(false)}
    onConfirm={() => onClose(true)}
    confirmLabel={confirmLabel}
    cancelLabel={cancelLabel}
  >
    {children}
  </ModalConfirm>
)

export default Modal
