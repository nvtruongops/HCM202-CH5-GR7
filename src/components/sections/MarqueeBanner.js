import React from "react";
import styled, { keyframes } from "styled-components";

const marqueeLeft = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

const marqueeRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
`;

const Section = styled.section`
  width: 100%;
  padding: 2.6rem 0;
  background: rgba(9, 13, 22, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  border-top: 1px solid rgba(245, 158, 11, 0.2);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  position: relative;

  /* Gradient Masking for ultra-smooth Vercel ribbon fade effect */
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${props => props.direction === "right" ? marqueeRight : marqueeLeft} ${props => props.speed || 30}s linear infinite;
  user-select: none;

  &:hover {
    animation-play-state: paused;
  }
`;

const TextItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  font-size: clamp(1.25rem, 3.2vw, 2.2rem);
  font-weight: 800;
  font-family: 'Be Vietnam Pro', 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;

  &.gold {
    color: #FDE047;
    text-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
  }

  &.gradient-gold {
    color: #F59E0B;
    text-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
    opacity: 0.95;
  }

  &.blue {
    color: #38BDF8;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
  }

  .star-divider {
    font-size: 1.1rem;
    color: #FDE047;
    opacity: 0.85;
  }
`;

const MarqueeBanner = () => {
  return (
    <Section>
      {/* Track 1 - Chạy sang trái */}
      <Track speed={35} direction="left">
        <TextItem className="gold">
          <span>Đoàn Kết</span>
          <span className="star-divider">✦</span>
          <span>Đoàn Kết</span>
          <span className="star-divider">✦</span>
          <span>Đại Đoàn Kết</span>
          <span className="star-divider">★</span>
          <span>Thành Công</span>
          <span className="star-divider">✦</span>
          <span>Thành Công</span>
          <span className="star-divider">✦</span>
          <span>Đại Thành Công</span>
          <span className="star-divider">★</span>
        </TextItem>
        <TextItem className="gold">
          <span>Đoàn Kết</span>
          <span className="star-divider">✦</span>
          <span>Đoàn Kết</span>
          <span className="star-divider">✦</span>
          <span>Đại Đoàn Kết</span>
          <span className="star-divider">★</span>
          <span>Thành Công</span>
          <span className="star-divider">✦</span>
          <span>Thành Công</span>
          <span className="star-divider">✦</span>
          <span>Đại Thành Công</span>
          <span className="star-divider">★</span>
        </TextItem>
      </Track>

      {/* Track 2 - Chạy sang phải */}
      <Track speed={40} direction="right">
        <TextItem className="gradient-gold">
          <span>Cầu Đồng Tồn Dị</span>
          <span className="star-divider">✦</span>
          <span>Sức Mạnh Dân Tộc</span>
          <span className="star-divider">+</span>
          <span>Sức Mạnh Thời Đại</span>
          <span className="star-divider">=</span>
          <span>Sức Mạnh Tổng Hợp</span>
          <span className="star-divider">★</span>
          <span>Hiệp Thương Dân Chủ</span>
          <span className="star-divider">✦</span>
          <span>Khoan Dung Độ Lượng</span>
          <span className="star-divider">✦</span>
        </TextItem>
        <TextItem className="gradient-gold">
          <span>Cầu Đồng Tồn Dị</span>
          <span className="star-divider">✦</span>
          <span>Sức Mạnh Dân Tộc</span>
          <span className="star-divider">+</span>
          <span>Sức Mạnh Thời Đại</span>
          <span className="star-divider">=</span>
          <span>Sức Mạnh Tổng Hợp</span>
          <span className="star-divider">★</span>
          <span>Hiệp Thương Dân Chủ</span>
          <span className="star-divider">✦</span>
          <span>Khoan Dung Độ Lượng</span>
          <span className="star-divider">✦</span>
        </TextItem>
      </Track>

      {/* Track 3 - Chạy sang trái */}
      <Track speed={38} direction="left">
        <TextItem className="blue">
          <span>Độc Lập Tự Chủ</span>
          <span className="star-divider">✦</span>
          <span>Tự Lực Cánh Sinh</span>
          <span className="star-divider">✦</span>
          <span>Đem Sức Ta Tự Giải Phóng Cho Ta</span>
          <span className="star-divider">★</span>
          <span>Nội Lực Là Cái Chiêng</span>
          <span className="star-divider">✦</span>
          <span>Ngoại Giao Là Cái Tiếng</span>
          <span className="star-divider">✦</span>
        </TextItem>
        <TextItem className="blue">
          <span>Độc Lập Tự Chủ</span>
          <span className="star-divider">✦</span>
          <span>Tự Lực Cánh Sinh</span>
          <span className="star-divider">✦</span>
          <span>Đem Sức Ta Tự Giải Phóng Cho Ta</span>
          <span className="star-divider">★</span>
          <span>Nội Lực Là Cái Chiêng</span>
          <span className="star-divider">✦</span>
          <span>Ngoại Giao Là Cái Tiếng</span>
          <span className="star-divider">✦</span>
        </TextItem>
      </Track>
    </Section>
  );
};

export default MarqueeBanner;
