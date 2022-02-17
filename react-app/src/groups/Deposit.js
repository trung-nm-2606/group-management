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
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Deposit = () => {
  const [fundItems, setFundItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/fund/4/items')
      .then(res => setFundItems(res.data));
  }, [setFundItems]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>
      )}
      <Grid container mb={1}>
        <Grid item>
          <Link style={{ textDecoration:"none", color: 'inherit' }} to={`/groups/deposit/new-fund-item`}>
          <Button variant="outlined" startIcon={<AddIcon />}>
            New Fund
          </Button>
          </Link>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="members listing" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price per Member</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundItems.map(({ pk, name, pricePerMember, status, createdAt, updatedAt }, index) => (
              <TableRow
                key={`${pk}_${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{pricePerMember}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{(new Date(createdAt)).toLocaleString()}</TableCell>
                <TableCell>{(new Date(updatedAt)).toLocaleString()}</TableCell>
                <TableCell>
                  <Link style={{ textDecoration:"none", color: 'inherit' }} to={`/groups/deposit/${pk}`}>
                    <Tooltip title="View fund item">
                      <IconButton
                        color="info"
                        aria-label="view fund item"
                        component="span"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Deposit;
