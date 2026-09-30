import { FaWhatsapp } from 'react-icons/fa'
import siteConfig from '../../constants/siteConfig.js'
import '../../styles/WhatsAppButton.css'

function WhatsAppButton() {
  const { number, message } = siteConfig.whatsapp

  if (!number) return null

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Integra on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-label">Chat with us</span>
    </a>
  )
}

export default WhatsAppButton
