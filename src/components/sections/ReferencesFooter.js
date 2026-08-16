import React from "react";
import styled from "styled-components";
import { chapter5Data } from "../../data/chapter5Data";

const FooterContainer = styled.footer`
  width: 100%;
  background: rgba(9, 13, 22, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 215, 0, 0.25);
  padding: 5rem 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 92%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3.5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .logo-box {
    display: flex;
    align-items: center;
    gap: 12px;

    .star {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #D32F2F, #8B0000);
      border: 2px solid #FFD700;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFD700;
      font-size: 1.2rem;
    }

    h3 {
      color: #FFD700;
      font-size: 1.25rem;
    }
  }

  p {
    color: #94A3B8;
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .quick-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    a {
      color: #38BDF8;
      font-size: 0.88rem;

      &:hover {
        color: #FFD700;
        text-decoration: underline;
      }
    }
  }
`;

const ReferencesCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    color: #FFD700;
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ul.ref-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      background: rgba(30, 41, 59, 0.4);
      border-left: 3px solid rgba(255, 215, 0, 0.4);
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      color: #CBD5E1;
      font-size: 0.88rem;
      line-height: 1.5;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(30, 41, 59, 0.8);
        border-color: #FFD700;
      }
    }
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    color: #64748B;
    font-size: 0.85rem;
  }

  .back-top {
    color: #FFD700;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ReferencesFooter = () => {
  const { references } = chapter5Data;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <FooterContainer>
      <Container>
        <TopGrid>
          <InfoCol>
            <div className="logo-box">
              <div className="star">★</div>
              <h3>HCM202 • Tư Tưởng Hồ Chí Minh</h3>
            </div>
            <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: "1.7" }}>
              Tài liệu học tập và tra cứu tương tác số hóa toàn bộ nội dung<br />
              <strong style={{ color: "#F8FAFC" }}>Chương 5: Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế</strong>.
            </p>
            <div className="quick-links">
              <a href="#overview">Tổng quan</a>
              <a href="#great-unity">Đại đoàn kết dân tộc</a>
              <a href="#front-timeline">Lịch sử Mặt trận</a>
              <a href="#historical-showcase">Thư viện lịch sử</a>
              <a href="#international-unity">Đoàn kết quốc tế</a>
              <a href="#modern-application">Vận dụng hiện nay</a>
              <a href="#quiz-section">Ôn tập Quiz</a>
            </div>
          </InfoCol>

          <ReferencesCol>
            <h4>Danh Mục Tài Liệu Tham Khảo Chính Thống</h4>
            <ul className="ref-list">
              {references.map((ref) => (
                <li key={ref.id}>
                  <strong>[{ref.id}]</strong> {ref.text}
                </li>
              ))}
            </ul>
          </ReferencesCol>
        </TopGrid>

        <BottomBar>
          <p>© 2026 HCM202 Bộ Môn Lý Luận Chính Trị. Mọi thông tin tuân thủ giáo trình chính quy.</p>
          <span className="back-top" onClick={scrollToTop}>
            ↑ Về Đầu Trang
          </span>
        </BottomBar>
      </Container>
    </FooterContainer>
  );
};

export default ReferencesFooter;
