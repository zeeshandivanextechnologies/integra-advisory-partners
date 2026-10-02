import api from './api';

export const login = async ({ email, password }) => {
  return api('auth/login', {
    method: 'POST',
    body: { email, password },
  });
};

export const getMe = async () => {
  return api('auth/me');
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};
// the signed-in admin's own name and login email
export const updateProfile = async ({ name, email }) => {
  return api('auth/me', {
    method: 'PUT',
    body: { name, email },
  });
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  return api('auth/me/password', {
    method: 'PUT',
    body: { currentPassword, newPassword },
  });
};
