import {
  useLocation,
  Link,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import { red, green, blue, teal } from '@mui/material/colors';
import Info from './Info';
import Deposit from './Deposit';
import Members from './Members';
import Withdrawal from './Withdrawal';
import FundItem from './FundItem';

const sideBarWidth = 240;

const GroupItems = [
  { name: 'Info', path: 'info', icon: <InfoIcon color="info" />, color: blue[700] },
  { name: 'Deposit', path: 'deposit', icon: <AccountBalanceWalletIcon sx={{ color: green[700] }} />, color: green[700] },
  { name: 'Withdrawal', path: 'withdrawal', icon: <AccountBalanceWalletIcon sx={{ color: red[500] }} />, color: red[500] },
  { name: 'Members', path: 'members', icon: <PeopleIcon sx={{ color: teal[700] }} />, color: teal[700] }
];

const Groups = () => {
  const { pathname } = useLocation();

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
          {GroupItems.map(({ name, icon, path, color }) => (
            <Link key={path} to={path} style={{ textDecoration:"none", color }}>
              <ListItem button key={name} selected={pathname?.includes(path)} >
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
          <Route exact path="info" element={<Info />}/>
          <Route exact path="deposit" element={<Deposit />}/>
          <Route exact path="deposit/:fundItemPk" element={<FundItem />}/>
          <Route exact path="withdrawal" element={<Withdrawal />}/>
          <Route exact path="members" element={<Members />}/>
          <Route exact path="/" element={<Navigate to="/groups/info" />}/>
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Groups;
