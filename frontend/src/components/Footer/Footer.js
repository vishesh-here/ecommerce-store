import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const FooterSection = ({ title, children }) => (
  <Box sx={{ mb: { xs: 3, md: 0 } }}>
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontWeight: 600,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: 40,
          height: 2,
          backgroundColor: 'primary.main',
        },
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const SocialButton = ({ icon: Icon, href, label }) => {
  const theme = useTheme();
  
  return (
    <IconButton
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      sx={{
        color: 'grey.400',
        '&:hover': {
          color: 'primary.main',
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Icon />
    </IconButton>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to subscribe the email
    console.log('Newsletter subscription:', email);
    setSnackbar({
      open: true,
      message: 'Thank you for subscribing to our newsletter!',
      severity: 'success',
    });
    setEmail('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <FooterSection title="About LUXE STORE">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                LUXE STORE is your premier destination for luxury shopping.
                We offer a curated selection of high-end products with
                exceptional quality and service.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <SocialButton
                  icon={Facebook}
                  href="https://facebook.com"
                  label="Facebook"
                />
                <SocialButton
                  icon={Twitter}
                  href="https://twitter.com"
                  label="Twitter"
                />
                <SocialButton
                  icon={Instagram}
                  href="https://instagram.com"
                  label="Instagram"
                />
                <SocialButton
                  icon={LinkedIn}
                  href="https://linkedin.com"
                  label="LinkedIn"
                />
                <SocialButton
                  icon={YouTube}
                  href="https://youtube.com"
                  label="YouTube"
                />
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection title="Quick Links">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Link
                  component={RouterLink}
                  to="/products"
                  color="text.secondary"
                  underline="hover"
                >
                  Shop
                </Link>
                <Link
                  component={RouterLink}
                  to="/cart"
                  color="text.secondary"
                  underline="hover"
                >
                  Cart
                </Link>
                <Link
                  component={RouterLink}
                  to="/wishlist"
                  color="text.secondary"
                  underline="hover"
                >
                  Wishlist
                </Link>
                <Link
                  component={RouterLink}
                  to="/profile"
                  color="text.secondary"
                  underline="hover"
                >
                  My Account
                </Link>
                <Link
                  component={RouterLink}
                  to="/orders"
                  color="text.secondary"
                  underline="hover"
                >
                  Track Order
                </Link>
              </Box>
            </FooterSection>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection title="Customer Service">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Link
                  component={RouterLink}
                  to="/contact"
                  color="text.secondary"
                  underline="hover"
                >
                  Contact Us
                </Link>
                <Link
                  component={RouterLink}
                  to="/faq"
                  color="text.secondary"
                  underline="hover"
                >
                  FAQ
                </Link>
                <Link
                  component={RouterLink}
                  to="/shipping"
                  color="text.secondary"
                  underline="hover"
                >
                  Shipping Information
                </Link>
                <Link
                  component={RouterLink}
                  to="/returns"
                  color="text.secondary"
                  underline="hover"
                >
                  Returns & Exchanges
                </Link>
                <Link
                  component={RouterLink}
                  to="/privacy"
                  color="text.secondary"
                  underline="hover"
                >
                  Privacy Policy
                </Link>
              </Box>
            </FooterSection>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <FooterSection title="Newsletter">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Subscribe to our newsletter for exclusive offers and updates.
              </Typography>
              <form onSubmit={handleNewsletterSubmit}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!email}
                >
                  Subscribe
                </Button>
              </form>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                support@luxestore.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                123 Luxury Avenue, New York, NY 10001
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © {new Date().getFullYear()} LUXE STORE. All rights reserved.
        </Typography>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;