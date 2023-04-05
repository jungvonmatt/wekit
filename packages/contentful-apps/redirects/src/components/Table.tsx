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
import { ReactElement } from 'react'
import { Redirect } from '../types'

type TableProps = {
  data: Redirect[]
  onEdit: (redirect: Redirect) => void
  onDelete: (redirect: Redirect, index: number) => void
}

const containerStyle = css`
  padding: 1px;
  width: 100%;
`

const tableStyle = css`
  table-layout: fixed;

  th:nth-child(3) {
    width: 5%;
  }

  th:nth-child(4) {
    width: 10%;
  }

  th:nth-child(5) {
    width: 120px;
  }
`

const bodyStyle = css`
  tr:nth-child(even) td {
    background-color: ${tokens.gray100};
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

const Table = ({ data, onEdit, onDelete }: TableProps): ReactElement => {
  return (
    <Box className={containerStyle}>
      <CTable className={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Date</TableCell>
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
                <TableCell style={{ textAlign: 'center' }}>
                  {formatDateAndTime(date as number, 'day')}
                </TableCell>
                <TableCell>
                  <Stack justifyContent="center">
                    <Tooltip content="Edit redirect" placement="top">
                      <IconButton
                        variant="primary"
                        aria-label="Edit redirect"
                        icon={<EditTrimmedIcon size="tiny" />}
                        size="small"
                        onClick={() => onEdit(redirect)}
                      />
                    </Tooltip>
                    <Tooltip content="Delete redirect" placement="top">
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
