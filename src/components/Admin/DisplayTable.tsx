import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./Title";
import { IUser } from "../../interfaces/IUser";
import { Fragment, useState } from "react";
import { CssBaseline } from "@mui/material";
import { memo } from "react";

type DisplayTableProps = {
  title: string;
  users: IUser[];
  button?: boolean;
  buttonTitle?: string;
  approveRequest: (value: string) => void;
};

function DisplayTable(props: DisplayTableProps) {
  const [more, setMore] = useState<boolean>(false);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    setMore(!more);
  }

  const users =
    props.users &&
    (more
      ? props.users
      : props.users.filter((user: IUser, index: number) => index < 5));

  return (
    <Fragment>
      <Title>{props.title}</Title>
      <CssBaseline />
      <Table size="small">
        <TableHead>
          <TableRow key={Math.random()}>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user: IUser, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.status}</TableCell>
                {props.button && (
                  <TableCell>
                    <Button
                      onClick={() => {
                        props.approveRequest(user.email!);
                      }}
                    >
                      {props.buttonTitle}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link href="#" onClick={preventDefault}>
        {!more ? "See more orders" : "See less orders"}
      </Link>
    </Fragment>
  );
}

export default memo(DisplayTable);
