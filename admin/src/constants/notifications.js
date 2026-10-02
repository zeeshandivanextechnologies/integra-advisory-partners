// TODO: replace with notifications from the backend
const notifications = [
  {
    id: 1,
    type: 'inquiry',
    message: 'New contact inquiry from Amara Okafor (Lagos Ventures) about the Market Entry Blueprint.',
    time: '10 minutes ago',
    link: '/inquiries',
    unread: true,
  },
  {
    id: 2,
    type: 'payment',
    message: 'Payment of $2,500 received for the Executive Advisory Retainer from Marcus Reed.',
    time: '2 hours ago',
    link: '/payments',
    unread: true,
  },
  {
    id: 3,
    type: 'intake',
    message: 'Intake form submitted by Kofi Mensah (Accra Agritech) for Qatar incorporation.',
    time: '5 hours ago',
    link: '/inquiries',
    unread: true,
  },
  {
    id: 4,
    type: 'alert',
    message: 'Inquiry from Fatima Benali has had no reply for 2 days.',
    time: '17 hours ago',
    link: '/inquiries',
    unread: false,
  },
  {
    id: 5,
    type: 'event',
    message: '12 new registrations for Integra Nights: Doha Founders Evening.',
    time: '1 day ago',
    link: '/events',
    unread: false,
  },
]

export default notifications
