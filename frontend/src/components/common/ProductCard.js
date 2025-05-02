import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
} from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart } from '@mui/icons-material';

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  rating,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={name}
        sx={{
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={handleProductClick}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            cursor: 'pointer',
          }}
          onClick={handleProductClick}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(id)}
          fullWidth
          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>
        <IconButton
          color="secondary"
          onClick={() => onToggleWishlist(id)}
          sx={{
            border: 1,
            borderColor: 'secondary.main',
          }}
        >
          {isWishlisted ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;