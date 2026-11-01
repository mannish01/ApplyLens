import { useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router';

import { useAuth } from '../context/AuthContext';
import FormField from '../components/shared/FormField';
import { registerSchema } from '../validations/auth.schema';

import type { RegisterFormData } from '../validations/auth.schema';

type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>;

function Register() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return <p className="p-8 text-center">Checking session...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(field: keyof RegisterFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setServerError('');
  }

  function validateForm(): boolean {
    const result = registerSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: RegisterErrors = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof RegisterFormData;

      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return false;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError('');
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/login', {
        replace: true,
        state: {
          message: 'Account created successfully. please log in.',
          email: registrationData.email,
        },
      });
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Registration failed. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-primary';

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">ApplyLens</p>

          <h1 className="mt-3 font-display text-3xl font-bold">Create your account.</h1>

          <p className="mt-2 text-muted">Start discovering opportunities that match your goals.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Full name" htmlFor="fullName" error={errors.fullName} required>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={formData.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </FormField>

          <FormField label="Email address" htmlFor="email" error={errors.email} required>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="you@example.com"
              className={inputClass}
            />
          </FormField>

          <FormField label="Password" htmlFor="password" error={errors.password} required>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(event) => handleChange('password', event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                placeholder="Create a strong password"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </FormField>

          <FormField
            label="Confirm password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword}
            required
          >
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                placeholder="Enter your password again"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </FormField>

          {serverError && (
            <p role="alert" className="text-sm text-danger">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
