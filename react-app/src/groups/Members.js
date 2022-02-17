import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState(null);
  const [addingMember, setAddingMember] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/groups/4/members')
      .then(res => setMembers(res.data));
  }, [setMembers]);

  const onNewMemberEmailChange = useCallback((e) => {
    setNewMemberEmail(e.target.value);
  }, [setNewMemberEmail]);

  const onAddNewMember = useCallback(() => {
    setAddingMember(true);
    axios
      .post('/api/groups/4/add_member_by_email', { email: newMemberEmail })
      .then((res) => {
        const { oper = {} } = res.data;
        const { status, error } = oper;
        if (status) {
          setNewMemberEmail('');
          axios
            .get('/api/groups/4/members')
            .then(res => setMembers(res.data))
          ;
        } else {
          setError(error);
        }
        setAddingMember(false);
      })
    ;
  }, [newMemberEmail, setAddingMember, setMembers, setNewMemberEmail, setError]);

  const onRemoveMember = useCallback((userPk) => {
    axios
      .post('/api/groups/4/remove_members', { memberPks: [userPk] })
      .then((res) => {
        const { oper = {} } = res.data;
        const { status, error } = oper;
        if (status) {
          axios
            .get('/api/groups/4/members')
            .then(res => setMembers(res.data))
          ;
        } else {
          setError(error);
        }
        setAddingMember(false);
      })
    ;
  }, [setAddingMember, setMembers, setError]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>
      )}
      <Grid container mb={1} alignItems="center" justifyContent="flex-start" direction="row">
        <Grid item mr={1}>
          <Input
            placeholder="Email address"
            style={{ minWidth: '320px' }}
            value={newMemberEmail}
            onChange={onNewMemberEmailChange}
          />
        </Grid>
        <Grid item>
        <LoadingButton loading={addingMember} variant="outlined" onClick={onAddNewMember}>
          Add Member
        </LoadingButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="members listing" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Operation</TableCell>
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
                <TableCell>
                  <Tooltip title="Remove member">
                    <IconButton
                      color="error"
                      aria-label="remove member"
                      component="span"
                      onClick={() => {
                        onRemoveMember(pk);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Members;
