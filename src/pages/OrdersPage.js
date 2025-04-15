import React from 'react';
import { Container, Typography } from '@mui/material';
import OrderList from '../Components/OrderList';

const OrdersPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Order Management
      </Typography>
      <OrderList />
    </Container>
  );
};

export default OrdersPage;
