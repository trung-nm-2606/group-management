import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue, green } from '@mui/material/colors';
import appRedux from '../redux/app';

const Info = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);
  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState(null);
  const [error, setError] = useState(null);
  const [gettingGroupInfo, setGettingGroupInfo] = useState(true);
  const [open, setOpen] = useState(false);

  const getGroupInfo = useCallback((groupPk) => {
    if (!groupPk || groupPk < 0) {
      setGettingGroupInfo(false);
      setError('Cannot get group info');
      setGroupInfo(null);
    }

    setGettingGroupInfo(true);
    setError(null);
    setGroupInfo(null);
    axios
      .get(`/api/groups/${groupPk}/info`)
      .then((res) => {
        const data = res.data;
        if (!data || +data.pk !== +groupPk) {
          setGroupInfo(null);
          setError('Cannot get group info');
        } else {
          setGroupInfo(res.data);
          setError(null);
        }
        setGettingGroupInfo(false);
      })
      .catch(() => {
        setError('Cannot get group info');
        setGroupInfo(null);
        setGettingGroupInfo(false);
      });
    ;
  }, []);

  useEffect(() => {
    getGroupInfo(activeGroup?.pk);
  }, [activeGroup, getGroupInfo]);

  const handleClose = () => {
    setOpen(true);
  };

  const handleListItemClick = (value) => {
    setOpen(false);
    axios
      .post(`/api/groups/${value}/set-active`)
      .then((res) => {
        const { oper, activeGroup } = res.data;
        if (oper?.status) {
          dispatch(appRedux.actions.setActiveGroup(activeGroup));
        }
      })
      .catch(() => {})
    ;
  };

  if (error) {
    return (
      <>
        <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>
        <Button onClick={() => getGroupInfo(activeGroup?.pk)}>Retry Getting Info</Button>
      </>
    );
  }

  if (gettingGroupInfo) {
    return 'Getting info...';
  }

  return (
    <>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Current active group
              </Typography>
              <Typography variant="h5" component="div">
                {activeGroup?.name} {`(${activeGroup?.position})`}
              </Typography>
              <Typography color="text.secondary" variant="caption" component="div">
                {activeGroup?.desc}
              </Typography>
              <Typography color="primary" variant="caption" component="div">
                <Link to="/groups/members" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {`(${groupInfo.numberOfMembers} members)`}
                </Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                style={{ textTransform: "none" }}
                onClick={() => setOpen(true)}
              >Change group</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Fund information
              </Typography>
              <Typography variant="h5" component="div">
                2,000,000 VND
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="primary" variant="caption" component="div">
                <Link to="/groups/deposit" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {`(${groupInfo.numberOfFundItems} fund items)`}
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select active group</DialogTitle>
        <List sx={{ pt: 0 }}>
          {(groupInfo?.groups || []).map(({ pk, name, position }) => (
            <ListItem button onClick={() => handleListItemClick(pk)} key={pk}>
              <ListItemAvatar>
                <Avatar sx={{
                  bgcolor: pk === activeGroup?.pk ? green[100] : blue[100],
                  color: pk === activeGroup?.pk ? green[600] : blue[600]
                }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ color: pk === activeGroup?.pk ? green[600] : 'inherit' }} primary={name} secondary={`(${position})`} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default Info;
