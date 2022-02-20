import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Info = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    if (activeGroup && activeGroup.pk > 0) {
      axios
        .get(`/api/groups/${activeGroup.pk}/info`)
        .then((res) => {
          const data = res.data;
          if (!data || +data.pk !== +activeGroup.pk) {
            setGroupInfo(null);
          } else {
            setGroupInfo(res.data);
          }
        })
        .catch(() => setGroupInfo(null));
      ;
    }
  }, [activeGroup]);

  if (!groupInfo) {
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
