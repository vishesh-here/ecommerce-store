import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingBag as ShoppingIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  LocalShipping as OrdersIcon,
  ContactSupport as ContactIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const SideNav = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/');
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 280 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          LUXE STORE
        </Typography>
        {isAuthenticated && user && (
          <Typography variant="body2" color="text.secondary">
            Welcome, {user.name}
          </Typography>
        )}
      </Box>

      <Divider />

      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/products')}>
          <ListItemIcon>
            <ShoppingIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/wishlist')}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/cart')}>
          <ListItemIcon>
            <CartIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>

        {isAuthenticated && (
          <>
            <ListItem button onClick={() => handleNavigation('/profile')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation('/orders')}>
              <ListItemIcon>
                <OrdersIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
          </>
        )}

        <ListItem button onClick={() => handleNavigation('/contact')}>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SideNav;