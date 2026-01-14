/**
 * Checks if a value is required.
 * Handles null, undefined, empty strings (after trimming), false, and empty arrays.
 * @param value The value to check.
 * @returns True if valid, error message string otherwise.
 */
export const required = (
  value: string | number | boolean | null | undefined
): boolean | string => {
  if (value === null || value === undefined || value === false) {
    return "This field is required.";
  }
  if (Array.isArray(value) && value.length === 0) {
    return "This field is required.";
  }
  if (String(value).trim() === "") {
    return "This field is required.";
  }
  return true;
};

/**
 * Checks if at least one item is selected in an array.
 * @param value The array of selected items.
 * @returns True if at least one item is selected, error message string otherwise.
 */
export const atLeastOne = (
  value: number[] | string[] | null | undefined
): boolean | string => {
  if (!value || value.length === 0) {
    return "Please select at least one item.";
  }
  return true;
};

/**
 * Checks if a value is a valid URL format.
 * @param value The value to check.
 * @returns True if valid, error message string otherwise.
 */
export const urlFormat = (
  value: string | null | undefined
): boolean | string => {
  const val = value || "";
  if (!val) return true;
  try {
    new URL(val);
    return true;
  } catch (_) {
    console.log(_);
    return "Please enter a valid URL.";
  }
};


/**
 * Creates a rule to check for minimum string length.
 * @param length The minimum required length.
 * @returns A Vuetify rule function.
 */
export const minLength =
  (length: number) =>
  (value: string | null | undefined): boolean | string => {
    const val = value || "";
    if (val.length < length) {
      return `Must be at least ${length} characters long.`;
    }
    return true;
  };

/**
 * Creates a rule to check for maximum string length.
 * @param length The maximum allowed length.
 * @returns A Vuetify rule function.
 */
export const maxLength =
  (length: number) =>
  (value: string | null | undefined): boolean | string => {
    const val = value || "";
    if (val.length > length) {
      return `Cannot exceed ${length} characters.`;
    }
    return true;
  };

/**
 * Checks if a value is a valid email format.
 * @param value The value to check.
 * @returns True if valid, error message string otherwise.
 */
export const emailFormat = (
  value: string | null | undefined
): boolean | string => {
  const val = value || "";
  if (!val) return true;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(val)) {
    return "Please enter a valid email address.";
  }
  return true;
};

/**
 * Common rules for a password field.
 */
export const passwordRules = [
  required,
  minLength(8),
  (value: string | null | undefined): boolean | string => {
    const val = value || "";
    if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter.";
    if (!/[0-9]/.test(val)) return "Must contain a number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val))
      return "Must contain a special character.";
    return true;
  },
];

/**
 * Factory function to create a rule for matching another field's value.
 * @param target A function that returns the value of the field to match against.
 * @returns A Vuetify rule function.
 */
export const mustMatch =
  (target: () => string, fieldName = "fields") =>
  (value: string | null | undefined): boolean | string => {
    const targetValue = target();
    if (value !== targetValue) {
      return `${fieldName} do not match.`;
    }
    return true;
  };
