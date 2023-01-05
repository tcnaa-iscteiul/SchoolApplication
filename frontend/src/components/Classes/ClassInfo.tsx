import Title from '../Admin/Title'
import { CssBaseline, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Fragment, memo } from 'react'
type Evaluation = {
  date: Date
  grade: number
}

type PropsInput = {
  evaluations?: Evaluation
  className: string
  classId: string
  startDate: Date
  endDate: Date
  teacher?: string
}

function ClassInfo(props: PropsInput) {
  return (
    <Fragment>
      <Title>{props.className}</Title>
      <CssBaseline />
      <Table size="small" key={Math.random()}>
        <TableHead>
          <TableRow key={Math.random()}>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            {props.teacher && <TableCell>Teacher</TableCell>}
            {props.evaluations !== undefined && <TableCell>Evaluation Date</TableCell>}
            {props.evaluations !== undefined && <TableCell>Grade</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={props.classId}>
            <TableCell>{props.startDate.toString().split('T')[0]}</TableCell>
            <TableCell>{props.endDate.toString().split('T')[0]}</TableCell>
            {props.teacher && <TableCell>{props.teacher}</TableCell>}
            {props.evaluations !== undefined && (
              <TableCell>
                {props.evaluations.date ? props.evaluations.date.toString().split('T')[0] : ''}
              </TableCell>
            )}
            {props.evaluations !== undefined && (
              <TableCell>
                {props.evaluations.grade !== undefined ? props.evaluations.grade : ''}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </Fragment>
  )
}

export default memo(ClassInfo)
