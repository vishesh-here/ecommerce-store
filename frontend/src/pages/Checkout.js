import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';

const steps = ['Review Order', 'Payment', 'Confirmation'];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [transactionId, setTransactionId] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Get cart items and address from location state
  const { items, address, total } = location.state || {
    items: [],
    address: null,
    total: 0,
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      // Process payment
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Generate random order ID
        const newOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(newOrderId);
        
        setActiveStep(activeStep + 1);
        setSuccessDialogOpen(true);
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFinish = () => {
    navigate('/');
  };

  const ReviewStep = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Delivery Address
          </Typography>
          <Typography variant="body1">{address.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {address.address}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 60, height: 60, mr: 2, borderRadius: 1 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Box sx={{ my: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>${(total - 10).toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography>Shipping</Typography>
              <Typography>$10.00</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  const PaymentStep = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label="UPI Payment"
              />
              <FormControlLabel
                value="netbanking"
                control={<Radio />}
                label="Net Banking"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              helperText="Enter the transaction ID from your payment"
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment Summary
          </Typography>
          <Typography variant="body1" gutterBottom>
            Amount to Pay: ${total.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please complete the payment and enter the transaction ID to proceed.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  const ConfirmationStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your order ID is: {orderId}
      </Typography>
      <Typography variant="body1" paragraph>
        We'll send you an email with the order details and tracking information.
      </Typography>
      <Button variant="contained" onClick={handleFinish}>
        Continue Shopping
      </Button>
    </Box>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <ReviewStep />}
      {activeStep === 1 && <PaymentStep />}
      {activeStep === 2 && <ConfirmationStep />}

      {activeStep !== 2 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            startIcon={activeStep === 1 && <PaymentIcon />}
            disabled={activeStep === 1 && !transactionId}
          >
            {activeStep === 1 ? 'Complete Payment' : 'Next'}
          </Button>
        </Box>
      )}

      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle>Order Confirmed!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully. Order ID: {orderId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;