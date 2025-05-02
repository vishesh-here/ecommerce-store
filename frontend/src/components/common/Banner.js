import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = ({ banners }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: !isMobile,
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Box key={index}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '300px', sm: '400px', md: '500px' },
                backgroundImage: `url(${banner.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <Container
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  color: 'white',
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  }}
                >
                  {banner.description}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate(banner.link)}
                    sx={{
                      mr: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    Shop Now
                  </Button>
                  {banner.secondaryButton && (
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      onClick={() => navigate(banner.secondaryLink)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      {banner.secondaryButton}
                    </Button>
                  )}
                </Box>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;