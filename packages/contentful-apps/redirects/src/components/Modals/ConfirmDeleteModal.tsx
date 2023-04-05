import { Stack, Text } from '@contentful/f36-components'
import { ReactElement } from 'react'
import { Redirect } from '../../types'
import ConfirmationModal from './ConfirmationModal'

type ModalDeleteProps = {
  isShown: boolean
  onClose: (confirm: boolean) => void
  redirect: Redirect
}

const ModalDelete = ({
  isShown,
  onClose,
  redirect,
}: ModalDeleteProps): ReactElement => (
  <ConfirmationModal
    isShown={isShown}
    onClose={onClose}
    title="Delete this entry?"
    size="medium"
  >
    <Stack flexDirection="column" alignItems="start">
      <Stack flexDirection="column" alignItems="start" spacing="spacing2Xs">
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
  </ConfirmationModal>
)

export default ModalDelete
