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
  gap: 4rem;
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
  gap: 1.8rem;

  .sub-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;

    .badge {
      align-self: center;
    }

    h3 {
      font-size: clamp(1.4rem, 2vw, 1.8rem);
      color: #FFD700;
      margin: 0;
    }

    p {
      color: #94A3B8;
      font-size: 1rem;
      margin: 0;
      max-width: 850px;
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

      .badge-tag {
        background: rgba(56, 189, 248, 0.2);
        color: #38BDF8;
        border: 1px solid rgba(56, 189, 248, 0.4);
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

const ConclusionCallout = styled.div`
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 12px;
  padding: 14px 18px;
  color: #CBD5E1;
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
  text-align: center;
  font-style: italic;
`;

const CentralQuestionContainer = styled.div`
  background: rgba(15, 23, 42, 0.62);
  border: 2px solid #FFD700;
  border-radius: 22px;
  padding: 2.6rem 2.2rem;
  box-shadow: 0 16px 36px rgba(255, 215, 0, 0.15);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .question-heading {
    color: #FFD700;
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    font-weight: 800;
    margin: 0;
    line-height: 1.4;
  }

  .conclusion-text {
    color: #F8FAFC;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.6;
    margin: 0;
  }

  .dimensions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;

    @media (max-width: 868px) {
      grid-template-columns: 1fr;
    }
  }

  .dimension-card {
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 16px;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h4 {
      color: #38BDF8;
      font-size: 1.12rem;
      font-weight: 700;
      line-height: 1.4;
      margin: 0;
      border-bottom: 1px solid rgba(56, 189, 248, 0.2);
      padding-bottom: 8px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        color: #CBD5E1;
        font-size: 0.92rem;
        line-height: 1.6;
        padding-left: 20px;
        position: relative;

        &::before {
          content: "✦";
          position: absolute;
          left: 0;
          color: #FFD700;
          font-size: 0.85rem;
        }
      }
    }
  }
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
`;

const SolutionCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 14px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #38BDF8;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
  }

  .sol-num {
    font-size: 1.15rem;
    font-weight: 800;
    color: #FFD700;
  }

  h4 {
    color: #38BDF8;
    font-size: 0.98rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.35;
  }

  p {
    color: #CBD5E1;
    font-size: 0.88rem;
    line-height: 1.55;
    margin: 0;
  }
`;

const FullRowSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1.5rem 0;

  .split-row {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
    align-items: center;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(56, 189, 248, 0.25);
    border-radius: 20px;
    padding: 2.2rem 2.4rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: #FFD700;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .left-text {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      .main-lead {
        color: #F8FAFC;
        font-size: 1.05rem;
        line-height: 1.8;
        font-weight: 500;
        text-align: justify;
        margin: 0;
      }

      .quote-box {
        background: rgba(255, 215, 0, 0.08);
        border-left: 4px solid #FFD700;
        border-radius: 0 12px 12px 0;
        padding: 1.2rem 1.5rem;
        color: #FFD700;
        font-size: 1rem;
        font-style: italic;
        font-weight: 600;
        line-height: 1.6;
      }
    }

    .right-image-full {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;
      width: 100%;

      .img-container {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid rgba(255, 215, 0, 0.35);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        background: #020617;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.02);
        }

        img {
          width: 100%;
          height: auto;
          max-height: 380px;
          object-fit: cover;
          display: block;
        }
      }

      .caption {
        text-align: center;
        h4 {
          color: #FFD700;
          font-size: 1.02rem;
          font-weight: 700;
          margin: 0 0 4px 0;
        }
        p {
          color: #38BDF8;
          font-size: 0.88rem;
          font-style: italic;
          line-height: 1.5;
          margin: 0;
        }
      }
    }
  }
`;

const ChapterConclusionBox = styled.div`
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 16px;
  padding: 1.8rem 2rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    color: #38BDF8;
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    color: #E2E8F0;
    font-size: 0.95rem;
    line-height: 1.7;
    margin: 0;
    text-align: justify;
  }
`;

const HighlightSection = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(56, 189, 248, 0.3);
  border-radius: 20px;
  padding: 2.5rem 2.4rem;
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 1.8rem;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    h3 {
      color: #38BDF8;
      font-size: clamp(1.25rem, 1.8vw, 1.55rem);
      line-height: 1.35;
      margin: 0;
    }

    p {
      color: #CBD5E1;
      font-size: 0.96rem;
      line-height: 1.65;
      margin: 0;
    }
  }

  .right-media {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img-box {
      width: 100%;
      border-radius: 16px;
      overflow: hidden;
      border: 2px solid rgba(255, 215, 0, 0.45);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
      cursor: pointer;
      background: #080C14;

      img {
        width: 100%;
        height: auto;
        min-height: 280px;
        max-height: 420px;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;

        &:hover {
          transform: scale(1.03);
        }
      }
    }

    .caption {
      margin-top: 8px;
      text-align: center;
      color: #38BDF8;
      font-size: 0.88rem;
      font-style: italic;
    }
  }
