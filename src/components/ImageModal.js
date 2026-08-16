import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 15, 29, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 2500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  background: rgba(30, 41, 59, 0.95);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleUp {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 38px;
    height: 38px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid #FFD700;
    color: #FFD700;
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;

    &:hover {
      background: #D32F2F;
      color: #FFF;
      transform: scale(1.1);
    }
  }

  .img-container {
    width: 100%;
    max-height: 65vh;
    background: #0B1120;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 65vh;
      object-fit: contain;
    }
  }

  .info-bar {
    padding: 1.5rem 2rem;
    background: rgba(15, 23, 42, 0.95);
    display: flex;
    flex-direction: column;
    gap: 6px;

    h3 {
      color: #FFD700;
      font-size: 1.3rem;
    }

    p {
      color: #CBD5E1;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const ImageModal = ({ isOpen, imageSrc, title, desc, onClose }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Đóng xem ảnh">✕</button>
        <div className="img-container">
          <img src={imageSrc} alt={title || "Tư liệu lịch sử"} />
        </div>
        <div className="info-bar">
          <h3>{title}</h3>
          {desc && <p>{desc}</p>}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModal;
