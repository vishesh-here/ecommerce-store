import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrderById } from '../../store/slices/orderSlice';
import { format } from 'date-fns';

const OrderStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'shipped':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={status}
      color={getStatusColor()}
      size="small"
      sx={{ textTransform: 'capitalize' }}
    />
  );
};

const OrderTimeline = ({ status }) => {
  const steps = ['Ordered', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(status) + 1;

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: index < currentStep ? 'primary.main' : 'grey.300',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 1,
                }}
              >
                {index < currentStep ? '✓' : index + 1}
              </Box>
              <Typography variant="caption" display="block" color={index < currentStep ? 'primary' : 'text.secondary'}>
                {step}
              </Typography>
            </Grid>
            {index < steps.length - 1 && (
              <Grid item xs={0}>
                <Box
                  sx={{
                    height: 2,
                    backgroundColor: index < currentStep - 1 ? 'primary.main' : 'grey.300',
                    width: '100%',
                  }}
                />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

const OrderDetailsDialog = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Order Details - #{order.orderId}
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Order Status
          </Typography>
          <OrderTimeline status={order.status} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Shipping Address
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
              <Typography variant="body2">
                {order.shippingAddress.line1}<br />
                {order.shippingAddress.line2}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Order Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimeIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Ordered on {format(new Date(order.createdAt), 'PPP')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ReceiptIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Transaction ID: {order.transactionId}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Order Items
        </Typography>
        {order.items.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} sm={2}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={9} sm={10}>
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity} × ${item.price}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>${order.total - order.shippingCost}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Shipping</Typography>
          <Typography>${order.shippingCost}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${order.total}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => window.print()}>
          Print Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const OrdersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const { items: orders, status, error } = useSelector((state) => state.orders);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewDetails = async (orderId) => {
    const order = await dispatch(fetchOrderById(orderId)).unwrap();
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    if (currentTab === 'all') return true;
    return order.status.toLowerCase() === currentTab;
  });

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography color="error" align="center">
          {error || 'Failed to load orders'}
        </Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(fetchOrders())}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You haven't placed any orders yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
        >
          <Tab label="All Orders" value="all" />
          <Tab label="Processing" value="processing" />
          <Tab label="Shipped" value="shipped" />
          <Tab label="Delivered" value="delivered" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} key={order.orderId}>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    Order #{order.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {format(new Date(order.createdAt), 'PPP')}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Total Amount
                  </Typography>
                  <Typography variant="body2">
                    ${order.total}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Status
                  </Typography>
                  <OrderStatus status={order.status} />
                </Grid>

                <Grid item xs={12} sm={2} sx={{ textAlign: { sm: 'right' } }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(order.orderId)}
                    fullWidth={isMobile}
                  >
                    View Details
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <OrderDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        order={selectedOrder}
      />
    </Container>
  );
};

export default OrdersPage;