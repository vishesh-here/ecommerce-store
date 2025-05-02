import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  Home,
  Category,
  Favorite,
  ContactSupport,
} from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
    { text: 'Wishlist', icon: <Favorite />, path: '/wishlist' },
    { text: 'Contact', icon: <ContactSupport />, path: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            LUXE STORE
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  sx={{ ml: 2 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleProfileMenuClose}>
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/orders" onClick={handleProfileMenuClose}>
          Orders
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      {/* Add toolbar spacing */}
      <Toolbar />
    </>
  );
};

export default Navbar;