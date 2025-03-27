import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RepoSortOptions = ({ sortOption, onSortChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Сортировать по</InputLabel>
        <Select
          value={sortOption}
          label="Сортировать по"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="alphabetical">Алфавиту (A-Z)</MenuItem>
          <MenuItem value="date">Дате обновления</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RepoSortOptions;
