export function toFormData(
  obj: Record<string, any>,
  parentKey?: string,
  formData = new FormData()
): FormData {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value === null || value === undefined) {
        // Skip null or undefined values
        continue;
      } else if (value instanceof File) {
        // Handle a single File object
        formData.append(formKey, value, value.name);
      } else if (Array.isArray(value)) {
        // Handle arrays, including arrays of files
        value.forEach((item, index) => {
          if (item instanceof File) {
            // Append files with an index for proper backend handling
            formData.append(`${formKey}[${index}]`, item, item.name);
          } else if (typeof item === "object" && item !== null) {
            // Recursively handle nested objects in the array
            toFormData(item, `${formKey}[${index}]`, formData);
          } else {
            // Handle primitive values in the array
            formData.append(`${formKey}[${index}]`, String(item));
          }
        });
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects
        toFormData(value, formKey, formData);
      } else {
        // Handle primitive values
        formData.append(formKey, String(value));
      }
    }
  }
  return formData;
}