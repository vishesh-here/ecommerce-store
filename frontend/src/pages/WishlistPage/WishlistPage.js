import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Share as ShareIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';

const WishlistItem = ({ item, onShare, onMoveToCart, onRemove }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sm={2}>
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: theme.shape.borderRadius,
            }}
          />
        </Grid>

        <Grid item xs={8} sm={4}>
          <Typography variant="subtitle1" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
        </Grid>

        {!isMobile && (
          <Grid item sm={3}>
            <Typography variant="body2" color="text.secondary">
              Added on {new Date(item.addedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onShare(item)}
              sx={{ '&:hover': { color: theme.palette.primary.main } }}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onMoveToCart(item)}
              sx={{ '&:hover': { color: theme.palette.primary.main } }}
            >
              <CartIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onRemove(item)}
              sx={{ '&:hover': { color: theme.palette.error.main } }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const ShareDialog = ({ open, onClose, item }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleShare = () => {
    // Here you would typically make an API call to share the wishlist item
    console.log('Sharing item:', { item, email, message });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Wishlist Item</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Message (Optional)"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleShare}
          disabled={!email}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const [shareDialog, setShareDialog] = useState({
    open: false,
    item: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleShare = (item) => {
    setShareDialog({ open: true, item });
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(toggleWishlist(item));
    setSnackbar({
      open: true,
      message: 'Item moved to cart successfully!',
      severity: 'success',
    });
  };

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
    setSnackbar({
      open: true,
      message: 'Item removed from wishlist',
      severity: 'info',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your Wishlist is Empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Add items to your wishlist to save them for later.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          My Wishlist ({wishlistItems.length})
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Box>

      {wishlistItems.map((item) => (
        <WishlistItem
          key={item.id}
          item={item}
          onShare={handleShare}
          onMoveToCart={handleMoveToCart}
          onRemove={handleRemove}
        />
      ))}

      <ShareDialog
        open={shareDialog.open}
        onClose={() => setShareDialog({ open: false, item: null })}
        item={shareDialog.item}
      />

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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WishlistPage;