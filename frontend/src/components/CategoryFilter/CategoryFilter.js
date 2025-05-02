import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '200px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const CategoryImage = styled(CardMedia)({
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
});

const CategoryOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  padding: theme.spacing(2),
  color: theme.palette.common.white,
}));

const CategoryFilter = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`);
  };

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <CategoryCard>
            <CardActionArea onClick={() => handleCategoryClick(category)}>
              <CategoryImage
                image={category.imageUrl}
                title={category.name}
              />
              <CategoryOverlay>
                <Typography variant="h6" component="h3">
                  {category.name}
                </Typography>
                <Typography variant="body2">
                  {category.description}
                </Typography>
              </CategoryOverlay>
            </CardActionArea>
          </CategoryCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryFilter;