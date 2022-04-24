import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PieChartIcon from '@mui/icons-material/PieChart';
import GroupIcon from '@mui/icons-material/Group';
import MainLogo from '../MainLogo/MainLogo';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

function DashboardLayout(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const items = [
        { name: 'کاربرگه‌ها', path: '/', icon: <PieChartIcon /> },
        { name: 'Link Number', path: '/Linknumber', icon: <GroupIcon /> },
        { name: 'Link Number1', path: '/LinkNumber1', icon: <InboxIcon /> },
        { name: 'Link Number2', path: '/LinkNumber2', icon: <InboxIcon /> },
        { name: 'Link Number3', path: '/LinkNumber3', icon: <InboxIcon /> },
        { name: 'Link Number4', path: '/LinkNumber4', icon: <InboxIcon /> }
    ];
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const drawer = (
        <div>
            <Toolbar>
                <NavLink to="/">
                    <MainLogo
                        sx={{
                            height: 42,
                            width: 42
                        }}
                    />
                </NavLink>
            </Toolbar>
            <Divider />
            <List>
                {items.map((text, index) => (
                    <ListItem button
                        key={text.name}
                        selected={selectedIndex === index}
                        onClick={(event) => {
                            navigate(text.path);
                            handleListItemClick(event, index)
                        }
                        }
                    >
                        <ListItemIcon>
                            {text.icon}
                        </ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Settings', 'Logout'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {/* Covid-tracker */}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: '#f1f4f7' }}
            >
                <Toolbar />

                {props.children}
            </Box>
        </Box>
    );
}
DashboardLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DashboardLayout;