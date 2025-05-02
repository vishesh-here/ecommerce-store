import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Tabs,
  Tab,
  Divider,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  Share,
  ShoppingCart,
  Remove,
  Add,
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductCard from '../components/common/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // Implement API call here
      // For now, using setTimeout to simulate API call
      setTimeout(() => {
        setProduct({
          id: 1,
          name: 'Premium Leather Watch',
          price: 299.99,
          description: 'Luxurious leather watch with premium features...',
          images: [
            '/images/products/watch-1.jpg',
            '/images/products/watch-2.jpg',
            '/images/products/watch-3.jpg',
          ],
          rating: 4.5,
          reviews: [
            {
              id: 1,
              user: 'John Doe',
              rating: 5,
              comment: 'Excellent quality and design!',
              date: '2023-05-15',
            },
            // Add more reviews...
          ],
          specifications: {
            Brand: 'Luxury Brand',
            Material: 'Genuine Leather',
            Movement: 'Swiss Automatic',
            'Water Resistance': '50m',
          },
          stock: 10,
          category: 'Watches',
        });
        setLoading(false);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    setSnackbar({
      open: true,
      message: 'Product added to cart successfully!',
      severity: 'success',
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setSnackbar({
      open: true,
      message: isWishlisted
        ? 'Product removed from wishlist'
        : 'Product added to wishlist',
      severity: 'success',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbar({
      open: true,
      message: 'Product link copied to clipboard!',
      severity: 'success',
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}
        >
          Products
        </Link>
        <Link
          color="inherit"
          href={`/products?category=${product.category}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/products?category=${product.category}`);
          }}
        >
          {product.category}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box
              component="img"
              src={product.images[selectedImage]}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Paper>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {product.images.map((image, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: index === selectedImage ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                }}
                onClick={() => setSelectedImage(index)}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                  }}
                />
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviews.length} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                size="small"
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 60, mx: 1 }}
              />
              <IconButton
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Add />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{ mr: 2 }}
            >
              Add to Cart
            </Button>

            <IconButton
              color="secondary"
              onClick={handleToggleWishlist}
              sx={{ mr: 1 }}
            >
              {isWishlisted ? <Favorite /> : <FavoriteBorder />}
            </IconButton>

            <IconButton onClick={handleShare}>
              <Share />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
          </Typography>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        {tabValue === 0 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {key}
                    </Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ mt: 3 }}>
            {product.reviews.map((review) => (
              <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ mr: 2 }}>
                    {review.user}
                  </Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {review.comment}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;