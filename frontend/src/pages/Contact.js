import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement contact form submission API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSnackbar({
        open: true,
        message: 'Message sent successfully! We will get back to you soon.',
        severity: 'success',
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 8 }}
      >
        Have questions? We'd love to hear from you. Send us a message and we'll
        respond as soon as possible.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <LocationOn sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">Our Location</Typography>
                    <Typography variant="body2">
                      123 Luxury Avenue, Fashion District
                      <br />
                      New York, NY 10001
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Phone sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">Phone</Typography>
                    <Typography variant="body2">+1 (555) 123-4567</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Email sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">Email</Typography>
                    <Typography variant="body2">support@luxestore.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <AccessTime sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">Working Hours</Typography>
                    <Typography variant="body2">
                      Monday - Friday: 9:00 AM - 8:00 PM
                      <br />
                      Saturday - Sunday: 10:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send us a Message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ minWidth: 150 }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;