import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const statusColorMapping = {
  unpaid: 'error.main',
  paid: 'success.main'
};

const FundItem = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);
  const params = useParams();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeGroup?.pk) return;
    axios
      .get(`/api/fund/${activeGroup?.pk}/${params.fundItemPk}/transactions`)
      .then(res => setMembers(res.data));
  }, [activeGroup, params.fundItemPk, setMembers]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="members listing" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Paid Price</TableCell>
              <TableCell>Proof</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map(({ pk, name, fullName, paidPrice, status, proof }, index) => (
              <TableRow
                key={`${pk}_${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography component="span" display="block">
                    <Typography component="span" >{fullName}</Typography>
                    <Typography variant="caption" display="block" color="text.disabled">{`@${name}`}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="button"
                    component="span"
                    display="block"
                    color={statusColorMapping[status] || 'text.disabled'}
                  >
                    {status}
                  </Typography>
                </TableCell>
                <TableCell>{paidPrice}</TableCell>
                <TableCell>{proof}</TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FundItem;
