import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { ILesson } from '../../interfaces/ILesson';
import { StudentInformation } from '../../interfaces/IStudentInformation';

type PropsType = {
  title: string;
  data: ILesson;
};
function DataStudentsTable({ title, data }: PropsType) {
  console.log(data.students);
  return (
    <Paper>
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>{data.date!.toString().split('T')[0]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Summary</TableCell>
            <TableCell>{data.summary!}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Class Work</TableCell>
            <TableCell>{data.classWork!}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Presence</TableCell>
              <TableCell>Absence</TableCell>
              <TableCell>Class Work</TableCell>
            </TableRow>
            {data.students.map((item: StudentInformation) => (
              <TableRow key={item.studentName.id!}>
                <TableCell>
                  {item.studentName.firstName} {item.studentName.lastName}
                </TableCell>
                <TableCell>{item.studentName.email}</TableCell>
                <TableCell>{item.presence.toString()}</TableCell>
                <TableCell>{item.absence}</TableCell>
                <TableCell>{item.submmitedClassWork!}</TableCell>
              </TableRow>
            ))}
          </TableHead>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default DataStudentsTable;
