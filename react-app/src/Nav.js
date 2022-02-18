import React, { useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import appRedux from './redux/app';

const menuItems = [
  { name: 'Profile', path: '/' },
  { name: 'Logout', path: '/logout' }
];

const Nav = () => {
  const activeGroup = useSelector(state => state.app.context?.activeGroup);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (path) => {
    setAnchorElUser(null);
    if (path === '/logout') {
      axios
        .get('/logout')
        .then(() => dispatch(appRedux.actions.setIsUserAuthenticated(false)))
        .catch(() => dispatch(appRedux.actions.setIsUserAuthenticated(false)))
      ;
    }
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar disableGutters>
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  sx={{
                    marginRight: { xs: '24px', sm: '24px', md: '16px' },
                  }}
                >
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <HomeIcon color="primary" />
                  </Link>
                </Grid>
                <Grid item>
                  <Button variant="outlined" style={{ textTransform: "none" }}>
                    <Link to="/groups" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {`${activeGroup?.name} (${activeGroup?.position})`}
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 0 }} mr={1}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/uploads/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {menuItems.map(({ path, name }) => (
                    <MenuItem key={path} onClick={() => handleCloseUserMenu(path)}>
                      <Link to={path} style={{ textDecoration:"none", color: 'inherit' }}>
                        <Typography textAlign="center">{name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
