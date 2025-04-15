import { z } from 'zod';

// Base user schema with common fields
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.enum(['USER', 'ADMIN']),
});

// Schema for creating a new user (omits auto-generated fields)
export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a user (all fields optional except id)
export const updateUserSchema = userSchema
  .partial()
  .required({ id: true })
  .extend({
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  });

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Schema for user registration
export const registerSchema = createUserSchema.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for password reset request
export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Schema for password reset
export const passwordResetSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

// Schema for user preferences
export const userPreferencesSchema = z.object({
  userId: z.string().uuid(),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  theme: z.enum(['LIGHT', 'DARK', 'SYSTEM']).default('SYSTEM'),
  language: z.string().default('en'),
  timezone: z.string(),
});

// Export TypeScript types derived from the schemas
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
export type PasswordReset = z.infer<typeof passwordResetSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>; 