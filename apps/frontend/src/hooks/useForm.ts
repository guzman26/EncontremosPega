import { useState, ChangeEvent, FormEvent } from 'react';

type FieldValues = Record<string, any>;
type FieldErrors<T> = Partial<Record<keyof T, string>>;
type Validator<T> = (values: T) => FieldErrors<T>;

interface UseFormOptions<T extends FieldValues> {
  initialValues: T;
  onSubmit: (values: T, actions: FormActions<T>) => void | Promise<void>;
  validate?: Validator<T>;
}

interface FormActions<T extends FieldValues> {
  setValues: (values: T) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
  setErrors: (errors: FieldErrors<T>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

interface UseFormReturn<T extends FieldValues> extends FormActions<T> {
  values: T;
  errors: FieldErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function useForm<T extends FieldValues>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const { initialValues, onSubmit, validate } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Handle different input types
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;

    setFieldValue(name as keyof T, fieldValue);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate the field on blur if validate function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const touchedFields = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(touchedFields as Partial<Record<keyof T, boolean>>);

    const isValid = validateForm();
    if (!isValid) return;

    setSubmitting(true);

    try {
      await onSubmit(values, {
        setValues,
        setFieldValue,
        setTouched,
        setErrors,
        setSubmitting,
        resetForm,
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
    setValues,
    setFieldValue,
    setTouched,
    setErrors,
    setSubmitting,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
