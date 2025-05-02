import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocationOn,
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addressDialog, setAddressDialog] = useState({
    open: false,
    mode: 'add',
    data: null,
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'orders') setTabValue(1);
    if (tab === 'addresses') setTabValue(2);

    // Fetch user data
    const fetchData = async () => {
      try {
        // Implement API calls here
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUserData({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
        });

        setAddresses([
          {
            id: 1,
            type: 'Home',
            name: 'John Doe',
            phoneNumber: '1234567890',
            line1: '123 Main St',
            line2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            pinCode: '10001',
            isDefault: true,
          },
          // Add more addresses...
        ]);

        setOrders([
          {
            id: 'ORD123',
            date: '2023-05-15',
            total: 299.99,
            status: 'Delivered',
            items: [
              {
                id: 1,
                name: 'Premium Leather Watch',
                quantity: 1,
                price: 299.99,
              },
            ],
          },
          // Add more orders...
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement profile update API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement address add/update API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAddressDialog({ open: false, mode: 'add', data: null });
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setLoading(true);
      try {
        // Implement address delete API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
      } catch (error) {
        console.error('Error deleting address:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const ProfileTab = () => (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Personal Information</Typography>
        <Button
          startIcon={<EditIcon />}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
      </Box>

      <Box component="form" onSubmit={handleProfileUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={userData.firstName}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={userData.lastName}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userData.email}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={userData.phoneNumber}
              disabled={!editMode}
            />
          </Grid>
          {editMode && (
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 1 }}
              >
                Save Changes
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );

  const OrdersTab = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      {orders.map((order) => (
        <Card key={order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Order #{order.id}</Typography>
              <Chip
                label={order.status}
                color={order.status === 'Delivered' ? 'success' : 'primary'}
              />
            </Box>
            <Typography color="text.secondary" gutterBottom>
              Placed on {new Date(order.date).toLocaleDateString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {order.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1">
                ${order.total.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const AddressesTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Saved Addresses</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setAddressDialog({ open: true, mode: 'add', data: null })}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} key={address.id}>
            <Paper sx={{ p: 3, position: 'relative' }}>
              {address.isDefault && (
                <Chip
                  label="Default"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="subtitle1">{address.type}</Typography>
                  <Typography variant="body2">{address.name}</Typography>
                  <Typography variant="body2">{address.phoneNumber}</Typography>
                </Box>
              </Box>
              <Typography variant="body2">
                {address.line1}
                {address.line2 && <>, {address.line2}</>}
                <br />
                {address.city}, {address.state} {address.pinCode}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton
                  size="small"
                  onClick={() =>
                    setAddressDialog({ open: true, mode: 'edit', data: address })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Account
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Orders" />
          <Tab label="Addresses" />
        </Tabs>
      </Box>

      {tabValue === 0 && <ProfileTab />}
      {tabValue === 1 && <OrdersTab />}
      {tabValue === 2 && <AddressesTab />}

      {/* Address Dialog */}
      <Dialog
        open={addressDialog.open}
        onClose={() => setAddressDialog({ open: false, mode: 'add', data: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {addressDialog.mode === 'add' ? 'Add New Address' : 'Edit Address'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddressSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  required
                  defaultValue={addressDialog.data?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  required
                  defaultValue={addressDialog.data?.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  required
                  defaultValue={addressDialog.data?.line1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  defaultValue={addressDialog.data?.line2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  required
                  defaultValue={addressDialog.data?.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  required
                  defaultValue={addressDialog.data?.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  required
                  defaultValue={addressDialog.data?.pinCode}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setAddressDialog({ open: false, mode: 'add', data: null })
            }
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddressSubmit}>
            {addressDialog.mode === 'add' ? 'Add Address' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;