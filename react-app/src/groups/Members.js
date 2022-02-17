import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/groups/1/members')
      .then((res) => {
        console.log(res.data);
        setMembers(res.data);
      });
  }, [setMembers]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="members listing" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map(({ pk, name, fullName, email }, index) => (
            <TableRow
              key={`${pk}_${email}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
              <Typography component="span" display="block">
                <Typography component="span" >{fullName}</Typography>
                <Typography variant="caption" display="block" color="text.disabled">{`@${name}`}</Typography>
              </Typography>
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Members;
