import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../../store/slices/addressSlice';

const validationSchema = Yup.object({
  line1: Yup.string().required('Address Line 1 is required'),
  line2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pinCode: Yup.string()
    .required('PIN Code is required')
    .matches(/^[0-9]{6}$/, 'PIN Code must be 6 digits'),
});

const AddressForm = ({ address, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const isEditing = !!address;

  const formik = useFormik({
    initialValues: {
      line1: address?.line1 || '',
      line2: address?.line2 || '',
      city: address?.city || '',
      state: address?.state || '',
      pinCode: address?.pinCode || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (isEditing) {
        await dispatch(updateAddress({ id: address.id, ...values }));
      } else {
        await dispatch(addAddress(values));
      }
      onSubmit();
    },
  });

  return (
    <>
      <DialogTitle>
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </DialogTitle>
      
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="line1"
                name="line1"
                label="Address Line 1"
                value={formik.values.line1}
                onChange={formik.handleChange}
                error={formik.touched.line1 && Boolean(formik.errors.line1)}
                helperText={formik.touched.line1 && formik.errors.line1}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="line2"
                name="line2"
                label="Address Line 2 (Optional)"
                value={formik.values.line2}
                onChange={formik.handleChange}
                error={formik.touched.line2 && Boolean(formik.errors.line2)}
                helperText={formik.touched.line2 && formik.errors.line2}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="pinCode"
                name="pinCode"
                label="PIN Code"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {isEditing ? 'Save Changes' : 'Add Address'}
        </Button>
      </DialogActions>
    </>
  );
};

export default AddressForm;