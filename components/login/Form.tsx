import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import Link from 'next/link';

const Form = () => {
    // Validation schema
    const loginValidationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            console.log('Login submitted:', values);
        },
    });

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
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {/* Email Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>

                    {/* Password Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>

                    {/* Forgot Password and New User */}
                    <Grid item xs={12}>
                        <Typography variant="body2" align="center">
                            <Link className='text-blue-500 hover:underline' href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" align="center">
                            New User?{' '}
                            <Link className='text-blue-500 hover:underline' href="/signup">
                                Sign Up
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Form;