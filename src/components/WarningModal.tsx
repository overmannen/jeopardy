import { JSX } from "react";
import ReactDOM from "react-dom";

type WarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const WarningModal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}: WarningModalProps): JSX.Element | null => {
  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("The 'modal-root' element was not found in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">
            Jeg er sikker
          </button>
          <button onClick={onClose} className="close-button">
            Avbryt
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default WarningModal;
