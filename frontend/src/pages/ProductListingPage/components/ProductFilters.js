import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const categories = [
  'All Products',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Books',
  'Sports & Outdoors',
];

const brands = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'LG',
  'HP',
  'Dell',
  'Asus',
  'Lenovo',
];

const ratings = [
  { value: 4, label: '4★ & above' },
  { value: 3, label: '3★ & above' },
  { value: 2, label: '2★ & above' },
  { value: 1, label: '1★ & above' },
];

const ProductFilters = ({ filters, onFilterChange, onClose, isMobile }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expanded, setExpanded] = useState(['category', 'price', 'brand', 'rating']);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded 
      ? [...expanded, panel]
      : expanded.filter(p => p !== panel)
    );
  };

  const handlePriceChange = (event, newValue) => {
    setLocalFilters({ ...localFilters, priceRange: newValue });
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    onFilterChange({ ...localFilters, priceRange: newValue });
  };

  const handleCategoryChange = (category) => {
    const newCategory = category === 'All Products' ? '' : category;
    const newFilters = { ...localFilters, category: newCategory };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandChange = (brand) => {
    const newBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter(b => b !== brand)
      : [...localFilters.brands, brand];
    const newFilters = { ...localFilters, brands: newBrands };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newRatings = localFilters.ratings.includes(rating)
      ? localFilters.ratings.filter(r => r !== rating)
      : [...localFilters.ratings, rating];
    const newFilters = { ...localFilters, ratings: newRatings };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: [0, 1000],
      ratings: [],
      brands: [],
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters.category ||
    localFilters.brands.length > 0 ||
    localFilters.ratings.length > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 1000;

  return (
    <Box>
      {/* Mobile Header */}
      {isMobile && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outlined"
          color="primary"
          onClick={clearAllFilters}
          fullWidth
          sx={{ mb: 2 }}
        >
          Clear All Filters
        </Button>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {localFilters.category && (
            <Chip
              label={localFilters.category}
              onDelete={() => handleCategoryChange('All Products')}
            />
          )}
          {localFilters.brands.map(brand => (
            <Chip
              key={brand}
              label={brand}
              onDelete={() => handleBrandChange(brand)}
            />
          ))}
          {localFilters.ratings.map(rating => (
            <Chip
              key={rating}
              label={`${rating}★ & above`}
              onDelete={() => handleRatingChange(rating)}
            />
          ))}
        </Box>
      )}

      {/* Categories */}
      <Accordion
        expanded={expanded.includes('category')}
        onChange={handleAccordionChange('category')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={
                      category === 'All Products'
                        ? !localFilters.category
                        : localFilters.category === category
                    }
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion
        expanded={expanded.includes('price')}
        onChange={handleAccordionChange('price')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={localFilters.priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2">
                ${localFilters.priceRange[0]}
              </Typography>
              <Typography variant="body2">
                ${localFilters.priceRange[1]}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Brands */}
      <Accordion
        expanded={expanded.includes('brand')}
        onChange={handleAccordionChange('brand')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={localFilters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Ratings */}
      <Accordion
        expanded={expanded.includes('rating')}
        onChange={handleAccordionChange('rating')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ratings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {ratings.map((rating) => (
              <FormControlLabel
                key={rating.value}
                control={
                  <Checkbox
                    checked={localFilters.ratings.includes(rating.value)}
                    onChange={() => handleRatingChange(rating.value)}
                  />
                }
                label={rating.label}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Apply Filters Button - Mobile Only */}
      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );
};

export default ProductFilters;