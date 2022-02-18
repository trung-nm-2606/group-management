import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Info = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);

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
                <Link to="/groups/members" style={{ textDecoration: 'none', color: 'inherit' }}>(2 member)</Link>
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
                <Link to="/groups/deposit" style={{ textDecoration: 'none', color: 'inherit' }}>(5 fund items)</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Info;
