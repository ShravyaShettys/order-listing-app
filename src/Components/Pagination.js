import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={(e, value) => onPageChange(value)}
      color="primary"
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;