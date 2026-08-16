import React from "react";
import styled from "styled-components";
import quoteGif from "../../assets/slide_images/Session_19_slide_4_img_1.gif";

const Section = styled.section`
  width: 100%;
  padding: 4.5rem 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainQuoteCard = styled.div`
  background: rgba(15, 23, 42, 0.62);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 24px;
  padding: 3rem 2.8rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 215, 0, 0.12);
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 3rem;
  align-items: center;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 2.2rem 1.8rem;
    gap: 2rem;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-align: left;
    position: relative;
    z-index: 2;

    .quote-symbol {
      font-size: 4.5rem;
      color: rgba(255, 215, 0, 0.3);
      line-height: 0.8;
      font-family: serif;
    }

    blockquote {
      font-size: clamp(1.35rem, 2vw, 1.8rem);
      font-weight: 800;
      color: #FFD700;
      line-height: 1.45;
      margin: 0;
      letter-spacing: 0.02em;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    p.explanation {
      color: #CBD5E1;
      font-size: 1rem;
      line-height: 1.7;
      margin: 0;
      text-align: justify;
    }

    .author-tag {
      color: #38BDF8;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      border-left: 3px solid #FFD700;
      padding-left: 12px;
    }
  }

  .right-media {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .img-frame {
      width: 100%;
      border-radius: 18px;
      overflow: hidden;
      border: 2px solid rgba(255, 215, 0, 0.4);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
      background: #0B1120;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }

      img {
        width: 100%;
        height: auto;
        max-height: 380px;
        object-fit: contain;
        display: block;
      }
    }
  }
`;

const QuoteShowcase = () => {
  return (
    <Section>
      <Container>
        <MainQuoteCard>
          <div className="left-content">
            <div className="quote-symbol">“</div>
            <blockquote>
              Đoàn kết, đoàn kết, đại đoàn kết!<br />
              Thành công, thành công, đại thành công!
            </blockquote>
            <p className="explanation">
              Chân lý bất hủ được Chủ tịch Hồ Chí Minh đúc kết, khẳng định sức mạnh vô địch của khối đại đoàn kết toàn dân tộc là nhân tố then chốt quyết định mọi thắng lợi của sự nghiệp cách mạng Việt Nam.
            </p>
            <div className="author-tag">— Chủ tịch Hồ Chí Minh (Bài nói chuyện tại lớp bồi dưỡng cán bộ, 1961)</div>
          </div>

          <div className="right-media">
            <div className="img-frame">
              <img src={quoteGif} alt="Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công" />
            </div>
          </div>
        </MainQuoteCard>
      </Container>
    </Section>
  );
};

export default QuoteShowcase;
