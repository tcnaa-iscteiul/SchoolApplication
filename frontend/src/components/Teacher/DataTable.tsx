import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';

type PropsType = {
  title: string;
  data: any;
};

function DataTable({ title, data }: PropsType) {
  const headers = Object.keys(data[0]);

  return (
    <Paper>
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>

      <hr />

      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((emp: any, index: string) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell align="right">{emp[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.defaultProps = {
  title: 'No Title',
};

export default DataTable;
