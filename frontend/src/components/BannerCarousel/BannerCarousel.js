import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

const Slide = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: 'transform 0.5s ease-in-out',
});

const CarouselImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const Indicators = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
});

const Indicator = styled(Box)(({ active, theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const BannerCarousel = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, banners.length]);

  const handlePrevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleIndicatorClick = (index) => {
    setAutoplay(false);
    setCurrentSlide(index);
  };

  return (
    <CarouselContainer
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {banners.map((banner, index) => (
        <Slide
          key={banner.id}
          sx={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          <CarouselImage src={banner.imageUrl} alt={banner.title} />
        </Slide>
      ))}

      <CarouselButton
        sx={{ left: '20px' }}
        onClick={handlePrevSlide}
      >
        <ArrowBackIosNewIcon />
      </CarouselButton>

      <CarouselButton
        sx={{ right: '20px' }}
        onClick={handleNextSlide}
      >
        <ArrowForwardIosIcon />
      </CarouselButton>

      <Indicators>
        {banners.map((_, index) => (
          <Indicator
            key={index}
            active={index === currentSlide}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </Indicators>
    </CarouselContainer>
  );
};

export default BannerCarousel;