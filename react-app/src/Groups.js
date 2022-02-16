import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const sideBarWidth = 240;

const GroupItems = [
  { name: 'Fund', icon: <AccountBalanceIcon /> },
  { name: 'Members', icon: <PeopleIcon /> }
];

const Groups = () => (
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
        {GroupItems.map((item, index) => (
          <ListItem button key={item.name} selected={index % 2 === 0} >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'block' },
                marginLeft: '16px'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
    <Grid
      item
      sx={{
        width: { xs: `calc(100% - 40px)`, sm: `calc(100% - 40px)`, md: `calc(100% - ${sideBarWidth}px)` },
        paddingLeft: '8px'
      }}
    >
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
        sapien faucibus et molestie ac.
      </Typography>
    </Grid>
  </Grid>
);

export default Groups;
