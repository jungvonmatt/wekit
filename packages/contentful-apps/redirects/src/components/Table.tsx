import {
  Box,
  formatDateAndTime,
  IconButton,
  Stack,
  Table as CTable,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
  Tooltip,
} from '@contentful/f36-components'
import { DeleteTrimmedIcon, EditTrimmedIcon } from '@contentful/f36-icons'
import tokens from '@contentful/f36-tokens'
import { css } from 'emotion'
import { Redirect } from './primitives/Redirect'

type TableProps = {
  data: Redirect[]
  onEdit: (redirect: Redirect) => void
  onDelete: (redirect: Redirect, index: number) => void
}

const containerStyle = css`
  height: 500px;
  padding: 1px;
  overflow-y: auto;
  width: 100%;
`

const tableStyle = css`
  table-layout: fixed;
`

const bodyStyle = css`
  tr:nth-child(even) td {
    background-color: ${tokens.gray200};
  }

  tr:hover td {
    background-color: ${tokens.blue100};
    cursor: default;
  }
`

const cellStyle = css`
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledCell = (props: TableCellProps) => (
  <TableCell className={cellStyle}>{props.children}</TableCell>
)

const Table = ({ data, onEdit, onDelete }: TableProps) => {
  return (
    <Box className={containerStyle}>
      <CTable className={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={bodyStyle}>
          {data.map((redirect, index) => {
            const { from, to, status, date } = redirect
            return (
              <TableRow key={`key-${index}`}>
                <StyledCell>{from}</StyledCell>
                <StyledCell>{to}</StyledCell>
                <TableCell style={{ textAlign: 'center' }}>{status}</TableCell>
                <StyledCell>{formatDateAndTime(date as number)}</StyledCell>
                <TableCell>
                  <Stack justifyContent="center">
                    <Tooltip content="Edit redirect">
                      <IconButton
                        variant="primary"
                        aria-label="Edit redirect"
                        icon={<EditTrimmedIcon size="tiny" />}
                        size="small"
                        onClick={() => onEdit(redirect)}
                      />
                    </Tooltip>
                    <Tooltip content="Delete redirect">
                      <IconButton
                        variant="negative"
                        aria-label="Delete redirect"
                        icon={<DeleteTrimmedIcon size="tiny" />}
                        size="small"
                        onClick={() => onDelete(redirect, index)}
                      />
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </CTable>
    </Box>
  )
}

export default Table
