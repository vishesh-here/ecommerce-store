import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Banner from '../components/common/Banner';
import CategoryCard from '../components/common/CategoryCard';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  // Sample data - replace with actual API calls
  const banners = [
    {
      title: 'Summer Collection 2023',
      description: 'Discover our latest summer collection with up to 40% off',
      imageUrl: '/images/banners/summer-collection.jpg',
      link: '/products?category=summer',
    },
    {
      title: 'Luxury Watches',
      description: 'Timeless elegance for the modern connoisseur',
      imageUrl: '/images/banners/luxury-watches.jpg',
      link: '/products?category=watches',
    },
  ];

  const categories = [
    {
      name: 'Fashion',
      slug: 'fashion',
      imageUrl: '/images/categories/fashion.jpg',
      productCount: 150,
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      imageUrl: '/images/categories/electronics.jpg',
      productCount: 200,
    },
    {
      name: 'Home & Living',
      slug: 'home-living',
      imageUrl: '/images/categories/home-living.jpg',
      productCount: 180,
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      imageUrl: '/images/categories/accessories.jpg',
      productCount: 120,
    },
  ];

  const hotProducts = [
    {
      id: 1,
      name: 'Premium Leather Watch',
      price: 299.99,
      imageUrl: '/images/products/watch.jpg',
      rating: 4.5,
    },
    // Add more products...
  ];

  const evergreenProducts = [
    {
      id: 2,
      name: 'Classic Sunglasses',
      price: 159.99,
      imageUrl: '/images/products/sunglasses.jpg',
      rating: 4.8,
    },
    // Add more products...
  ];

  const handleAddToCart = (productId) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', productId);
  };

  const handleToggleWishlist = (productId) => {
    // Implement wishlist toggle functionality
    console.log('Toggling wishlist:', productId);
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* Banner Carousel */}
      <Banner banners={banners} />

      <Container maxWidth="lg">
        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.slug}>
                <CategoryCard category={category} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Hot and New Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              What's Hot and New!
            </Typography>
            <Button
              component={RouterLink}
              to="/products?category=hot-and-new"
              variant="outlined"
              color="primary"
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {hotProducts.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Evergreen Products Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              What's Evergreen
            </Typography>
            <Button
              component={RouterLink}
              to="/products?category=evergreen"
              variant="outlined"
              color="primary"
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {evergreenProducts.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Collection */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': {
                    '& .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src="/images/featured/luxury-collection.jpg"
                  alt="Luxury Collection"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    transition: 'background-color 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    Luxury Collection
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Discover our exclusive luxury items
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/products?collection=luxury"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Shop Now
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': {
                    '& .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src="/images/featured/new-arrivals.jpg"
                  alt="New Arrivals"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    transition: 'background-color 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    New Arrivals
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Be the first to shop our latest additions
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/products?collection=new-arrivals"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Shop Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;