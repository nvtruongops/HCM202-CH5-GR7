import React, { useState } from "react";
import styled from "styled-components";
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

const SectionHeader = styled.div`
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

const SubjectScopeCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 18px;
  padding: 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 1.5rem 1.2rem;
  }
`;

const FoundationCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 20px;
  padding: 2.2rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.2rem;
  }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Grid4 = styled.div`
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

const SubCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.15);
  }

  h4 {
    color: #38BDF8;
    font-size: 1.12rem;
    line-height: 1.4;
    font-weight: 700;
  }

  p {
    color: #CBD5E1;
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .sub-section-title {
    color: #FFD700;
    font-weight: 600;
    font-size: 0.92rem;
    margin-top: 4px;
  }

  .bullet-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      color: #CBD5E1;
      font-size: 0.9rem;
      line-height: 1.5;
      padding-left: 16px;
      position: relative;

      &::before {
        content: "•";
        color: #38BDF8;
        position: absolute;
        left: 2px;
        font-weight: bold;
      }
    }
  }

  .quotes-container {
    background: rgba(211, 47, 47, 0.12);
    border-left: 3px solid #D32F2F;
    padding: 12px 14px;
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: auto;

    p.quote-line {
      font-style: italic;
      font-size: 0.88rem;
      color: #FFD700;
      line-height: 1.45;
      margin: 0;
    }

    .conclusion-tag {
      color: #F8FAFC;
      font-weight: 700;
      font-size: 0.85rem;
      margin-top: 4px;
    }
  }

  .period-box {
    background: rgba(15, 23, 42, 0.9);
    border: 1px dashed rgba(255, 215, 0, 0.4);
    border-radius: 10px;
    padding: 12px 14px;
    margin-top: auto;

    p.period-quote {
      font-style: italic;
      color: #F1F5F9;
      font-size: 0.86rem;
      line-height: 1.5;
      white-space: pre-line;
      margin: 0 0 6px 0;
    }

    span.period-author {
      color: #38BDF8;
      font-size: 0.78rem;
      display: block;
      text-align: right;
    }
  }
`;

/* ===== Sơ Đồ Cây Phân Cấp Nền Tảng (Slide Hierarchy Tree) ===== */
const TreeDiagramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 980px;
  margin: 1.5rem auto 1rem auto;
  position: relative;
`;

const TreeBox = styled.div`
  background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
  border: 2px solid #38BDF8;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(2, 132, 199, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  font-weight: 700;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(56, 189, 248, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
`;

const CircleBadge = styled.div`
  width: 62px;
  height: 62px;
  background: radial-gradient(circle, #FDE047 0%, #EAB308 100%);
  color: #0369A1;
  font-weight: 900;
  font-size: 0.82rem;
  border-radius: 50%;
  border: 2.5px solid #FEF08A;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.1;
  position: absolute;
  z-index: 5;

  &.bottom-right {
    bottom: -16px;
    right: -16px;
  }

  &.top-left {
    top: -18px;
    left: -18px;
  }

  &.static-badge {
    position: static;
    flex-shrink: 0;
    width: 65px;
    height: 65px;
    font-size: 0.85rem;
  }
`;

const TreeTopBox = styled(TreeBox)`
  width: 100%;
  max-width: 440px;
  padding: 1.8rem 2.2rem;
  font-size: 1.25rem;
  line-height: 1.45;

  @media (max-width: 640px) {
    font-size: 1.05rem;
    padding: 1.4rem 1.6rem;
  }
`;

const VerticalConnector = styled.div`
  width: 3px;
  height: 38px;
  background: #38BDF8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
`;

const TreeMiddleBox = styled(TreeBox)`
  width: 100%;
  max-width: 580px;
  padding: 1.8rem 2.4rem;
  font-size: 1.2rem;
  line-height: 1.45;

  @media (max-width: 640px) {
    font-size: 1.02rem;
    padding: 1.4rem 1.6rem;
  }
`;

/* CSS Grid Connector chính xác 100% theo các cột */
const BranchConnector = styled.div`
  width: 100%;
  max-width: 960px;
  height: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }

  /* Dây dọc nối từ Middle Box xuống thanh ngang */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 24px;
    background: #38BDF8;
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
  }

  /* Thanh ngang nối từ tâm cột 1 sang tâm cột 3 */
  &::after {
    content: "";
    position: absolute;
    top: 24px;
    left: calc((100% - 2 * 1.8rem) / 6);
    right: calc((100% - 2 * 1.8rem) / 6);
    height: 3px;
    background: #38BDF8;
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
  }

  .branch-col {
    position: relative;
    height: 100%;

    /* Dây thả thẳng từ thanh ngang vào đúng tâm đỉnh của từng thẻ bên dưới */
    &::after {
      content: "";
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 24px;
      background: #38BDF8;
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
    }
  }

  /* Cột giữa chạy thẳng từ trên xuống đáy */
  .branch-col:nth-child(2)::after {
    top: 0;
    height: 48px;
  }
