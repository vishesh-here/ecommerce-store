import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 280,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: 'cover',
});

const WishlistButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <StyledCard>
      <WishlistButton onClick={handleToggleWishlist}>
        {isWishlisted ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </WishlistButton>
      
      <StyledCardMedia
        image={product.imageUrl}
        title={product.name}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.name}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          sx={{ mt: 'auto' }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;