`;

const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LessonCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: #EF4444;
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
  }

  .lesson-num {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #EF4444, #991B1B);
    color: #FFF;
    font-weight: 800;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  h4 {
    color: #FFD700;
    font-size: 1.08rem;
    margin-bottom: 8px;
    line-height: 1.35;
  }

  p {
    color: #94A3B8;
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const ModernApplication = () => {
  const { modernApplication } = chapter5Data;
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

      <Section id="modern-application">
        <Container>
          <HeaderBox>
            <h2>{modernApplication.title}</h2>
            <p className="subtitle">{modernApplication.subtitle}</p>
          </HeaderBox>

          {/* 5.3.1. Quán triệt tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế */}
          <SubsectionBox id="sec-5-3-1">
            <div className="sub-header">
              <h3>{modernApplication.partyCongressProgressionTitle}</h3>
            </div>

            <p style={{
              background: "rgba(56, 189, 248, 0.08)",
              borderLeft: "4px solid #38BDF8",
              borderRadius: "0 14px 14px 0",
              padding: "16px 20px",
              color: "#F8FAFC",
              fontSize: "0.98rem",
              fontWeight: "600",
              lineHeight: "1.65",
              margin: 0,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)"
            }}>
              {modernApplication.partyCongressLead}
            </p>

            <p style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: "1.6", margin: "0.4rem 0 0 0" }}>
              {modernApplication.fiveProgressionIntro}
            </p>

            <SwiperWrapper>
              <Swiper
                key="five-progression-swiper"
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
                {modernApplication.fiveProgressionCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <SlideCard
                      onClick={() =>
                        setModalImg({
                          img: card.image,
                          title: card.name,
                          desc: card.desc
                        })
                      }
                    >
                      <div className="img-box">
                        <img src={card.image} alt={card.name} />
                      </div>
                      <div className="info-box">
                        <div className="badge-wrap">
                          <span className="badge-tag">{card.badge}</span>
                          <span className="view-zoom">Xem ảnh lớn ↗</span>
                        </div>
                        <h4>{card.name}</h4>
                        <p className="target">Trọng tâm: {card.target}</p>
                        <p className="desc">{card.desc}</p>
                      </div>
                    </SlideCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrapper>

            <ConclusionCallout>
              {modernApplication.fiveProgressionSummary}
            </ConclusionCallout>
          </SubsectionBox>

          {/* 5.3.2. Xây dựng khối đại đoàn kết toàn dân tộc trên nền tảng liên minh công - nông - trí dưới sự lãnh đạo của Đảng */}
          <SubsectionBox id="sec-5-3-2">
            <div className="sub-header">
              <h3>{modernApplication.allianceSectionTitle}</h3>
            </div>

            {/* 5.3.2.a. Khối liên minh công - nông - trí */}
            <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.2rem", textAlign: "center" }}>
              {modernApplication.allianceSub1Title}
            </h4>

            {/* Hiển thị dạng hàng: Cột trái nội dung & Cột phải ảnh lớn nhìn full trọn vẹn */}
            {modernApplication.allianceRows && (
              <FullRowSection>
                {modernApplication.allianceRows.map((row) => (
                  <div key={row.id} className="split-row">
                    <div className="left-text">
                      <p className="main-lead">
                        {row.leadText}
                      </p>
                      {row.quote && (
                        <div className="quote-box">
                          “{row.quote}”
                        </div>
                      )}
                    </div>

                    <div className="right-image-full">
                      <div
                        className="img-container"
                        onClick={() =>
                          setModalImg({
                            img: row.image,
                            title: row.imageTitle,
                            desc: row.imageDesc
                          })
                        }
                      >
                        <img src={row.image} alt={row.imageTitle} />
                      </div>
                      <div className="caption">
                        <h4>{row.imageTitle}</h4>
                        <p>{row.imageDesc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </FullRowSection>
            )}

            {/* 5.3.2.b. 5 Vấn đề cơ bản để tăng cường khối đại đoàn kết toàn dân tộc */}
            {modernApplication.fiveKeySolutions && (
              <div style={{ marginTop: "1rem" }}>
                <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>
                  {modernApplication.fiveKeySolutionsTitle}
                </h4>
                <SolutionsGrid>
                  {modernApplication.fiveKeySolutions.map((sol, idx) => (
                    <SolutionCard key={idx}>
                      <div className="sol-num">{sol.num}</div>
                      <h4>{sol.title}</h4>
                      <p>{sol.desc}</p>
                    </SolutionCard>
                  ))}
                </SolutionsGrid>
              </div>
            )}
          </SubsectionBox>

          {/* 5.3.3. Đại đoàn kết toàn dân tộc phải kết hợp với đoàn kết quốc tế */}
          <SubsectionBox id="sec-5-3-3">
            <div className="sub-header">
              <h3>{modernApplication.internationalLessonsTitle}</h3>
              <p>{modernApplication.internationalLessonsSubtitle}</p>
            </div>

            {modernApplication.unPeacekeeping.concept && (
              <p style={{
                background: "rgba(56, 189, 248, 0.08)",
                borderLeft: "4px solid #38BDF8",
                borderRadius: "0 12px 12px 0",
                padding: "14px 18px",
                color: "#F8FAFC",
                fontSize: "0.98rem",
                fontWeight: "600",
                lineHeight: "1.65",
                margin: "0 0 1rem 0",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)"
              }}>
                {modernApplication.unPeacekeeping.concept}
              </p>
            )}

            {/* 5.3.3.a. Gìn giữ hòa bình Liên Hợp Quốc */}
            <HighlightSection>
              <div className="left-content">
                <span className="badge-blue" style={{ width: "fit-content" }}>DẤU ẤN HỘI NHẬP TOÀN CẦU</span>
                <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", margin: 0 }}>
                  {modernApplication.unPeacekeeping.sectionTitle}
                </h4>
                <h5 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600", margin: 0 }}>
                  {modernApplication.unPeacekeeping.title}
                </h5>
                <p style={{ color: "#FFD700", fontStyle: "italic", fontSize: "0.95rem" }}>
                  “Việt Nam sẵn sàng là bạn, là đối tác tin cậy và là thành viên tích cực, có trách nhiệm trong cộng đồng quốc tế.”
                </p>
              </div>
              <div className="right-media">
                <div
                  className="img-box"
                  onClick={() =>
                    setModalImg({
                      img: modernApplication.unPeacekeeping.image,
                      title: "Việt Nam Tham Gia Lực Lượng Gìn Giữ Hòa Bình Liên Hợp Quốc (UN)",
                      desc: "Việt Nam chính thức cử lực lượng tham gia các phái bộ gìn giữ hòa bình Liên Hợp Quốc từ năm 2014."
                    })
                  }
                >
                  <img src={modernApplication.unPeacekeeping.image} alt="Việt Nam tham gia gìn giữ hòa bình LHQ" />
                </div>
                {modernApplication.unPeacekeeping.imageCaption && (
                  <div className="caption">
                    (Ảnh: {modernApplication.unPeacekeeping.imageCaption})
                  </div>
                )}
              </div>
            </HighlightSection>

            {/* 5.3.3.b. 4 Bài học kinh nghiệm */}
            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.2rem", textAlign: "center" }}>
                {modernApplication.fourLessonsTitle}
              </h4>
              <LessonsGrid>
                {modernApplication.fourLessons.map((ls, idx) => (
                  <LessonCard key={idx}>
                    <div className="lesson-num">{ls.num}</div>
                    <h4>{ls.title}</h4>
                    <p>{ls.desc}</p>
                  </LessonCard>
                ))}
              </LessonsGrid>
            </div>

            {/* 5.3.3.c. Kết Luận Chương 5 */}
            {modernApplication.chapterConclusion && (
              <ChapterConclusionBox>
                <h4>{modernApplication.chapterConclusionTitle}</h4>
                <p>{modernApplication.chapterConclusion}</p>
              </ChapterConclusionBox>
            )}
          </SubsectionBox>

          {/* TỔNG KẾT & CÂU HỎI TRỌNG TÂM */}
          <SubsectionBox id="summary-focus-questions">
            <div className="sub-header">
              <span className="badge badge-red">TỔNG KẾT TOÀN DIỆN</span>
              <h3>Trả Lời Câu Hỏi Trọng Tâm</h3>
            </div>

            <CentralQuestionContainer>
              <h3 className="question-heading">
                {modernApplication.centralQuestion.question}
              </h3>
              <p className="conclusion-text">
                {modernApplication.centralQuestion.conclusion}
              </p>

              <div className="dimensions-grid">
                <div className="dimension-card">
                  <h4>{modernApplication.centralQuestion.dimension1.title}</h4>
                  <ul>
                    {modernApplication.centralQuestion.dimension1.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="dimension-card">
                  <h4>{modernApplication.centralQuestion.dimension2.title}</h4>
                  <ul>
                    {modernApplication.centralQuestion.dimension2.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CentralQuestionContainer>
          </SubsectionBox>
        </Container>
      </Section>
    </>
  );
};

export default ModernApplication;