`;

const ChildrenRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  width: 100%;
  max-width: 960px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .child-box {
    padding: 1.6rem 1.2rem;
    font-size: 1.18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 105px;
    line-height: 1.35;

    @media (max-width: 640px) {
      font-size: 1.05rem;
      min-height: 85px;
    }
  }
`;

const BottomPrincipleBar = styled.div`
  margin-top: 2.8rem;
  width: 100%;
  max-width: 1080px;
  background: linear-gradient(90deg, rgba(2, 132, 199, 0.35) 0%, rgba(14, 165, 233, 0.65) 50%, rgba(2, 132, 199, 0.35) 100%);
  border: 2px solid #38BDF8;
  border-radius: 9999px;
  padding: 0.6rem 2.2rem 0.6rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1.4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);

  @media (max-width: 900px) {
    border-radius: 20px;
    flex-direction: column;
    text-align: center;
    padding: 1.4rem;
    gap: 1rem;
  }

  .principle-text {
    color: #FFFFFF;
    font-size: clamp(0.92rem, 1.15vw, 1.08rem);
    font-weight: 700;
    line-height: 1.4;
    white-space: nowrap;

    @media (max-width: 900px) {
      white-space: normal;
    }
  }
`;

const ConditionBox = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 16px;
  padding: 1.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.15);
  }

  .num-circle {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #FFD700, #B8860B);
    color: #0F172A;
    font-weight: 800;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  h4 {
    color: #FFFFFF;
    font-size: 1.05rem;
    margin-bottom: 0.8rem;
    line-height: 1.4;
  }

  p {
    color: #94A3B8;
    font-size: 0.88rem;
    line-height: 1.6;
  }
`;

const QuoteBox = styled.div`
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.22), rgba(15, 23, 42, 0.5));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-left: 5px solid #D32F2F;
  border-radius: 0 16px 16px 0;
  padding: 2rem 2.4rem;
  margin-top: 2rem;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

  p.quote-text {
    font-size: clamp(0.95rem, 1.1vw, 1.1rem);
    font-style: italic;
    color: #F8FAFC;
    line-height: 1.7;
  }

  .author {
    display: block;
    text-align: right;
    font-style: normal;
    font-weight: 700;
    color: #FFD700;
    margin-top: 12px;
    font-size: 0.92rem;
  }
`;

const FrontOverviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 1.2rem;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 18px;
  padding: 2rem 2.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  p.main-desc {
    color: #F8FAFC;
    font-size: 1.02rem;
    line-height: 1.7;
    margin: 0;
  }

  .highlight-front {
    background: rgba(56, 189, 248, 0.08);
    border-left: 4px solid #38BDF8;
    padding: 14px 18px;
    border-radius: 0 12px 12px 0;
    color: #CBD5E1;
    font-size: 0.95rem;
    line-height: 1.65;

    strong {
      color: #FFD700;
    }
  }
`;

