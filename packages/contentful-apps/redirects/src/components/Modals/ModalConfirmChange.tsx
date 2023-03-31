import { Stack, Text } from '@contentful/f36-components'
import { Redirect } from '../../types'
import Modal from './Modal'

type ModalConfirmChangeProps = {
  isShown: boolean
  onClose: (confirm: boolean) => void
  redirect: Redirect
  oldRedirect: Redirect
}

const ModalConfirmChange = ({
  isShown,
  onClose,
  redirect,
  oldRedirect,
}: ModalConfirmChangeProps) => (
  <Modal
    isShown={isShown}
    onClose={onClose}
    title="Do you want to edit this redirect?"
  >
    <Stack flexDirection="column" alignItems="start" spacing="spacingL">
      <Stack flexDirection="column" alignItems="start" spacing="spacing2Xs">
        <Text>This redirect already exists:</Text>
        <Text fontWeight="fontWeightDemiBold">
          from: <Text>{oldRedirect.from}</Text>
        </Text>
      </Stack>
      <Stack flexDirection="column" alignItems="start" spacing="spacing2Xs">
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
      <Stack flexDirection="column" alignItems="start" spacing="spacing2Xs">
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

export default ModalConfirmChange
