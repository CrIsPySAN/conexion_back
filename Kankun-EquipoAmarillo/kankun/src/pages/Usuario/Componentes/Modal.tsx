import React from 'react'
import './Modal.css'
import '../../../assets/styles/Global.css'
interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  content: string,
  image: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, image }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={image || "/placeholder.svg"} alt={title} className="modal-image" />
        <h3>{title}</h3>
        <div className="modal-details">{content}</div>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default Modal