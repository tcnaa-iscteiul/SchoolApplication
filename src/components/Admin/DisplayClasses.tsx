import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { IClass } from '../../interfaces/IClass';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { memo } from 'react';

function DisplayClasses() {
    const [more, setMore] = useState<boolean>(false);
    const allClasses = useSelector((state: any) => state.classes.classes);//TODO: remove any

    function showMoreHandler(event: React.MouseEvent) {
        event.preventDefault();
        setMore(!more);
    }

    const classes = (more && allClasses) || (allClasses.filter((user: IClass, index: number) => index < 5));

    return (
        <React.Fragment>
            <Title>All Classes</Title>
            <Table size="small">
                <TableHead>
                    <TableRow key={Math.random()}>
                        <TableCell >Name</TableCell>
                        <TableCell  > Description</TableCell>
                        <TableCell  > Start Date</TableCell>
                        <TableCell  > End Date</TableCell>
                    </TableRow>
                </TableHead >
                <TableBody>
                    {classes.map((clas: IClass, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{clas.name}</TableCell>
                            <TableCell>{clas.description}</TableCell>
                            <TableCell>{clas.startDate.toString()}</TableCell>
                            <TableCell>{clas.endDate.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <Link color="primary" href="#" onClick={showMoreHandler} sx={{ mt: 3 }}>
                {!more ? 'See more orders' : 'See less orders'}
            </Link>
        </React.Fragment >
    );
}

export default memo(DisplayClasses);