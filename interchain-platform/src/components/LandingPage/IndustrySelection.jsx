import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const industries = [
  'Real Estate',
  'Supply Chain',
  'Telecommunications',
  'Retail',
  'Health Care',
  'Education',
  'Government',
  'E-Commerce',
  'Insurance',
  'Finance & Banking',
];

const IndustrySelection = ({ selectedIndustry, setSelectedIndustry }) => {
  return (
    <Box my={4}>
      <FormControl fullWidth>
        <InputLabel id="industry-select-label">Select Your Industry</InputLabel>
        <Select
          labelId="industry-select-label"
          id="industry-select"
          value={selectedIndustry}
          label="Select Your Industry"
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          {industries.map((industry) => (
            <MenuItem key={industry} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IndustrySelection;
