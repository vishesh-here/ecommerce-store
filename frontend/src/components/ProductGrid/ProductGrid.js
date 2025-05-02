import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

const ShowMoreButton = styled(Button)(({ theme }) => ({
  height: '100%',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ProductGrid = ({ products, category, limit = 10, showMore = true }) => {
  const navigate = useNavigate();
  
  const handleShowMore = () => {
    navigate(`/products?category=${category}`);
  };

  return (
    <Grid container spacing={3}>
      {products.slice(0, limit - (showMore ? 1 : 0)).map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
      
      {showMore && products.length >= limit - 1 && (
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ShowMoreButton
            onClick={handleShowMore}
            fullWidth
          >
            Show More
            <Box sx={{ fontSize: '2rem', mt: 1 }}>→</Box>
          </ShowMoreButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductGrid;