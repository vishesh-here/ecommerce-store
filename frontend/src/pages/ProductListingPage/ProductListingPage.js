import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  IconButton,
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilters from './components/ProductFilters';
import ProductSort from './components/ProductSort';
import { fetchProducts } from '../../store/slices/productSlice';

const ITEMS_PER_PAGE = 12;

const ProductListingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  const initialSearch = queryParams.get('search') || '';
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const initialSort = queryParams.get('sort') || 'newest';

  // Local state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: initialCategory,
    priceRange: [0, 1000],
    ratings: [],
    brands: [],
  });
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSort);

  // Redux state
  const {
    items: products,
    status,
    error,
    total,
  } = useSelector((state) => state.products);

  // Effect to fetch products when filters, sort, or page changes
  useEffect(() => {
    const fetchData = () => {
      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sort: sortBy,
        search: initialSearch,
        ...filters,
      };
      dispatch(fetchProducts(params));

      // Update URL with current filters
      const searchParams = new URLSearchParams();
      if (filters.category) searchParams.set('category', filters.category);
      if (initialSearch) searchParams.set('search', initialSearch);
      if (currentPage > 1) searchParams.set('page', currentPage.toString());
      if (sortBy !== 'newest') searchParams.set('sort', sortBy);
      
      const newUrl = `${location.pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ''
      }`;
      navigate(newUrl, { replace: true });
    };

    fetchData();
  }, [dispatch, filters, sortBy, currentPage, initialSearch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {filters.category ? filters.category : 'All Products'}
          </Typography>
          {isMobile && (
            <IconButton onClick={toggleMobileFilters}>
              <FilterListIcon />
            </IconButton>
          )}
        </Box>
        {initialSearch && (
          <Typography variant="body1" color="text.secondary">
            Search results for: "{initialSearch}"
          </Typography>
        )}
      </Box>

      <Grid container spacing={4}>
        {/* Filters - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3} lg={2}>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Grid>
        )}

        {/* Product Grid */}
        <Grid item xs={12} md={9} lg={10}>
          {/* Sort Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography>
              {total} Products found
            </Typography>
            <ProductSort value={sortBy} onChange={handleSortChange} />
          </Box>

          {status === 'loading' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : status === 'failed' ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={() => dispatch(fetchProducts(filters))}
              >
                Try Again
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {total > ITEMS_PER_PAGE && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={Math.ceil(total / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setMobileFiltersOpen(false)}
            isMobile
          />
        </Box>
      </Drawer>
    </Container>
  );
};

export default ProductListingPage;