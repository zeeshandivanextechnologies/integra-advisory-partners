import api from './api';

export const getHealth = async () => {
  return api('health');
};

export { api };