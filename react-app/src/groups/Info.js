import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Info = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);
  const [groupInfo, setGroupInfo] = useState(null);
  const [error, setError] = useState(null);
  const [gettingGroupInfo, setGettingGroupInfo] = useState(true);

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
    getGroupInfo(activeGroup.pk);
  }, [activeGroup, getGroupInfo]);

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
              <Button size="small" style={{ textTransform: "none" }}>Change group</Button>
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
    </>
  );
};

export default Info;
