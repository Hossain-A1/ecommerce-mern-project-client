import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(31, 'Name should be at most 31 characters long'),
  email: z.string().nonempty('Email is required').email('Invalid email'),
  password: z.string()
    .min(6, 'Password should be at least 6 characters long')
    .regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password should contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password should contain at least one number')
    .regex(/[\W_]/, 'Password should contain at least one special character'),
  phone: z.string().nonempty('Phone is required'), // Adjust validation as needed
  address: z.string().nonempty('Address is required') // Adjust validation as needed
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required')
});
