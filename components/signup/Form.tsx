import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Tooltip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import axios from 'axios';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      password: '',
      phoneNumber: '',
      dateOfBirth: '',
      address: '',
      gender: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .min(2, 'Must be at least 2 characters'),
      lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Must be at least 2 characters'),
      bio: Yup.string()
        .required('Bio is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)')
        .max(20, 'Password cannot exceed 20 characters'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Must be only digits'),
      dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .test('age', 'You must be at least 16 years old', (value) => {
          if (!value) return false;
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 16;
          }
          return age >= 16;
        }),
      address: Yup.string().required('Address is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.post(`/api/user/signup`, values)
        .then(response => {
          toast.success('Sign up successful');
        })
        .catch(error => {
          console.log(error);
          if (error?.response.status === 400) {
            return toast.error("Email already in use");
          }
          toast.error('Something went wrong, try again');
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 5,
        padding: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Sign Up Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name and Last Name */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && String(formik.errors.firstName || '')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && String(formik.errors.lastName || '')}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && String(formik.errors.email || '')}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && String(formik.errors.password || '')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={formik.touched.phoneNumber && String(formik.errors.phoneNumber || '')}
            />
          </Grid>

          {/* Bio */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bio && Boolean(formik.errors.bio)
              }
              helperText={formik.touched.bio && String(formik.errors.bio || '')}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: new Date(new Date().setFullYear(new Date().getFullYear() - 16))
                  .toISOString()
                  .split("T")[0],
              }}
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && String(formik.errors.dateOfBirth || '')}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && String(formik.errors.address || '')}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && String(formik.errors.gender || '')}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          {/* Terms and Conditions */}
          <Grid item xs={12}>
            <Typography className="text-sm text-slate-500">
              By clicking Sign Up, you agree to our&nbsp;
              <Tooltip title="Our terms ensure that your data is handled securely and your privacy is protected while using our chat app.">
                <span className="text-blue-500 underline cursor-pointer">Terms</span>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Our privacy policy explains how we handle your personal data, keeping it safe and secure while you chat.">
                <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>
              </Tooltip>
              , and&nbsp;
              <Tooltip title="We use cookies to authenticate users and provide the best experience for our chat application.">
                <span className="text-blue-500 underline cursor-pointer">Cookies Policy</span>
              </Tooltip>
              . You may receive SMS notifications from us.
            </Typography>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link className='text-blue-500 hover:underline' href="/login">
                Sign In
              </Link>
            </Typography>

          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;