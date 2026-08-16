import React from "react";
import styled from "styled-components";
import { chapter5Data } from "../../data/chapter5Data";

const Section = styled.section`
  min-height: 80vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
  background: transparent;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 92%;
  max-width: 900px;
  margin-bottom: 3.5rem;

  .section-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
  }

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    color: #FFFFFF;
    margin: 0 0 1.2rem 0;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #D32F2F, #FFD700);
      border-radius: 2px;
    }
  }

  p {
    color: #94A3B8;
    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
    margin-top: 1rem;
    max-width: 750px;
  }
`;

const PillarsGrid = styled.div`
  width: 92%;
  max-width: 1350px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PillarCard = styled.div`
  background: rgba(15, 23, 42, 0.58);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.35s ease;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #FFD700, #D32F2F);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 215, 0, 0.6);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 215, 0, 0.2);
    background: rgba(15, 23, 42, 0.68);

    &::before {
      opacity: 1;
    }
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .num {
      font-size: 2.2rem;
      font-weight: 900;
      color: rgba(255, 215, 0, 0.3);
      font-family: 'Montserrat', sans-serif;
    }
  }

  h3 {
    font-size: 1.35rem;
    color: #FFD700;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  p.desc {
    color: #CBD5E1;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  ul.points-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.2rem;
    margin-bottom: 1.5rem;

    li {
      color: #94A3B8;
      font-size: 0.88rem;
      display: flex;
      align-items: flex-start;
      gap: 8px;

      &::before {
        content: "✓";
        color: #38BDF8;
        font-weight: bold;
      }
    }
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #FFD700;
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: auto;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateX(4px);
    }
  }
`;

const Overview = () => {
  const { overviewPillars } = chapter5Data;

  const getTargetId = (id) => {
    if (id === "5.1") return "#great-unity";
    if (id === "5.2") return "#international-unity";
    return "#modern-application";
  };

  return (
    <Section id="overview">
      <HeaderBox>
        <span className="section-tag badge-gold">HỆ THỐNG KIẾN THỨC</span>
        <h2>3 Trụ Cột Tri Thức Cốt Lõi</h2>
        <p>
          Hệ thống hóa toàn bộ nội dung lý luận và thực tiễn qua 3 phần chuyên đề khoa học và chặt chẽ.
        </p>
      </HeaderBox>

      <PillarsGrid>
        {overviewPillars.map((pillar) => (
          <PillarCard key={pillar.id}>
            <div className="card-top">
              <span className={`badge ${pillar.tagColor}`}>{pillar.badge}</span>
              <span className="num">{pillar.number}</span>
            </div>
            <h3>{pillar.title}</h3>
            <p className="desc">{pillar.desc}</p>

            <ul className="points-list">
              {pillar.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>

            <a href={getTargetId(pillar.id)} className="card-link">
              Khám phá chi tiết →
            </a>
          </PillarCard>
        ))}
      </PillarsGrid>
    </Section>
  );
};

export default Overview;
