import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Slider,
  FormControlLabel,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Pagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: [0, 1000],
    brands: [],
    sortBy: 'newest',
  });
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with API calls
  const categories = [
    'All Categories',
    'Fashion',
    'Electronics',
    'Home & Living',
    'Accessories',
  ];

  const brands = [
    'Brand A',
    'Brand B',
    'Brand C',
    'Brand D',
  ];

  useEffect(() => {
    // Fetch products based on filters
    const fetchProducts = async () => {
      setLoading(true);
      // Implement API call here
      // For now, using setTimeout to simulate API call
      setTimeout(() => {
        setProducts([
          {
            id: 1,
            name: 'Premium Leather Watch',
            price: 299.99,
            imageUrl: '/images/products/watch.jpg',
            rating: 4.5,
          },
          // Add more products...
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, [filters, page, searchQuery]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setPage(1);
  };

  const handlePriceChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, priceRange: newValue }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleAddToCart = (productId) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', productId);
  };

  const handleToggleWishlist = (productId) => {
    // Implement wishlist toggle functionality
    console.log('Toggling wishlist:', productId);
  };

  const FilterDrawer = (
    <Box sx={{ width: 250, p: 3 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            selected={filters.category === category}
            onClick={() => handleFilterChange('category', category)}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">$0</Typography>
          <Typography variant="body2">$1000</Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Brands
      </Typography>
      <List>
        {brands.map((brand) => (
          <ListItem key={brand} dense>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
              }
              label={brand}
            />
          </ListItem>
        ))}
      </List>

      {isMobile && (
        <Button
          variant="contained"
          fullWidth
          onClick={() => setDrawerOpen(false)}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {!isMobile ? (
          <Box sx={{ width: 250 }}>{FilterDrawer}</Box>
        ) : (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {FilterDrawer}
          </Drawer>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              {filters.category || 'All Products'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setDrawerOpen(true)}
                >
                  Filters
                </Button>
              )}
              <TextField
                placeholder="Search products..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard
                      {...product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 4,
                }}
              >
                <Pagination
                  count={10}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;