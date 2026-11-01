import { useState } from 'react';

import FormField from '../components/shared/FormField';

import type { StudentProfileFormData, ProfileFieldErrors } from '../types/profile.types';

const initialFormData: StudentProfileFormData = {
  fullName: '',
  college: '',
  branch: '',
  graduationYear: '',
  cgpa: '',
};

function ProfileForm() {
  const [formData, setFormData] = useState<StudentProfileFormData>(initialFormData);

  const [errors, setErrors] = useState<ProfileFieldErrors>({});

  const [success, setSuccess] = useState(false);

  // Update individual fields
  function handleChange(field: keyof StudentProfileFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Clear the error for the field being edited
    setErrors((previous) => ({
      ...previous,
      [field]: '',
    }));

    setSuccess(false);
  }

  // Validate form data
  function validateForm(): ProfileFieldErrors {
    const newErrors: ProfileFieldErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must contain at least 2 characters.';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College name is required.';
    }

    if (!formData.branch) {
      newErrors.branch = 'Please select your branch.';
    }

    const year = Number(formData.graduationYear);

    if (!formData.graduationYear.trim()) {
      newErrors.graduationYear = 'Graduation year is required.';
    } else if (!Number.isInteger(year) || year < 2020 || year > 2035) {
      newErrors.graduationYear = 'Enter a valid graduation year.';
    }

    const cgpa = Number(formData.cgpa);

    if (!formData.cgpa.trim()) {
      newErrors.cgpa = 'CGPA is required.';
    } else if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
      newErrors.cgpa = 'CGPA must be between 0 and 10.';
    }

    return newErrors;
  }

  // Submit form
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccess(false);
      return;
    }

    setSuccess(true);

    // Temporary: backend API integration will come later
    console.log('Profile submitted:', {
      ...formData,
      graduationYear: Number(formData.graduationYear),
      cgpa: Number(formData.cgpa),
    });
  }

  // Reset form
  function handleReset() {
    setFormData(initialFormData);
    setErrors({});
    setSuccess(false);
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10';

  const errorInputClass = 'border-danger focus:border-danger';

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-text md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Student onboarding / 01
          </p>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Build your profile.
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
            Tell us about your academic background. We'll use this information to find opportunities
            relevant to you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            {/* Full Name */}
            <FormField label="Full name" htmlFor="fullName" required error={errors.fullName}>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
                placeholder="Enter your full name"
                className={`${inputClass} ${errors.fullName ? errorInputClass : ''}`}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
            </FormField>

            {/* College */}
            <FormField label="College name" htmlFor="college" required error={errors.college}>
              <input
                id="college"
                type="text"
                value={formData.college}
                onChange={(event) => handleChange('college', event.target.value)}
                placeholder="Enter your college name"
                className={`${inputClass} ${errors.college ? errorInputClass : ''}`}
                aria-invalid={Boolean(errors.college)}
              />
            </FormField>

            {/* Branch */}
            <FormField label="Branch" htmlFor="branch" required error={errors.branch}>
              <select
                id="branch"
                value={formData.branch}
                onChange={(event) => handleChange('branch', event.target.value)}
                className={`${inputClass} ${errors.branch ? errorInputClass : ''}`}
                aria-invalid={Boolean(errors.branch)}
              >
                <option value="">Select your branch</option>
                <option value="CSE">Computer Science</option>
                <option value="AIML">CSE - AI & ML</option>
                <option value="ECE">Electronics</option>
                <option value="EE">Electrical</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
              </select>
            </FormField>

            {/* Graduation Year and CGPA */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                label="Graduation year"
                htmlFor="graduationYear"
                required
                error={errors.graduationYear}
              >
                <input
                  id="graduationYear"
                  type="number"
                  min="2020"
                  max="2035"
                  value={formData.graduationYear}
                  onChange={(event) => handleChange('graduationYear', event.target.value)}
                  placeholder="2027"
                  className={`${inputClass} ${errors.graduationYear ? errorInputClass : ''}`}
                  aria-invalid={Boolean(errors.graduationYear)}
                />
              </FormField>

              <FormField label="CGPA" htmlFor="cgpa" required error={errors.cgpa}>
                <input
                  id="cgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(event) => handleChange('cgpa', event.target.value)}
                  placeholder="8.5"
                  className={`${inputClass} ${errors.cgpa ? errorInputClass : ''}`}
                  aria-invalid={Boolean(errors.cgpa)}
                />
              </FormField>
            </div>
          </div>

          {/* Feedback */}
          {success && (
            <div
              className="mt-6 rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-success"
              role="status"
            >
              Your profile information has been validated successfully!
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium transition hover:bg-elevated"
            >
              Reset form
            </button>

            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Save profile →
            </button>
          </div>
        </form>

        {/* Footer note */}
        <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted">
          Your academic information helps ApplyLens evaluate your eligibility for relevant
          opportunities.
        </p>
      </div>
    </main>
  );
}

export default ProfileForm;
