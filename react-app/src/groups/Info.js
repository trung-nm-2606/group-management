import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Info = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);

  return (
    <>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Current active group
              </Typography>
              <Typography variant="h5" component="div">
                {activeGroup?.name} {`(${activeGroup?.position})`}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="primary">
                <Link to="/groups/members" style={{ textDecoration: 'none', color: 'inherit' }}>(2 member)</Link>
              </Typography>
              <Typography variant="body2">
                {activeGroup?.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" style={{ textTransform: "none" }}>Change current active group</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: 170 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Fund information
              </Typography>
              <Typography variant="h5" component="div">
                2,000,000 VND
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="primary">
                <Link to="/groups/deposit" style={{ textDecoration: 'none', color: 'inherit' }}>(5 fund items)</Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"style={{ textTransform: "none" }}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: 170 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                {'be{bull}nev{bull}o{bull}lent'}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"style={{ textTransform: "none" }}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Info;
