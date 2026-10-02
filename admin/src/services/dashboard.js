import api from './api'

// counts and recent activity for the dashboard (see backend/services/dashboardService.js)
export const getDashboard = async () => {
  return api('dashboard')
}
