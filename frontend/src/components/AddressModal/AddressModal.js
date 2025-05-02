import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import AddressForm from './AddressForm';
import { 
  fetchAddresses,
  deleteAddress 
} from '../../store/slices/addressSlice';

const AddressModal = ({ open, onClose, onAddressSelect }) => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.items);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    if (open) {
      dispatch(fetchAddresses());
    }
  }, [open, dispatch]);

  const handleAddressChange = (event) => {
    const address = addresses.find(addr => addr.id === event.target.value);
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId));
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(null);
    }
  };

  const handleAddressFormSubmit = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    dispatch(fetchAddresses());
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
    }
  };

  if (showAddressForm) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <AddressForm
          address={editingAddress}
          onSubmit={handleAddressFormSubmit}
          onCancel={() => setShowAddressForm(false)}
        />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Select Delivery Address</Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddNewAddress}
            color="primary"
          >
            Add New Address
          </Button>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {addresses.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            No saved addresses. Add a new address to continue.
          </Typography>
        ) : (
          <RadioGroup value={selectedAddress?.id || ''} onChange={handleAddressChange}>
            {addresses.map((address) => (
              <Box key={address.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <FormControlLabel
                    value={address.id}
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1">
                          {address.line1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {address.line2}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${address.city}, ${address.state} ${address.pinCode}`}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ ml: 'auto' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditAddress(address)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </RadioGroup>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!selectedAddress}
        >
          Deliver to this Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;