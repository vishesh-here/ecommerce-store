import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  IconButton,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Leather Watch',
      price: 299.99,
      quantity: 1,
      image: '/images/products/watch.jpg',
    },
    // Add more items...
  ]);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123 Main St, Apt 4B, New York, NY 10001',
    },
    {
      id: 2,
      name: 'Office',
      address: '456 Business Ave, Suite 200, New York, NY 10002',
    },
  ]);

  const handleQuantityChange = (itemId, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return 10.00; // Fixed shipping cost for now
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setAddressDialogOpen(true);
  };

  const handleAddressSelect = () => {
    setAddressDialogOpen(false);
    if (selectedAddress) {
      navigate('/checkout', {
        state: {
          items: cartItems,
          address: addresses.find((addr) => addr.id === selectedAddress),
          total: calculateTotal(),
        },
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={4}>
                      <Typography variant="subtitle1" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Unit Price: ${item.price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                          sx={{ width: 60, mx: 1 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography variant="subtitle1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Order Summary */}
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
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">
                    ${calculateSubtotal().toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">
                    ${calculateShipping().toFixed(2)}
                  </Typography>
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
                  <Typography variant="h6">
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<LocalShipping />}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Address Selection Dialog */}
      <Dialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select Delivery Address</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {addresses.map((address) => (
                <FormControlLabel
                  key={address.id}
                  value={address.id}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1">{address.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.address}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/profile?tab=addresses')}
            sx={{ mt: 2 }}
          >
            + Add New Address
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddressSelect}
            variant="contained"
            disabled={!selectedAddress}
          >
            Deliver to this Address
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;