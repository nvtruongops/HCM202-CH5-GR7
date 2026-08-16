import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { chapter5Data } from "../../data/chapter5Data";
import ImageModal from "../ImageModal";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #0B1120;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PinnedSide = styled.div`
  width: 30vw;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(11, 17, 32, 0.98));
  border-right: 1px solid rgba(255, 215, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 3rem;
  z-index: 10;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 968px) {
    width: 100%;
    min-height: 35vh;
    padding: 3rem 1.5rem;
    border-right: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.25);
  }

  .badge {
    margin-bottom: 1rem;
    width: fit-content;
  }

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 2.8rem);
    color: #FFD700;
    line-height: 1.25;
    margin-bottom: 1.2rem;
  }

  p {
    color: #94A3B8;
    font-size: clamp(0.9rem, 1.1vw, 1.05rem);
    line-height: 1.7;
  }
`;

const HorizontalTrack = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding-left: 3rem;
  padding-right: 10rem;
  gap: 2.5rem;
  width: max-content;

  @media (max-width: 968px) {
    min-height: auto;
    padding: 2.5rem 1.5rem;
    overflow-x: auto;
  }
`;

const GalleryCard = styled.div`
  width: 440px;
  height: 600px;
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD700;
    box-shadow: 0 25px 50px rgba(255, 215, 0, 0.25);

    .card-img img {
      transform: scale(1.08);
    }

    .zoom-overlay {
      opacity: 1;
    }
  }

  .card-img {
    width: 100%;
    height: 320px;
    overflow: hidden;
    position: relative;
    background: #080C14;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      transition: transform 0.5s ease;
    }

    .year-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid #FFD700;
      color: #FFD700;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 5px 12px;
      border-radius: 8px;
      z-index: 2;
    }

    .zoom-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 3;

      .zoom-pill {
        background: rgba(255, 215, 0, 0.9);
        color: #0F172A;
        font-weight: 700;
        font-size: 0.82rem;
        padding: 8px 16px;
        border-radius: 9999px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      }
    }
  }

  .card-content {
    padding: 1.8rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;

    .badge-tag {
      font-size: 0.78rem;
      color: #38BDF8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    h3 {
      color: #FFFFFF;
      font-size: 1.3rem;
      line-height: 1.35;
    }

    p {
      color: #CBD5E1;
      font-size: 0.92rem;
      line-height: 1.6;
      margin-top: auto;
    }
  }

  @media (max-width: 640px) {
    width: 320px;
    height: 500px;

    .card-img {
      height: 240px;
    }
  }
`;

const HorizontalShowcase = () => {
  const { historicalGallery } = chapter5Data;
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [selectedImg, setSelectedImg] = useState(null);

  useLayoutEffect(() => {
    if (window.innerWidth > 968) {
      const section = sectionRef.current;
      const track = trackRef.current;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + window.innerWidth * 0.3);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });

      return () => {
        st.kill();
        tween.kill();
      };
    }
  }, []);

  return (
    <>
      <ImageModal
        isOpen={!!selectedImg}
        imageSrc={selectedImg?.image}
        title={selectedImg?.title}
        desc={selectedImg?.desc}
        onClose={() => setSelectedImg(null)}
      />

      <Section id="historical-showcase" ref={sectionRef}>
        <PinnedSide>
          <span className="badge badge-gold">TƯ LIỆU LỊCH SỬ</span>
          <h2>Những Khoảnh Khắc Lịch Sử & Thời Đại</h2>
          <p>
            Trưng bày các tư liệu hình ảnh quý giá về Chủ tịch Hồ Chí Minh, các kỳ Đại hội Mặt trận và dấu ấn ngoại giao hòa bình của Việt Nam qua các thời kỳ.
          </p>
        </PinnedSide>

        <HorizontalTrack ref={trackRef}>
          {historicalGallery.map((item) => (
            <GalleryCard key={item.id} onClick={() => setSelectedImg(item)}>
              <div className="card-img">
                <img src={item.image} alt={item.title} />
                <div className="year-badge">{item.year}</div>
                <div className="zoom-overlay">
                  <span className="zoom-pill">Xem Chi Tiết</span>
                </div>
              </div>
              <div className="card-content">
                <span className="badge-tag">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </GalleryCard>
          ))}
        </HorizontalTrack>
      </Section>
    </>
  );
};

export default HorizontalShowcase;
