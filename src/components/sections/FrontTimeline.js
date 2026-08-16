import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { chapter5Data } from "../../data/chapter5Data";
import ImageModal from "../ImageModal";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
  background-color: #0B1120;
  overflow: hidden;
`;

const Container = styled.div`
  width: 94%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3.5rem;

  .badge {
    display: inline-flex;
    margin-bottom: 1.2rem;
  }

  h2 {
    font-size: clamp(1.8rem, 2.6vw, 2.5rem);
    color: #FFD700;
    margin: 0 0 1rem 0;
  }

  p {
    color: #94A3B8;
    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
    max-width: 850px;
    margin: 0 auto;
  }
`;

const InfographicBanner = styled.div`
  width: 100%;
  max-width: 1250px;
  background: rgba(30, 41, 59, 0.7);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 4rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-4px);
    box-shadow: 0 25px 55px rgba(255, 215, 0, 0.2);

    img {
      transform: scale(1.02);
    }
  }

  img {
    width: 100%;
    height: auto;
    max-height: 520px;
    object-fit: contain;
    background: #0F172A;
    display: block;
    transition: transform 0.4s ease;
  }

  .caption {
    padding: 14px 20px;
    background: #0F172A;
    color: #FFD700;
    font-size: 0.92rem;
    font-weight: 600;
    text-align: center;
    border-top: 1px solid rgba(255, 215, 0, 0.2);
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding: 1rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: rgba(255, 215, 0, 0.15);
    transform: translateX(-50%);

    @media (max-width: 860px) {
      left: 24px;
    }
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 0%;
  background: linear-gradient(180deg, #FFD700 0%, #D32F2F 50%, #38BDF8 100%);
  transform: translateX(-50%);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
  z-index: 2;

  @media (max-width: 860px) {
    left: 24px;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.align === "left" ? "flex-start" : "flex-end"};
  position: relative;
  margin-bottom: 3.5rem;
  width: 100%;

  @media (max-width: 860px) {
    justify-content: flex-start;
    padding-left: 56px;
  }

  .node-point {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: #0F172A;
    border: 3px solid #FFD700;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
    transition: all 0.3s ease;
    cursor: pointer;

    @media (max-width: 860px) {
      left: 24px;
    }
  }

  &:hover .node-point {
    background: #D32F2F;
    border-color: #FFF080;
    transform: translateX(-50%) scale(1.35);
  }
`;

const TimelineCard = styled.div`
  width: 45%;
  max-width: 560px;
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 18px;
  padding: 2rem 2.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 860px) {
    width: 100%;
    max-width: 100%;
  }

  &:hover {
    border-color: #FFD700;
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.25);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 8px;

    .year {
      font-size: 1.4rem;
      font-weight: 800;
      color: #FFD700;
      font-family: 'Montserrat', sans-serif;
    }
  }

  h4 {
    color: #FFFFFF;
    font-size: 1.2rem;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  p {
    color: #CBD5E1;
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .source-tag {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #38BDF8;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 3px 8px;
    background: rgba(56, 189, 248, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(56, 189, 248, 0.25);
  }
`;

/* ==========================================================================
   Widescreen Horizontal 2-Column Modal Lightbox (Scale-out Layout)
   ========================================================================== */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(5, 10, 20, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  animation: fadeInModal 0.25s ease-out;

  @keyframes fadeInModal {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 1100px;
  max-height: 92vh;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 1));
  border: 2px solid #FFD700;
  border-radius: 24px;
  padding: 2.2rem 2.6rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;
  position: relative;
  animation: scaleUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUpModal {
    from { transform: scale(0.92); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 860px) {
    padding: 1.6rem 1.4rem;
  }

  .close-btn {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #FFD700;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 215, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #D32F2F;
      color: #FFF;
      border-color: #EF4444;
      transform: scale(1.1);
    }
  }

  .modal-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 45px;

    .tags-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      .year-badge {
        font-size: 1.35rem;
        font-weight: 800;
        color: #FFD700;
        font-family: 'Montserrat', sans-serif;
      }
    }

    h3 {
      color: #FFFFFF;
      font-size: clamp(1.3rem, 1.9vw, 1.75rem);
      line-height: 1.35;
      margin: 0;
    }
  }

  /* Horizontal 2-Column Split Content */
  .modal-horizontal-body {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 2rem;
    align-items: stretch;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .left-column {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: space-between;

      .modal-image-wrap {
        width: 100%;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid rgba(255, 215, 0, 0.35);
        background: #080C14;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

        img {
          width: 100%;
          height: auto;
          max-height: 320px;
          object-fit: cover;
          display: block;
        }
      }

      .source-card {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 12px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .source-label {
          color: #94A3B8;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        a.external-link {
          background: linear-gradient(135deg, #1E40AF, #1D4ED8);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #38BDF8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);

          &:hover {
            background: linear-gradient(135deg, #2563EB, #1E40AF);
            border-color: #FFD700;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(56, 189, 248, 0.4);
          }
        }
      }
    }

    .right-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: space-between;

      .detail-block {
        background: rgba(15, 23, 42, 0.7);
        border-left: 3.5px solid #38BDF8;
        border-radius: 0 10px 10px 0;
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        h5 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
        }

        p {
          color: #CBD5E1;
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
        }
      }
    }
  }
`;

const FrontTimeline = () => {
  const { frontTimelineData } = chapter5Data;
  const wrapperRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  const [modalImage, setModalImage] = useState(null);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedTimelineItem(null);
        setModalImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Vertical timeline progress line filling
      if (lineRef.current && wrapperRef.current) {
        gsap.to(lineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 70%",
            end: "bottom 85%",
            scrub: 0.5
          }
        });
      }

      // 2. Timeline items reveal
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: isLeft ? -50 : 50,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="front-timeline">
      <Container>
        <HeaderBox>
          <span className="badge badge-gold">TIẾN TRÌNH LỊCH SỬ</span>
          <h2>{frontTimelineData.title}</h2>
          <p>{frontTimelineData.subtitle}</p>
        </HeaderBox>

        {/* Infographic Banner Tổng Thể */}
        <InfographicBanner
          onClick={() =>
            setModalImage({
              src: frontTimelineData.bannerImage,
              title: "Sơ Đồ Tiến Trình Mặt Trận Dân Tộc Thống Nhất (1930 - Nay)",
              desc: "Infographic tổng quan 8 mốc son lịch sử vẻ vang của Mặt trận Dân tộc Thống nhất Việt Nam."
            })
          }
        >
          <img
            src={frontTimelineData.bannerImage}
            alt="Sơ đồ tiến trình Mặt trận Dân tộc Thống nhất"
            loading="lazy"
          />
          <div className="caption">
            ✦ Sơ đồ tiến trình phát triển Mặt trận Dân tộc Thống nhất Việt Nam (1930 - Nay)
          </div>
        </InfographicBanner>

        {/* Vertical Timeline Nodes */}
        <TimelineWrapper ref={wrapperRef}>
          <TimelineLine ref={lineRef} />

          {frontTimelineData.timeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <TimelineItem
                key={item.id || index}
                align={isLeft ? "left" : "right"}
                ref={(el) => (itemsRef.current[index] = el)}
              >
                <div
                  className="node-point"
                  onClick={() => setSelectedTimelineItem(item)}
                  title="Nhấp để xem chi tiết sự kiện"
                />

                <TimelineCard onClick={() => setSelectedTimelineItem(item)}>
                  <div className="card-header">
                    <span className="year">{item.year}</span>
                    <span className="badge badge-red">{item.tag}</span>
                  </div>

                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>

                  <div className="source-tag">
                    <span>🔍 Xem ảnh & sự kiện chi tiết ↗</span>
                  </div>
                </TimelineCard>
              </TimelineItem>
            );
          })}
        </TimelineWrapper>
      </Container>

      {/* Modal Lightbox for Infographic Banner */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage?.src}
        title={modalImage?.title}
        desc={modalImage?.desc}
      />

      {/* Horizontal Widescreen Detail Lightbox */}
      {selectedTimelineItem && (
        <ModalOverlay onClick={() => setSelectedTimelineItem(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedTimelineItem(null)}
              aria-label="Đóng"
            >
              ✕
            </button>

            <div className="modal-header">
              <div className="tags-row">
                <span className="year-badge">Năm {selectedTimelineItem.year}</span>
                <span className="badge badge-red">{selectedTimelineItem.tag}</span>
              </div>
              <h3>{selectedTimelineItem.name}</h3>
            </div>

            {/* Horizontal 2-Column Split Body */}
            <div className="modal-horizontal-body">
              {/* Left Column: Image & Official Link Card */}
              <div className="left-column">
                {selectedTimelineItem.image && (
                  <div className="modal-image-wrap">
                    <img
                      src={selectedTimelineItem.image}
                      alt={selectedTimelineItem.name}
                      loading="lazy"
                    />
                  </div>
                )}

                {selectedTimelineItem.source && (
                  <div className="source-card">
                    <span className="source-label">
                      Tài liệu chính thống từ: <strong>{selectedTimelineItem.source.name}</strong>
                    </span>

                    <a
                      href={selectedTimelineItem.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      <span>🔗 {selectedTimelineItem.source.verified}</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: 3 Detailed Historical Analysis Blocks */}
              <div className="right-column">
                {selectedTimelineItem.details?.context && (
                  <div className="detail-block" style={{ borderLeftColor: "#38BDF8" }}>
                    <h5 style={{ color: "#38BDF8" }}>Bối Cảnh Lịch Sử Ra Đời:</h5>
                    <p>{selectedTimelineItem.details.context}</p>
                  </div>
                )}

                {selectedTimelineItem.details?.coreMission && (
                  <div className="detail-block" style={{ borderLeftColor: "#FFD700" }}>
                    <h5 style={{ color: "#FFD700" }}>Nhiệm Vụ & Mục Tiêu Cốt Lõi:</h5>
                    <p>{selectedTimelineItem.details.coreMission}</p>
                  </div>
                )}

                {selectedTimelineItem.details?.keyMilestone && (
                  <div className="detail-block" style={{ borderLeftColor: "#10B981" }}>
                    <h5 style={{ color: "#10B981" }}>Mốc Son & Tác Động Cách Mạng:</h5>
                    <p>{selectedTimelineItem.details.keyMilestone}</p>
                  </div>
                )}
              </div>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default FrontTimeline;
