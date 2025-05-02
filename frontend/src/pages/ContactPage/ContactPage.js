import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .required('Subject is required')
    .min(4, 'Subject must be at least 4 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

const ContactInfo = ({ icon: Icon, title, content }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    <Icon color="primary" sx={{ mr: 2 }} />
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </Box>
  </Box>
);

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Here you would typically make an API call to send the message
        console.log('Form submitted:', values);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSnackbar({
          open: true,
          message: 'Message sent successfully! We will get back to you soon.',
          severity: 'success',
        });
        resetForm();
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again.',
          severity: 'error',
        });
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 6 }}
      >
        Have questions? We'd love to hear from you. Send us a message and we'll
        respond as soon as possible.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Send us a Message
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={formik.isSubmitting}
                    fullWidth={isMobile}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            
            <ContactInfo
              icon={PhoneIcon}
              title="Phone"
              content={
                <>
                  +1 (555) 123-4567
                  <br />
                  +1 (555) 765-4321
                </>
              }
            />
            
            <ContactInfo
              icon={EmailIcon}
              title="Email"
              content={
                <>
                  support@luxestore.com
                  <br />
                  info@luxestore.com
                </>
              }
            />
            
            <ContactInfo
              icon={LocationIcon}
              title="Address"
              content={
                <>
                  123 Luxury Avenue
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </>
              }
            />
            
            <ContactInfo
              icon={TimeIcon}
              title="Business Hours"
              content={
                <>
                  Monday - Friday: 9:00 AM - 8:00 PM
                  <br />
                  Saturday: 10:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </>
              }
            />
          </Paper>

          {/* Map */}
          <Paper sx={{ mt: 3, p: 2 }}>
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645004417867!5m2!1sen!2s"
              sx={{
                border: 0,
                width: '100%',
                height: '250px',
                borderRadius: 1,
              }}
              allowFullScreen
              loading="lazy"
            />
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;