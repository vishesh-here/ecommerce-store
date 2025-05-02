import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?category=${category.slug}`);
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
          '& .category-overlay': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <Box sx={{ position: 'relative', height: '100%' }}>
          <CardMedia
            component="img"
            height="200"
            image={category.imageUrl}
            alt={category.name}
            sx={{
              objectFit: 'cover',
            }}
          />
          <Box
            className="category-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              transition: 'background-color 0.2s ease-in-out',
            }}
          />
          <CardContent
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              color: 'white',
              textAlign: 'center',
              pb: 3,
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              {category.name}
            </Typography>
            {category.productCount && (
              <Typography
                variant="subtitle1"
                sx={{
                  mt: 1,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                }}
              >
                {category.productCount} Products
              </Typography>
            )}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;