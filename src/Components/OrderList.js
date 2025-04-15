import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import OrderTable from './OrderTable';
import Pagination from './Pagination';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const ordersPerPage = 2;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:3001/orders?_page=${page}&_limit=${ordersPerPage}`;
        if (search) {
          url += `&q=${search}`;
        }
        if (statusFilter) {
          url += `&status=${statusFilter}`;
        }
        const response = await axios.get(url);
        setOrders(response.data);
        const totalCount = response.headers['x-total-count'] || 10;
        setTotalPages(Math.ceil(totalCount / ordersPerPage));
        setError('');
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, search, statusFilter]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Search by Customer or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!loading && !error && <OrderTable orders={orders} />}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </Box>
  );
};

export default OrderList;
