import React from "react";
import styled from "styled-components";
import { chapter5Data } from "../../data/chapter5Data";

const Section = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
  background: radial-gradient(circle at 50% 30%, rgba(211, 47, 47, 0.12) 0%, rgba(15, 23, 42, 1) 75%);
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
    max-width: 850px;
    margin: 0 auto;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const SpeakerCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid ${props => props.active ? "#FFD700" : "rgba(255, 215, 0, 0.25)"};
  border-radius: 20px;
  padding: 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.active ? "0 15px 35px rgba(255, 215, 0, 0.2)" : "0 10px 25px rgba(0, 0, 0, 0.4)"};

  &:hover {
    transform: translateY(-5px);
    border-color: #FFD700;
    box-shadow: 0 18px 40px rgba(255, 215, 0, 0.25);
  }

  .speaker-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }

  .speaker-badge {
    background: linear-gradient(135deg, #D32F2F, #991B1B);
    color: #FFF;
    font-weight: 800;
    font-size: 0.82rem;
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid rgba(255, 215, 0, 0.4);
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }

  .section-tag {
    color: #38BDF8;
    font-size: 0.78rem;
    font-weight: 600;
    text-align: right;
    line-height: 1.35;
  }

  h4 {
    color: #FFD700;
    font-size: 1.15rem;
    line-height: 1.4;
    margin: 0;
  }

  .tasks-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      color: #CBD5E1;
      font-size: 0.88rem;
      line-height: 1.5;
      position: relative;
      padding-left: 18px;

      &::before {
        content: "•";
        color: #FFD700;
        position: absolute;
        left: 4px;
        font-weight: bold;
      }
    }
  }

  .impact-banner {
    margin-top: auto;
    background: rgba(15, 23, 42, 0.7);
    border-left: 3px solid #38BDF8;
    border-radius: 0 8px 8px 0;
    padding: 8px 12px;
    color: #E2E8F0;
    font-size: 0.82rem;
    font-style: italic;
  }

  .speech-toggle-btn {
    background: rgba(211, 47, 47, 0.2);
    border: 1px solid rgba(255, 215, 0, 0.35);
    color: #FFD700;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;

    &:hover {
      background: rgba(211, 47, 47, 0.4);
      border-color: #FFD700;
      transform: translateY(-1px);
    }
  }

  .speech-notes-box {
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid #38BDF8;
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeIn 0.3s ease;

    h5 {
      color: #38BDF8;
      font-size: 0.88rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    p {
      color: #E2E8F0;
      font-size: 0.82rem;
      line-height: 1.55;
      margin: 0;
      background: rgba(255, 255, 255, 0.03);
      padding: 6px 10px;
      border-radius: 6px;
      border-left: 2px solid #FFD700;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CentralQuestionBox = styled.div`
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
  border: 2px solid #FFD700;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  .q-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    h3 {
      font-size: clamp(1.3rem, 2vw, 1.8rem);
      color: #FFD700;
      line-height: 1.35;
    }

    p.conclusion-lead {
      color: #38BDF8;
      font-size: 1.05rem;
      font-weight: 600;
      max-width: 800px;
    }
  }

  .dimensions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .dimension-card {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: #FFD700;
    }

    h4 {
      color: #FFD700;
      font-size: 1.15rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 8px;

      &::before {
        content: "✦";
        color: #38BDF8;
      }
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
        padding-left: 18px;
        position: relative;

        &::before {
          content: "—";
          color: #FFD700;
          position: absolute;
          left: 0;
        }
      }
    }
  }
`;

const PresentationRoadmap = () => {
  const { presentationRoadmap, modernApplication } = chapter5Data;
  const centralQ = modernApplication.centralQuestion;
  const [expandedSpeaker, setExpandedSpeaker] = React.useState(null);

  const toggleSpeechNotes = (idx) => {
    setExpandedSpeaker(expandedSpeaker === idx ? null : idx);
  };

  return (
    <Section id="presentation-roadmap">
      <Container>
        <HeaderBox>
          <span className="badge badge-gold">LỘ TRÌNH THUYẾT TRÌNH</span>
          <h2>Phân Công & Cấu Trúc Báo Cáo 6 Diễn Giả</h2>
          <p className="subtitle">
            Hệ thống hóa toàn bộ nội dung Chương 5 theo tiến trình thuyết trình của 6 thành viên, từ nền tảng nội lực dân tộc đến mở rộng ngoại lực quốc tế và bài học thời đại.
          </p>
        </HeaderBox>

        {/* 6 Diễn giả */}
        <SpeakersGrid>
          {presentationRoadmap.map((spk, idx) => (
            <SpeakerCard key={idx} active={expandedSpeaker === idx}>
              <div className="speaker-header">
                <span className="speaker-badge">{spk.speaker}</span>
                <span className="section-tag">{spk.sections}</span>
              </div>
              <h4>{spk.role}</h4>
              <ul className="tasks-list">
                {spk.mainTasks.map((task, tIdx) => (
                  <li key={tIdx}>{task}</li>
                ))}
              </ul>
              
              <button 
                type="button" 
                className="speech-toggle-btn"
                onClick={() => toggleSpeechNotes(idx)}
              >
                {expandedSpeaker === idx ? "Thu gọn Lời thoại" : "Xem Lời Thoại Thuyết Trình"}
              </button>

              {expandedSpeaker === idx && spk.speechNotes && (
                <div className="speech-notes-box">
                  <h5>Toàn văn Lời thoại Thuyết trình ({spk.speaker}):</h5>
                  {spk.speechNotes.map((note, nIdx) => (
                    <p key={nIdx}>{note}</p>
                  ))}
                </div>
              )}

              <div className="impact-banner">
                <strong>Vai trò: </strong>{spk.keyImpact}
              </div>
            </SpeakerCard>
          ))}
        </SpeakersGrid>

        {/* Trả Lời Câu Hỏi Trọng Tâm */}
        {centralQ && (
          <CentralQuestionBox>
            <div className="q-header">
              <span className="badge badge-red">TỔNG KẾT HỌC THUẬT</span>
              <h3>{centralQ.question}</h3>
              <p className="conclusion-lead">{centralQ.conclusion}</p>
            </div>

            <div className="dimensions-grid">
              <div className="dimension-card">
                <h4>{centralQ.dimension1.title}</h4>
                <ul>
                  {centralQ.dimension1.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="dimension-card">
                <h4>{centralQ.dimension2.title}</h4>
                <ul>
                  {centralQ.dimension2.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CentralQuestionBox>
        )}
      </Container>
    </Section>
  );
};

export default PresentationRoadmap;
