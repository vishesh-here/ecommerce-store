import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 8,
});

const CartItem = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sm={2}>
          <Box sx={{ height: 80 }}>
            <ProductImage src={item.imageUrl} alt={item.name} />
          </Box>
        </Grid>

        <Grid item xs={8} sm={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {item.name}
          </Typography>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6} sm={2}>
          <Select
            value={item.quantity}
            onChange={handleQuantityChange}
            size="small"
            sx={{ minWidth: 60 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4} sm={2}>
          <Typography variant="subtitle1">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={2} sm={2}>
          <IconButton
            edge="end"
            color="error"
            onClick={handleRemove}
            sx={{ '&:hover': { backgroundColor: 'error.lighter' } }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;