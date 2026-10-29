import api from './api';

// Admin endpoints for inquiries & intake submissions
export const getInquiries = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api(`inquiries${query ? `?${query}` : ''}`);
};

export const updateInquiryStatus = async (id, status) => {
  return api(`inquiries/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
};

export const deleteInquiry = async (id) => {
  return api(`inquiries/${id}`, {
    method: 'DELETE',
  });
};

