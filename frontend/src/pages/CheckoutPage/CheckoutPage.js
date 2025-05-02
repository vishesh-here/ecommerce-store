import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createOrder } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';

const steps = ['Review Order', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { address, cartTotal, shippingCost, finalTotal } = location.state || {};
  const cartItems = useSelector((state) => state.cart.items);
  
  const [activeStep, setActiveStep] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Redirect if no checkout data
  if (!address || !cartItems.length) {
    navigate('/cart');
    return null;
  }

  const handleNext = async () => {
    if (activeStep === 1) {
      // Process payment and create order
      try {
        const orderData = {
          items: cartItems,
          shippingAddress: address,
          total: finalTotal,
          transactionId,
        };
        
        const response = await dispatch(createOrder(orderData)).unwrap();
        setOrderId(response.orderId);
        dispatch(clearCart());
        setOrderComplete(true);
      } catch (error) {
        console.error('Order creation failed:', error);
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/cart');
    } else {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography>
                  {address.line1}
                  <br />
                  {address.line2 && (
                    <>
                      {address.line2}
                      <br />
                    </>
                  )}
                  {`${address.city}, ${address.state} ${address.pinCode}`}
                </Typography>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{ width: '100%', borderRadius: 8 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <Typography>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Grid item>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>${cartTotal.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Grid item>
                      <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        ${finalTotal.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please complete the payment using your preferred method and enter the
              transaction ID below.
            </Typography>
            <TextField
              fullWidth
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          </Paper>
        );

      case 2:
        return (
          <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 64, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Your order has been placed successfully.
              {orderId && (
                <>
                  <br />
                  Order ID: {orderId}
                </>
              )}
            </Typography>
            <Button
              variant="contained"
              onClick={handleFinish}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      {activeStep !== steps.length - 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            {activeStep === 0 ? 'Back to Cart' : 'Back'}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 1 && !transactionId}
          >
            {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      )}

      <Dialog open={orderComplete} onClose={handleFinish}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Your order has been placed successfully!
            {orderId && (
              <>
                <br />
                Order ID: {orderId}
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFinish} variant="contained">
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckoutPage;