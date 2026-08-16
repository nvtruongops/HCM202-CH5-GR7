import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { chapter5Data } from "../../data/chapter5Data";
import ImageModal from "../ImageModal";

const Section = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
  background: transparent;
`;

const Container = styled.div`
  width: 92%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .badge {
    display: inline-flex;
    margin-bottom: 1.2rem;
  }

  h2 {
    font-size: clamp(1.8rem, 2.6vw, 2.5rem);
    color: #FFD700;
    margin: 0 0 0.8rem 0;
  }

  p.subtitle {
    color: #94A3B8;
    font-size: clamp(0.95rem, 1.1vw, 1.1rem);
    max-width: 800px;
    margin: 0 auto;
  }
`;

const SubsectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .sub-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;

    h3 {
      font-size: clamp(1.3rem, 1.8vw, 1.65rem);
      color: #FFD700;
      margin: 0;
    }

    p {
      color: #94A3B8;
      font-size: 0.95rem;
      max-width: 800px;
      margin: 0;
    }
  }
`;

const MainContentCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 20px;
  padding: 2.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.6rem 1.2rem;
  }

  h4.card-title {
    color: #38BDF8;
    font-size: clamp(1.15rem, 1.5vw, 1.3rem);
    font-weight: 700;
    line-height: 1.4;
    margin: 0;
    text-align: center;
  }

  .purpose-text {
    color: #CBD5E1;
    font-size: 0.96rem;
    line-height: 1.7;
    margin: 0;
    background: rgba(56, 189, 248, 0.08);
    border-left: 4px solid #38BDF8;
    padding: 14px 18px;
    border-radius: 0 12px 12px 0;

    strong {
      color: #FFD700;
    }
  }

  .formula-title {
    color: #FFD700;
    font-weight: 700;
    font-size: 1.05rem;
    text-align: center;
    margin-top: 0.5rem;
  }

  .formula-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1.15fr;
    align-items: center;
    gap: 1.2rem;
    margin: 0.8rem 0;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .formula-card {
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 14px;
    padding: 1.4rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;

    h4 {
      color: #38BDF8;
      font-size: 1.02rem;
      font-weight: 700;
      margin: 0;
      border-bottom: 1px solid rgba(56, 189, 248, 0.2);
      padding-bottom: 6px;
      text-align: center;
    }

    &.result {
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(15, 23, 42, 0.8));
      border: 1.5px solid #FFD700;
      box-shadow: 0 8px 25px rgba(255, 215, 0, 0.15);

      h4 {
        color: #FFD700;
        border-bottom-color: rgba(255, 215, 0, 0.3);
      }

      p {
        color: #F8FAFC;
        font-size: 0.88rem;
        line-height: 1.55;
        margin: 0;
        text-align: center;
      }
    }

    .point-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li {
        color: #CBD5E1;
        font-size: 0.86rem;
        line-height: 1.45;
        padding-left: 14px;
        position: relative;

        &::before {
          content: "✦";
          color: #FFD700;
          position: absolute;
          left: 0;
          font-size: 0.75rem;
        }
      }
    }
  }

  .operator {
    color: #FFD700;
    font-size: 1.6rem;
    font-weight: 900;
    text-align: center;

    @media (max-width: 968px) {
      transform: rotate(90deg);
    }
  }

  .breakthrough-box {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 14px;
    padding: 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .quote-text {
      color: #FFD700;
      font-style: italic;
      font-size: 0.95rem;
      line-height: 1.6;
      strong {
        font-style: normal;
        color: #FFF;
      }
    }

    .insight-text {
      color: #94A3B8;
      font-size: 0.88rem;
      line-height: 1.55;
      border-top: 1px dashed rgba(255, 255, 255, 0.1);
      padding-top: 8px;
      p {
        margin: 0;
      }
    }
  }

  .connect-quote-box {
    background: linear-gradient(135deg, rgba(211, 47, 47, 0.15), rgba(15, 23, 42, 0.6));
    border-left: 4px solid #D32F2F;
    border-radius: 0 12px 12px 0;
    padding: 1.2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 6px;

    strong {
      color: #FFD700;
      font-size: 0.95rem;
    }

    p {
      color: #F8FAFC;
      font-style: italic;
      font-size: 0.92rem;
      line-height: 1.6;
      margin: 0;
    }
  }

  .anti-trends-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(239, 68, 68, 0.35);
    border-radius: 14px;
    padding: 1.3rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .anti-title {
      color: #F8FAFC;
      font-size: 0.92rem;
      font-weight: 600;
      line-height: 1.5;
    }

    .anti-tags {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 4px;

      .anti-tag {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #FF8A80;
        font-size: 0.84rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 8px;
      }
    }
  }

  .victory-box {
    background: linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(15, 23, 42, 0.6));
    border-left: 4px solid #38BDF8;
    border-radius: 0 12px 12px 0;
    padding: 1.2rem 1.5rem;
    color: #F8FAFC;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.6;
  }

  .lead-callout {
    background: rgba(56, 189, 248, 0.08);
    border-left: 4px solid #38BDF8;
    border-radius: 0 12px 12px 0;
    padding: 14px 18px;
    color: #CBD5E1;
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0;
  }

  .conclusion-callout {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    padding: 14px 18px;
    color: #F8FAFC;
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0;

    strong {
      color: #FFD700;
    }
  }
`;

const ForcesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 0.5rem 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .force-card {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 16px;
    padding: 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #FFD700;
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }

    h4 {
      color: #FFD700;
      font-size: 1.08rem;
      font-weight: 700;
      line-height: 1.45;
      margin: 0;
    }

    p {
      color: #CBD5E1;
      font-size: 0.88rem;
      line-height: 1.6;
      margin: 0;
    }
  }
`;

const SwiperWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 0 1.5rem 0;

  .swiper {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: clamp(340px, 85vw, 640px);
    border-radius: 24px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.75);
    border: 1.5px solid rgba(56, 189, 248, 0.35);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;

    @media (max-width: 640px) {
      width: 90vw;
    }

    &:hover {
      border-color: #FFD700;
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(255, 215, 0, 0.25);
    }
  }

  .swiper-pagination-bullet {
    background: #94A3B8;
  }

  .swiper-pagination-bullet-active {
    background: #FFD700;
    width: 28px;
    border-radius: 14px;
  }
`;

const SlideCard = styled.div`
  display: flex;
  flex-direction: column;

  .img-box {
    width: 100%;
    height: clamp(260px, 34vw, 380px);
    overflow: hidden;
    position: relative;
    background: #080C14;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      transition: transform 0.4s ease;
    }
  }

  &:hover .img-box img {
    transform: scale(1.05);
  }

  .info-box {
    padding: 1.8rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 640px) {
      padding: 1.4rem 1.2rem;
    }

    .badge-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .badge-red {
        background: rgba(211, 47, 47, 0.25);
        color: #FF8A80;
        border: 1px solid rgba(211, 47, 47, 0.5);
        border-radius: 8px;
        padding: 4px 12px;
        font-size: 0.84rem;
        font-weight: 700;
      }

      .view-zoom {
        font-size: 0.82rem;
        color: #FFD700;
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 600;
      }
    }

    h4 {
      color: #FFD700;
      font-size: clamp(1.2rem, 1.6vw, 1.35rem);
      font-weight: 700;
      line-height: 1.4;
      margin: 0;
    }

    p.target {
      color: #38BDF8;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.5;
      margin: 0;
    }

    p.desc {
      color: #E2E8F0;
      font-size: 0.94rem;
      line-height: 1.65;
      margin: 0;
    }
  }
`;

const PrincipleBlock = styled.div`
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 20px;
  padding: 2.2rem 2.4rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.6rem 1.2rem;
  }

  .principle-heading {
    color: #38BDF8;
    font-size: clamp(1.15rem, 1.5vw, 1.35rem);
    font-weight: 700;
    border-bottom: 1px solid rgba(56, 189, 248, 0.2);
    padding-bottom: 8px;
    margin: 0;
  }

  p.principle-paragraph {
    color: #CBD5E1;
    font-size: 0.96rem;
    line-height: 1.7;
    margin: 0;
  }

  .quote-highlight {
    background: linear-gradient(135deg, rgba(211, 47, 47, 0.2), rgba(15, 23, 42, 0.45));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-left: 4px solid #FFD700;
    border-radius: 0 12px 12px 0;
    padding: 1.2rem 1.6rem;
    color: #FFF;
    font-style: italic;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.6;
    margin: 0.2rem 0;
  }

  .mechanism-box {
    background: rgba(56, 189, 248, 0.08);
    border-left: 4px solid #38BDF8;
    border-radius: 0 12px 12px 0;
    padding: 1.2rem 1.6rem;
    color: #CBD5E1;
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0;

    strong {
      color: #38BDF8;
    }
  }
`;

const InternationalUnity = () => {
  const { internationalUnity } = chapter5Data;
  const [modalImg, setModalImg] = useState(null);

  return (
    <>
      <ImageModal
        isOpen={!!modalImg}
        imageSrc={modalImg?.img}
        title={modalImg?.title}
        desc={modalImg?.desc}
        onClose={() => setModalImg(null)}
      />

      <Section id="international-unity">
        <Container>
          <HeaderBox>
            <h2>{internationalUnity.title}</h2>
            <p className="subtitle">{internationalUnity.subtitle}</p>
          </HeaderBox>

          {/* 5.2.1. Sự cần thiết phải đoàn kết quốc tế */}
          <SubsectionBox id="sec-5-2-1">
            <div className="sub-header">
              <h3>{internationalUnity.necessity.title}</h3>
            </div>

            {/* 5.2.1.a */}
            <MainContentCard>
              <h4 className="card-title">
                {internationalUnity.necessity.partA.title}
              </h4>
              <p className="purpose-text">
                <strong>{internationalUnity.necessity.partA.purposeTitle} </strong>
                {internationalUnity.necessity.partA.purpose}
              </p>

              <div className="formula-title">
                {internationalUnity.necessity.partA.formulaTitle}
              </div>

              <div className="formula-grid">
                <div className="formula-card">
                  <h4>{internationalUnity.necessity.partA.nationalTitle}</h4>
                  <ul className="point-list">
                    {internationalUnity.necessity.partA.nationalPoints.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <span className="operator">+</span>

                <div className="formula-card">
                  <h4>{internationalUnity.necessity.partA.eraTitle}</h4>
                  <ul className="point-list">
                    {internationalUnity.necessity.partA.eraPoints.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <span className="operator">=</span>

                <div className="formula-card result">
                  <h4>Sức Mạnh Tổng Hợp</h4>
                  <p>{internationalUnity.formula.resultDesc}</p>
                </div>
              </div>

              <div className="breakthrough-box">
                <div className="quote-text">
                  <strong>{internationalUnity.necessity.partA.quoteTitle} </strong>
                  “{internationalUnity.necessity.partA.quote}”
                </div>
                <div className="insight-text">
                  {internationalUnity.necessity.partA.insightLines.map((line, idx) => (
                    <p key={idx} style={{ margin: idx === 0 ? "0 0 6px 0" : 0 }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </MainContentCard>

            {/* 5.2.1.b */}
            <MainContentCard>
              <h4 className="card-title">
                {internationalUnity.necessity.partB.title}
              </h4>
              
              <p style={{ color: "#CBD5E1", fontSize: "0.96rem", lineHeight: "1.7", margin: 0, textAlign: "center" }}>
                {internationalUnity.necessity.partB.intro}
              </p>

              <div className="connect-quote-box">
                <strong>{internationalUnity.necessity.partB.connectQuote}</strong>
                <p>“{internationalUnity.necessity.partB.connectQuoteDetail}”</p>
              </div>

              <div className="anti-trends-card">
                <div className="anti-title">
                  {internationalUnity.necessity.partB.antiTrendsLead}
                </div>
                <div className="anti-title">
                  {internationalUnity.necessity.partB.antiTrendsTitle}
                </div>
                <div className="anti-tags">
                  {internationalUnity.necessity.partB.antiTrendsList.map((tag, idx) => (
                    <span className="anti-tag" key={idx}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="victory-box">
                {internationalUnity.necessity.partB.victoryConclusion}
              </div>
            </MainContentCard>
          </SubsectionBox>

          {/* 5.2.2. Lực lượng đoàn kết quốc tế và hình thức tổ chức */}
          <SubsectionBox id="sec-5-2-2">
            <div className="sub-header">
              <h3>{internationalUnity.forcesTitle}</h3>
            </div>

            {/* 5.2.2.a. Ba lực lượng quốc tế cần đoàn kết */}
            <MainContentCard>
              <h4 className="card-title">
                {internationalUnity.forcesSub1Title}
              </h4>
              <p className="lead-callout">
                {internationalUnity.forcesIntro}
              </p>
              <ForcesContainer>
                {internationalUnity.forcesList.map((f, idx) => (
                  <div className="force-card" key={idx}>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </ForcesContainer>
              <div className="conclusion-callout">
                <strong>Mục đích tập hợp: </strong>
                {internationalUnity.forcesConclusion}
              </div>
            </MainContentCard>

            {/* 5.2.2.b. Mô hình bốn tầng mặt trận đoàn kết */}
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.8rem", textAlign: "center" }}>
                {internationalUnity.forcesSub2Title}
              </h4>
              <p style={{
                background: "rgba(56, 189, 248, 0.08)",
                borderLeft: "4px solid #38BDF8",
                borderRadius: "0 14px 14px 0",
                padding: "14px 18px",
                color: "#F8FAFC",
                fontSize: "0.98rem",
                fontWeight: "600",
                lineHeight: "1.65",
                margin: "0 0 0.5rem 0",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)"
              }}>
                {internationalUnity.fourFrontsIntro}
              </p>

              <SwiperWrapper>
                <Swiper
                  key="four-fronts-swiper"
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  initialSlide={0}
                  observer={true}
                  observeParents={true}
                  slideToClickedSlide={true}
                  onSwiper={(swiper) => {
                    swiper.slideTo(0, 0);
                  }}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {internationalUnity.fourFronts.map((front) => (
                    <SwiperSlide key={front.id}>
                      <SlideCard
                        onClick={() =>
                          setModalImg({
                            img: front.image,
                            title: front.name,
                            desc: front.desc
                          })
                        }
                      >
                        <div className="img-box">
                          <img src={front.image} alt={front.name} />
                        </div>
                        <div className="info-box">
                          <div className="badge-wrap">
                            <span className="badge-red">{front.badge}</span>
                            <span className="view-zoom">Xem ảnh lớn ↗</span>
                          </div>
                          <h4>{front.name}</h4>
                          <p className="target">Mục tiêu: {front.target}</p>
                          <p className="desc">{front.desc}</p>
                        </div>
                      </SlideCard>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperWrapper>

              <div style={{
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: "12px",
                padding: "14px 18px",
                color: "#CBD5E1",
                fontSize: "0.95rem",
                lineHeight: "1.65",
                margin: "0.5rem 0 0 0",
                textAlign: "center",
                fontStyle: "italic"
              }}>
                {internationalUnity.fourFrontsSummary}
              </div>
            </div>
          </SubsectionBox>

          {/* 5.2.3. Nguyên tắc đoàn kết quốc tế */}
          <SubsectionBox id="sec-5-2-3">
            <div className="sub-header">
              <h3>{internationalUnity.principlesTitle}</h3>
              <p>{internationalUnity.principlesSubtitle}</p>
            </div>

            {internationalUnity.principles.map((pr, idx) => (
              <PrincipleBlock key={idx}>
                <h4 className="principle-heading">
                  {pr.title}
                </h4>
                {pr.paragraphs && pr.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="principle-paragraph">
                    {para}
                  </p>
                ))}
                {pr.desc && (
                  <p className="principle-paragraph">
                    {pr.desc}
                  </p>
                )}
                {pr.quote && (
                  <div className="quote-highlight">
                    {pr.quote}
                  </div>
                )}
                {pr.mechanism && (
                  <div className="mechanism-box">
                    <strong>
                      {pr.id === "5.2.3.a" ? "Cơ chế đan cài lợi ích: " : "Triết lý cốt lõi: "}
                    </strong>
                    {pr.mechanism}
                  </div>
                )}
              </PrincipleBlock>
            ))}
          </SubsectionBox>
        </Container>
      </Section>
    </>
  );
};

export default InternationalUnity;
