// Define a generic type for the form data
type FormData<T extends object> = T;
type FormErrors = Record<string, string | string[]> | any;

interface UseFormReturn<T extends object> {
  /**
   * The reactive form data object, bound directly to your input fields.
   */
  form: FormData<T>;
  /**
   * A reactive object to store validation errors.
   * Typically used for client-side validation or manually set with backend errors.
   */
  errors: FormErrors;
  /**
   * A boolean indicating if the form data has been changed from its initial/default state.
   */
  isDirty: Ref<boolean>;
  /**
   * A boolean indicating if there are any errors currently in the `errors` object.
   */
  hasErrors: Ref<boolean>;
  /**
   * Resets the form fields to their initial/default state.
   * @param fields Optional array of specific field names to reset. If not provided, all fields are reset.
   */
  reset: (fields?: (keyof T)[]) => void;
  /**
   * Sets new default values for the form and immediately resets the form to these new defaults.
   * If no `newDefaults` are provided, the current `form` values become the new defaults.
   * @param newDefaults Optional partial object of new default values.
   */
  defaults: (newDefaults?: Partial<T>) => void;
  /**
   * Manually sets validation errors. Useful for passing backend errors received from store methods.
   * @param newErrors An object where keys are field names and values are error messages or arrays of messages.
   */
  setErrors: (newErrors: FormErrors) => void;
  /**
   * Clears all validation errors or errors for specific fields.
   * @param field Optional specific field name(s) whose errors should be cleared.
   */
  clearErrors: (field?: keyof T | (keyof T)[]) => void;
}

/**
 * A custom composable for managing form state (data, defaults, dirty state, local errors).
 * It is designed to work in conjunction with your existing store methods for API calls and their loading/error states.
 *
 * @param initialData The initial form data. Can be an object or a function returning an object.
 * This also serves as the default state for `reset()`.
 */
export function useForm<T extends object>(
  initialData: T | (() => T)
): UseFormReturn<T> {
  // Store the initial/default data. This is what `reset()` will revert to.
  const initialFormState = ref<T>(
    typeof initialData === "function" ? initialData() : initialData
  );

  // Reactive form data that binds to inputs
  const form = reactive<FormData<T>>({ ...initialFormState.value });

  // Reactive errors object for local validation or to display backend errors
  const errors = reactive<FormErrors>({});

  // Computed Properties

  /**
   * Checks if the form data has been modified from its `initialFormState`.
   * Performs a shallow comparison for performance. For deep objects/arrays,
   * it stringifies to check for changes.
   */
  const isDirty = computed(() => {
    return Object.keys(form).some((key) => {
      const formValue = (form as any)[key];
      const initialValue = (initialFormState.value as any)[key];

      // Direct comparison for primitive types
      if (formValue !== initialValue) {
        return true;
      }

      // For objects and arrays, perform a shallow JSON stringify comparison
      // (Note: This might not be robust for complex nested structures or Date objects)
      if (
        typeof formValue === "object" &&
        formValue !== null &&
        typeof initialValue === "object" &&
        initialValue !== null
      ) {
        if (
          JSON.stringify(toRaw(formValue)) !==
          JSON.stringify(toRaw(initialValue))
        ) {
          return true;
        }
      }
      return false;
    });
  });

  /**
   * Checks if there are any errors present in the `errors` object.
   */
  const hasErrors = computed(() => Object.keys(errors).length > 0);

  // --- Methods ---

  /**
   * Resets the `form` reactive object to the current `initialFormState`.
   * Also clears any validation errors.
   * @param fields Optional array of specific field names to reset.
   */
  const reset = (fields?: (keyof T)[]) => {
    if (fields) {
      fields.forEach((field) => {
        (form as any)[field] = (initialFormState.value as any)[field];
      });
    } else {
      Object.assign(form, { ...initialFormState.value });
    }
    clearErrors(fields); // Clear errors for reset fields
  };

  /**
   * Updates the `initialFormState` with new default values and then resets the `form`
   * to these new defaults. If `newDefaults` is not provided, the *current* values
   * of the `form` become the new `initialFormState`.
   * @param newDefaults Optional partial object of new default values.
   */
  const defaults = (newDefaults?: Partial<T>) => {
    if (newDefaults) {
      Object.assign(initialFormState.value, newDefaults);
    } else {
      // If no new defaults provided, current form values become the new defaults
      Object.assign(initialFormState.value, toRaw(form));
    }
    reset(); // Reset the form to the new defaults
  };

  /**
   * Sets validation errors in the `errors` object.
   * This is useful when you receive errors from your backend API call
   * (via a store method) and want to display them using this composable's `errors` object.
   * @param newErrors An object where keys are field names and values are error messages or arrays of messages.
   */
  const setErrors = (newErrors: FormErrors) => {
    // Clear existing errors first, then assign new ones
    Object.keys(errors).forEach((key) => delete errors[key]);
    Object.assign(errors, newErrors);
  };

  /**
   * Clears all validation errors, or errors for specific fields.
   * @param field Optional specific field name(s) whose errors should be cleared.
   */
  const clearErrors = (field?: keyof T | (keyof T)[]) => {
    if (field) {
      const fieldsToClear = Array.isArray(field) ? field : [field];
      fieldsToClear.forEach((f) => {
        if (errors[f as string]) {
          delete errors[f as string];
        }
      });
    } else {
      Object.keys(errors).forEach((key) => delete errors[key]);
    }
  };

  return {
    // @ts-expect-error - Will do type checking later to fix Type 'Reactive<T>' is not assignable to type 'T'.'Reactive<T>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'object'.
    form,
    errors,
    isDirty,
    hasErrors,
    reset,
    defaults,
    setErrors,
    clearErrors,
  };
}