const RulesGrid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.6rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FrontRuleCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  padding: 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
  }

  .rule-num {
    background: linear-gradient(135deg, #0284C7, #0369A1);
    color: #FFF;
    font-size: 0.78rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 6px;
    width: fit-content;
    border: 1px solid #38BDF8;
  }

  h5 {
    color: #FFD700;
    font-size: 1.05rem;
    line-height: 1.4;
    margin: 0;
    font-weight: 700;
  }

  p {
    color: #CBD5E1;
    font-size: 0.88rem;
    line-height: 1.6;
    margin: 0;
  }
`;

const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .step-card {
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 1.6rem;
    position: relative;

    .step-badge {
      background: #D32F2F;
      color: #FFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 9999px;
      display: inline-block;
      margin-bottom: 10px;
    }

    h5 {
      color: #FFD700;
      font-size: 1.08rem;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    p {
      color: #94A3B8;
      font-size: 0.88rem;
      line-height: 1.5;
    }
  }
`;

const ConclusionBox = styled.div`
  margin-top: 2rem;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 14px;
  padding: 1.6rem 2rem;
  color: #F8FAFC;
  font-size: 0.95rem;
  line-height: 1.65;

  strong {
    color: #FFD700;
  }
`;

const GreatUnity = () => {
  const { greatUnity } = chapter5Data;
  const [modalImg, setModalImg] = useState(null);

  const ptA = greatUnity.roleStrategic.points[0];
  const ptB = greatUnity.roleStrategic.points[1];

  return (
    <>
      <ImageModal
        isOpen={!!modalImg}
        imageSrc={modalImg?.img}
        title={modalImg?.title}
        desc={modalImg?.desc}
        onClose={() => setModalImg(null)}
      />

      <Section id="great-unity">
        <Container>
          <SectionHeader>
            <h2>{greatUnity.title}</h2>
            <p className="subtitle">{greatUnity.subtitle}</p>
          </SectionHeader>

          {/* 5.1.1. Vai trò của đại đoàn kết toàn dân tộc */}
          <SubsectionBox id="sec-5-1-1">
            <div className="sub-header">
              <h3>{greatUnity.roleStrategic.title}</h3>
            </div>
            <Grid2>
              {/* Mục a */}
              <SubCard>
                <h4>{ptA.heading}</h4>
                <div className="sub-section-title">{ptA.meaningTitle}</div>
                <ul className="bullet-list">
                  {ptA.meaningList.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
                <div className="quotes-container">
                  <span style={{ color: "#38BDF8", fontSize: "0.82rem", fontWeight: "600", marginBottom: "4px" }}>
                    {ptA.hcmQuotesLead}
                  </span>
                  {ptA.hcmQuotes.map((q, idx) => (
                    <p className="quote-line" key={idx}>{q}</p>
                  ))}
                  <div className="conclusion-tag">{ptA.conclusion}</div>
                </div>
              </SubCard>

              {/* Mục b */}
              <SubCard>
                <h4>{ptB.heading}</h4>
                <p>{ptB.detail}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div className="sub-section-title">{ptB.reasonTitle}</div>
                  <p style={{ margin: 0 }}>{ptB.reasonText}</p>
                  <div className="sub-section-title" style={{ marginTop: "6px" }}>{ptB.missionTitle}</div>
                  <p style={{ margin: 0 }}>{ptB.missionText}</p>
                </div>
                <div className="period-box">
                  <span style={{ color: "#FFD700", fontSize: "0.8rem", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    {ptB.periodTitle}
                  </span>
                  <p className="period-quote">{ptB.periodQuote}</p>
                  <span className="period-author">{ptB.periodAuthor}</span>
                </div>
              </SubCard>
            </Grid2>
          </SubsectionBox>

          {/* 5.1.2. Lực lượng đại đoàn kết dân tộc */}
          <SubsectionBox id="sec-5-1-2">
            <div className="sub-header">
              <h3>{greatUnity.forces.title}</h3>
            </div>
            
            {/* a. Chủ thể của khối đại đoàn kết toàn dân tộc */}
            <SubjectScopeCard>
              <h4 style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: "700", margin: 0 }}>
                {greatUnity.forces.subjectTitle}
              </h4>
              <p style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: "1.65", margin: 0 }}>
                <strong style={{ color: "#FFD700" }}>{greatUnity.forces.subjectScopeTitle} </strong>
                {greatUnity.forces.subjectScopeDesc}
              </p>
              <p style={{ color: "#F8FAFC", fontSize: "0.95rem", lineHeight: "1.65", background: "rgba(56, 189, 248, 0.08)", padding: "14px 18px", borderRadius: "12px", borderLeft: "4px solid #38BDF8", backdropFilter: "blur(12px)", margin: 0 }}>
                {greatUnity.forces.subjectDualNature}
              </p>
            </SubjectScopeCard>

            {/* b. Nền tảng của khối đại đoàn kết toàn dân tộc */}
            <FoundationCard>
              <h4 style={{ color: "#38BDF8", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.8rem", textAlign: "center" }}>
                {greatUnity.forces.foundationTitle}
              </h4>

              <TreeDiagramWrapper>
                {/* 1. Đỉnh: Mục đích */}
                <TreeTopBox>
                  Phụng sự tổ quốc,
                  <br />
                  phụng sự nhân dân
                  <CircleBadge className="bottom-right">
                    <span>Mục</span>
                    <span>đích</span>
                  </CircleBadge>
                </TreeTopBox>

                {/* Dây nối dọc */}
                <VerticalConnector />

                {/* 2. Giữa: Chủ thể */}
                <TreeMiddleBox>
                  <CircleBadge className="top-left">
                    <span>Chủ</span>
                    <span>thể</span>
                  </CircleBadge>
                  Bao gồm toàn thể nhân dân, tất cả những người Việt Nam yêu nước
                </TreeMiddleBox>

                {/* Dây nối phân nhánh chuẩn xác theo 3 cột */}
                <BranchConnector>
                  <div className="branch-col" />
                  <div className="branch-col" />
                  <div className="branch-col" />
                </BranchConnector>

                {/* 3. Ba khối con: Công nhân - Nông dân - Các tầng lớp khác */}
                <ChildrenRow>
                  <TreeBox className="child-box">
                    <CircleBadge className="top-left">
                      <span>Nòng</span>
                      <span>cốt</span>
                    </CircleBadge>
                    Công nhân
                  </TreeBox>

                  <TreeBox className="child-box">
                    <CircleBadge className="top-left">
                      <span>Nòng</span>
                      <span>cốt</span>
                    </CircleBadge>
                    Nông dân
                  </TreeBox>

                  <TreeBox className="child-box">
                    các tầng lớp nhân
                    <br />
                    dân lao động khác
                  </TreeBox>
                </ChildrenRow>

                {/* 4. Đáy: Nguyên tắc */}
                <BottomPrincipleBar>
                  <CircleBadge className="static-badge">
                    <span>Nguyên</span>
                    <span>tắc</span>
                  </CircleBadge>
                  <div className="principle-text">
                    Đứng vững trên lập trường giai cấp công nhân, giải quyết hài hòa mối quan hệ giai cấp – dân tộc
                  </div>
                </BottomPrincipleBar>
              </TreeDiagramWrapper>
            </FoundationCard>
          </SubsectionBox>

          {/* 5.1.3. Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc */}
          <SubsectionBox id="sec-5-1-3">
            <div className="sub-header">
              <h3>{greatUnity.conditions.title}</h3>
              <p>{greatUnity.conditions.subtitle}</p>
            </div>
            <Grid4>
              {greatUnity.conditions.items.map((cond, idx) => (
                <ConditionBox key={idx}>
                  <div className="num-circle">{cond.num}</div>
                  <h4>{cond.title}</h4>
                  <p>{cond.desc}</p>
                </ConditionBox>
              ))}
            </Grid4>

            <QuoteBox>
              <p className="quote-text">
                “Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta. Vậy nên phải khoan hồng, đại độ... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang.”
              </p>
              <span className="author">— Chủ tịch Hồ Chí Minh (Thư gửi đồng bào Nam Bộ, 1946)</span>
            </QuoteBox>
          </SubsectionBox>

          {/* 5.1.4. Hình thức tổ chức: Mặt trận dân tộc thống nhất */}
          <SubsectionBox id="sec-5-1-4">
            <div className="sub-header">
              <h3>{greatUnity.frontPrinciples.title}</h3>
            </div>
            <FrontOverviewCard>
              <p className="main-desc">
                {greatUnity.frontPrinciples.overviewText}
              </p>
              <div className="highlight-front">
                <strong>Tiến trình lịch sử Mặt trận: </strong>
                {greatUnity.frontPrinciples.historyText}
              </div>
            </FrontOverviewCard>

            {/* 3 Nguyên tắc xây dựng và hoạt động */}
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ color: "#38BDF8", fontSize: "1.15rem", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>
                {greatUnity.frontPrinciples.rulesTitle}
              </h4>
              <RulesGrid3>
                {greatUnity.frontPrinciples.rules.map((rule, idx) => (
                  <FrontRuleCard key={idx}>
                    <h5>{rule.title}</h5>
                    <p>{rule.desc}</p>
                  </FrontRuleCard>
                ))}
              </RulesGrid3>
            </div>
          </SubsectionBox>

          {/* 5.1.5. Phương thức xây dựng khối đại đoàn kết dân tộc */}
          <SubsectionBox id="sec-5-1-5">
            <div className="sub-header">
              <h3>{greatUnity.methods.title}</h3>
              <p>{greatUnity.methods.principlesSubtitle}</p>
            </div>
            <StepsRow>
              {greatUnity.methods.steps.map((st, idx) => (
                <div className="step-card" key={idx}>
                  <span className="step-badge">Bước {st.step}</span>
                  <h5>{st.title}</h5>
                  <p>{st.text}</p>
                </div>
              ))}
            </StepsRow>

            <ConclusionBox>
              <div style={{ color: "#FFD700", fontWeight: "700", marginBottom: "6px" }}>
                Kết luận rút ra:
              </div>
              <p style={{ margin: "0 0 10px 0", color: "#F8FAFC", lineHeight: "1.7" }}>
                Đại đoàn kết dân tộc là một chiến lược cách mạng được Hồ Chí Minh đề ra từ rất sớm, trở thành tư tưởng chỉ đạo xuyên suốt quá trình cách mạng Việt Nam, là cội nguồn sức mạnh làm nên mọi thắng lợi của cách mạng Việt Nam, một đóng góp quan trọng vào lý luận cách mạng thế giới.
              </p>
              <p style={{ margin: 0, color: "#CBD5E1", lineHeight: "1.7" }}>
                Đại đoàn kết dân tộc là yếu tố nội sinh có ý nghĩa quyết định, nhằm tạo lực và thế để vươn ra bên ngoài, làm cho lực và thế trong nước ngày càng tăng. Thực hiện đại đoàn kết dân tộc gắn liền với đoàn kết quốc tế, kết hợp sức mạnh dân tộc với sức mạnh thời đại sẽ là ngọn nguồn tạo nên sức mạnh vô địch của cách mạng Việt Nam theo tư tưởng Hồ Chí Minh.
              </p>
            </ConclusionBox>
          </SubsectionBox>
        </Container>
      </Section>
    </>
  );
};

export default GreatUnity;
