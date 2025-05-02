import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const sortOptions = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
];

const ProductSort = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={value}
        label="Sort By"
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSort;