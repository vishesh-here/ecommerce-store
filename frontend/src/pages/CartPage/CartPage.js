import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import AddressModal from '../../components/AddressModal/AddressModal';
import { clearCart } from '../../store/slices/cartSlice';

const CartPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const shippingCost = cartTotal > 100 ? 0 : 10; // Free shipping over $100
  const finalTotal = cartTotal + shippingCost;

  const handleProceedToCheckout = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressSelected = (address) => {
    setIsAddressModalOpen(false);
    navigate('/checkout', { 
      state: { 
        address,
        cartTotal,
        shippingCost,
        finalTotal
      } 
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add some products to your cart and they will appear here
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: isMobile ? 2 : 0 }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Paper>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              sx={{ mr: 2 }}
            >
              Clear Cart
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>${cartTotal.toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleProceedToCheckout}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <AddressModal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSelected}
      />
    </Container>
  );
};

export default CartPage;