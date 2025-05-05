import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import BannerCarousel from '../../components/BannerCarousel/BannerCarousel';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { fetchBanners } from '../../store/slices/bannerSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { fetchProducts } from '../../store/slices/productSlice';

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '60px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const banners = useSelector((state) => state.banners.items);
  const categories = useSelector((state) => state.categories.items);
  const products = useSelector((state) => state.products.items);
  const wishlistedProducts = useSelector((state) => state.wishlist.items);
  const pastOrders = useSelector((state) => state.orders.pastOrders);

  // Memoize filtered products
  const hotAndNewProducts = React.useMemo(() => 
    products.filter(p => p.category === 'hot-and-new'),
    [products]
  );

  const evergreenProducts = React.useMemo(() => 
    products.filter(p => p.category === 'evergreen'),
    [products]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([
          dispatch(fetchBanners()),
          dispatch(fetchCategories()),
          dispatch(fetchProducts())
        ]);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
        </Container>
      ) : (
        <>
          <BannerCarousel banners={banners} />
          
          <Container maxWidth="xl">
            <Section>
              <SectionTitle variant="h4" gutterBottom>
                Shop by Category
              </SectionTitle>
              <CategoryFilter categories={categories} />
            </Section>

            <Section>
              <SectionTitle variant="h4" gutterBottom>
                What's Hot and New!
              </SectionTitle>
              <ProductGrid 
                products={hotAndNewProducts}
                category="hot-and-new"
              />
            </Section>

            <Section>
              <SectionTitle variant="h4" gutterBottom>
                What's Evergreen
              </SectionTitle>
              <ProductGrid 
                products={evergreenProducts}
                category="evergreen"
              />
            </Section>

            {wishlistedProducts.length > 0 && (
              <Section>
                <SectionTitle variant="h4" gutterBottom>
                  Your Wall of Loved Products
                </SectionTitle>
                <ProductGrid 
                  products={wishlistedProducts}
                  category="wishlist"
                  showMore={false}
                />
              </Section>
            )}

            {pastOrders.length > 0 && (
              <Section>
                <SectionTitle variant="h4" gutterBottom>
                  Your Wall of Owned Products
                </SectionTitle>
                <ProductGrid 
                  products={pastOrders}
                  category="past-orders"
                  showMore={false}
                />
              </Section>
            )}
          </Container>
        </>
      )}
    </Box>
  );
};

export default HomePage;