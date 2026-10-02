import {
  FiAlertCircle,
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiInbox,
  FiLayout,
} from 'react-icons/fi'

// notification type (from the backend) -> icon; the matching colour is
// .notif-icon.<type> in styles/NotificationMenu.css
const notificationTypes = {
  page: FiLayout,
  article: FiFileText,
  event: FiCalendar,
  alert: FiAlertCircle,
  // kept for when inquiries and payments come from the backend
  inquiry: FiInbox,
  payment: FiCreditCard,
  intake: FiFileText,
}

export default notificationTypes
