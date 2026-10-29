import api from './api';

// Submit general contact inquiry (stores in DB + triggers email notification to client)
export const submitContactInquiry = async (data) => {
  return api('inquiries/contact', {
    method: 'POST',
    body: data,
  });
};

// Submit full intake form (supports JSON or FormData with document file)
export const submitIntakeForm = async (formData) => {
  const isFormData = formData instanceof FormData;
  return api('inquiries/intake', {
    method: 'POST',
    body: formData,
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
  });
};

// Submit Event Registration Interest
export const submitEventInterest = async (data) => {
  return api('inquiries/event', {
    method: 'POST',
    body: data,
  });
};

