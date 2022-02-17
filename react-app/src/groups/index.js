import { useLocation, Link, Routes, Route, Navigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import { pink, green } from '@mui/material/colors';
import Info from './Info';
import Fund from './Fund';
import Members from './Members';

const sideBarWidth = 240;

const GroupItems = [
  { name: 'Info', path: 'info', icon: <InfoIcon color="info" /> },
  { name: 'Fund', path: 'fund', icon: <AccountBalanceIcon sx={{ color: pink[500] }} /> },
  { name: 'Members', path: 'members', icon: <PeopleIcon sx={{ color: green[500] }} /> }
];

const Groups = () => {
  const { pathname } = useLocation();
  const lastPath = pathname?.split('/')?.pop();

  return (
    <Grid
      container
      direction="row"
      alignContent="flex-start"
      justifyContent="flex-start"
    >
      <Grid
        item
        sx={{
          width: { md: sideBarWidth }
        }}
        ml={-2}
      >
        <List>
          {GroupItems.map(({ name, icon, path }) => (
            <Link key={path} to={path} style={{ textDecoration:"none", color: 'inherit' }}>
              <ListItem button key={name} selected={lastPath === path} >
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  sx={{
                    display: { xs: 'none', sm: 'none', md: 'block' },
                    marginLeft: '16px'
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid
        item
        sx={{
          width: { xs: `calc(100% - 40px)`, sm: `calc(100% - 40px)`, md: `calc(100% - ${sideBarWidth}px)` },
          paddingLeft: '8px',
          paddingTop: 2
        }}
      >
        <Routes>
          <Route exact path="/" element={<Navigate to="/groups/info" />}/>
          <Route path="info" element={<Info />}/>
          <Route path="fund" element={<Fund />}/>
          <Route path="members" element={<Members />}/>
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Groups;
