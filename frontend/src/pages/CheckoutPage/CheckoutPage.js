import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
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
  
  const [activeStep, setActiveStep] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [transactionIdError, setTransactionIdError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);
  const checkoutData = location.state;
  const { address, cartTotal, shippingCost, finalTotal } = checkoutData || {};

  useEffect(() => {
    if (!checkoutData || !address || !cartItems.length) {
      navigate('/cart', { replace: true });
    }
  }, [checkoutData, address, cartItems, navigate]);

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '0.00';
    }
    return price.toFixed(2);
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-product.jpg';
    e.target.onerror = null;
  };

  const validateTransactionId = () => {
    if (!transactionId.trim()) {
      setTransactionIdError('Transaction ID is required');
      return false;
    }
    if (transactionId.length < 6) {
      setTransactionIdError('Transaction ID must be at least 6 characters');
      return false;
    }
    setTransactionIdError('');
    return true;
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      if (!validateTransactionId()) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const orderData = {
          items: cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name
          })),
          shippingAddress: address,
          total: Number(finalTotal.toFixed(2)),
          transactionId: transactionId.trim(),
          orderDate: new Date().toISOString()
        };
        
        const response = await dispatch(createOrder(orderData)).unwrap();
        setOrderId(response.orderId);
        dispatch(clearCart());
        setOrderComplete(true);
        setActiveStep((prevStep) => prevStep + 1);
      } catch (err) {
        setError(err.message || 'Failed to create order. Please try again.');
        console.error('Order creation failed:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
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
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">{address.line1}</Typography>
                  {address.line2 && (
                    <Typography variant="body1">{address.line2}</Typography>
                  )}
                  <Typography variant="body1">
                    {address.city}, {address.state} {address.pinCode}
                  </Typography>
                </Box>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <Box
                          component="img"
                          src={item.imageUrl}
                          alt={item.name}
                          onError={handleImageError}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 1,
                            display: 'block'
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: ${formatPrice(item.price)} each
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" align="right">
                          ${formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Grid>
                    </Grid>
                    {cartItems.indexOf(item) !== cartItems.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1">Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" align="right">
                        ${formatPrice(cartTotal)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">Shipping</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" align="right">
                        {shippingCost === 0 ? 'Free' : `$${formatPrice(shippingCost)}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="primary" align="right">
                        ${formatPrice(finalTotal)}
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
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Amount: ${formatPrice(finalTotal)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please complete the payment using your preferred payment method and enter
                the transaction ID below.
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => {
                setTransactionId(e.target.value);
                setTransactionIdError('');
              }}
              onBlur={validateTransactionId}
              error={!!transactionIdError}
              helperText={transactionIdError}
              disabled={loading}
              required
              sx={{ mb: 2 }}
              inputProps={{
                'aria-label': 'Transaction ID',
                'aria-required': 'true',
                'aria-invalid': !!transactionIdError,
              }}
            />

            {loading && (
              <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
          </Paper>
        );

      case 2:
        return (
          <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 64, mb: 2 }}
              aria-label="Order Success"
            />
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your order has been placed successfully.
            </Typography>
            {orderId && (
              <Typography variant="body1" sx={{ mb: 3 }}>
                Order ID: <strong>{orderId}</strong>
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You will receive an email confirmation shortly.
            </Typography>
            <Button
              variant="contained"
              onClick={handleFinish}
              aria-label="Continue Shopping"
            >
              Continue Shopping
            </Button>
          </Paper>
        );

      default:
        return null;
    }
  };

  if (!checkoutData) {
    return null;
  }

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
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
            disabled={loading}
            aria-label={activeStep === 0 ? 'Back to Cart' : 'Back'}
          >
            {activeStep === 0 ? 'Back to Cart' : 'Back'}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading || (activeStep === 1 && !transactionId.trim())}
            aria-label={activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              activeStep === steps.length - 2 ? 'Place Order' : 'Next'
            )}
          </Button>
        </Box>
      )}

      <Dialog 
        open={orderComplete} 
        onClose={handleFinish}
        aria-labelledby="order-confirmation-dialog"
      >
        <DialogTitle id="order-confirmation-dialog">
          Order Confirmation
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 48, mb: 2 }}
              aria-label="Order Success"
            />
            <Typography gutterBottom>
              Your order has been placed successfully!
            </Typography>
            {orderId && (
              <Typography variant="body2" color="text.secondary">
                Order ID: <strong>{orderId}</strong>
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleFinish} 
            variant="contained"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckoutPage;