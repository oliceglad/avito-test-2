export const createHandleChange = (setFormData) => (field) => (e) => {
  setFormData((prev) => ({ ...prev, [field]: e.target.value }));
};
