import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import { chapter5Data } from "../../data/chapter5Data";
import StatueHero3D from "../three/StatueHero3D";

const Section = styled.section`
  min-height: 94vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: calc(${props => props.theme.navHeight} + 1.2rem);
  padding-bottom: 3.5rem;
  background: transparent;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    right: 5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent 70%);
    filter: blur(60px);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.1), transparent 70%);
    filter: blur(50px);
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: 92%;
  max-width: 1350px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.8rem;
  align-items: center;
  position: relative;
  z-index: 5;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.2rem;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  .meta-tags {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      justify-content: center;
    }
  }

  h1 {
    font-size: clamp(2rem, 3.2vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    color: #FFFFFF;
    letter-spacing: -0.02em;

    span.gold {
      background: linear-gradient(135deg, #FFD700 0%, #F59E0B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 35px rgba(255, 215, 0, 0.3);
    }
  }

  .typewriter-wrapper {
    font-size: clamp(1.02rem, 1.35vw, 1.22rem);
    font-style: italic;
    color: #38BDF8;
    min-height: 2.8rem;
    font-weight: 500;
    border-left: 3px solid #FFD700;
    padding-left: 1rem;
    display: flex;
    align-items: center;

    @media (max-width: 1024px) {
      justify-content: center;
      border-left: none;
      border-bottom: 2px solid #FFD700;
      padding-bottom: 0.5rem;
    }
  }

  p.description {
    color: #94A3B8;
    font-size: clamp(0.92rem, 1.05vw, 1rem);
    line-height: 1.65;
    max-width: 650px;

    @media (max-width: 1024px) {
      margin: 0 auto;
    }
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Hero3DWrapper = styled.div`
  width: 100%;
  max-width: 540px;
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .card-info {
    text-align: center;
    margin-top: 8px;

    h3 {
      color: #FFD700;
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 4px;
      text-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
    }

    p.sub {
      color: #CBD5E1;
      font-size: 0.92rem;
      line-height: 1.4;
    }
  }
`;

const Hero = () => {
  const { header } = chapter5Data;

  return (
    <Section id="home">
      <Container>
        <LeftBox>
          <div className="meta-tags">
            <span className="badge-gold">{header.courseCode} • {header.chapterNum}</span>
          </div>

          <h1>
            Tư Tưởng Hồ Chí Minh Về <br />
            <span className="gold">Đại Đoàn Kết Toàn Dân Tộc</span> <br />
            & Đoàn Kết Quốc Tế
          </h1>

          <div className="typewriter-wrapper">
            <Typewriter
              options={{
                strings: header.typewriterQuotes,
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 25
              }}
            />
          </div>

          <p className="description">
            Trang bị thế giới quan và phương pháp luận khoa học về sức mạnh vô địch của khối đại đoàn kết toàn dân tộc, kết hợp sức mạnh dân tộc với sức mạnh thời đại, và sự vận dụng sáng tạo của Đảng trong sự nghiệp Đổi mới và Hội nhập quốc tế.
          </p>
        </LeftBox>

        <RightBox>
          <Hero3DWrapper>
            <StatueHero3D />
            <div className="card-info">
              <h3>Tượng Chủ Tịch Hồ Chí Minh</h3>
              <p className="sub">(1890 – 1969)</p>
            </div>
          </Hero3DWrapper>
        </RightBox>
      </Container>
    </Section>
  );
};

export default Hero;
