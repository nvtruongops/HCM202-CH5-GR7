import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { generateQuizSet } from "../../data/quizData";
import {
  verifyOption,
  verifyMatchingPair,
  decodeExplanation
} from "../../utils/quizSecurity";
import {
  fetchLeaderboard,
  submitLeaderboardScore
} from "../../services/leaderboardService";
import ConfettiEffect from "../ConfettiEffect";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100%;
  position: relative;
  padding: 5rem 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Container = styled.div`
  width: 92%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .badge {
    display: inline-flex;
    margin-bottom: 0.8rem;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    font-weight: 700;
  }

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 2.3rem);
    color: #F8FAFC;
    margin: 0 0 0.5rem 0;
    font-weight: 800;
  }

  p {
    color: #94A3B8;
    font-size: 0.95rem;
    max-width: 650px;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;

  button {
    padding: 9px 22px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.88rem;
    transition: all 0.25s ease;
    cursor: pointer;
    border: 1px solid #334155;

    &.active-tab {
      background: #1E293B;
      color: #F59E0B;
      border-color: #F59E0B;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    }

    &.inactive-tab {
      background: rgba(15, 23, 42, 0.6);
      color: #94A3B8;

      &:hover {
        border-color: #64748B;
        color: #F8FAFC;
      }
    }
  }
`;

const QuizStageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const QuizContainer = styled.div`
  width: 100%;
  min-height: 560px;
  background: #0F172A;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2rem 2.4rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.4rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.4rem;
    min-height: 580px;
  }
`;

/* Start Phase Screen */
const StartScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
  flex: 1;

  .start-tag {
    font-size: 0.8rem;
    font-weight: 800;
    color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    padding: 4px 12px;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  h3 {
    color: #F8FAFC;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  p {
    color: #94A3B8;
    font-size: 0.92rem;
    max-width: 520px;
    line-height: 1.6;
    margin: 0;
  }

  .input-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 420px;
    gap: 12px;

    input {
      width: 100%;
      background: #1E293B;
      border: 1px solid #475569;
      border-radius: 8px;
      padding: 13px 16px;
      color: #F8FAFC;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #F59E0B;
      }

      &::placeholder {
        color: #64748B;
      }
    }

    button.start-btn {
      width: 100%;
      background: #D97706;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      padding: 13px 18px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover:not(:disabled) {
        background: #B45309;
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
    }
  }
`;

/* Top Bar During Playing */
const QuizTopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      color: #94A3B8;

      .tag {
        color: #F8FAFC;
        font-weight: 700;
        background: #1E293B;
        border: 1px solid #334155;
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .score-badge {
      font-size: 0.85rem;
      font-weight: 700;
      color: #F59E0B;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      padding: 3px 10px;
      border-radius: 6px;
    }
  }

  .progress-track {
    width: 100%;
    height: 4px;
    background: #1E293B;
    border-radius: 2px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: #F59E0B;
      transition: width 0.3s ease;
    }
  }

  .question-palette {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;

    button {
      flex: 1;
      min-width: 28px;
      height: 32px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      border: 1px solid #334155;
      background: #1E293B;
      color: #94A3B8;
      cursor: pointer;
      transition: all 0.2s ease;

      &.unanswered {
        background: #1E293B;
        color: #94A3B8;
      }

      &.correct {
        background: rgba(16, 185, 129, 0.2);
        border-color: #10B981;
        color: #10B981;
      }

      &.wrong {
        background: rgba(239, 68, 68, 0.2);
        border-color: #EF4444;
        color: #EF4444;
      }

      &.current {
        border-color: #F59E0B;
        color: #F8FAFC;
        box-shadow: 0 0 0 1px #F59E0B;
      }
    }
  }
`;

/* Single Question Card Box */
const SingleQuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;
  margin: 0.4rem 0;

  .speaker-badge-tag {
    display: inline-block;
    align-self: flex-start;
    font-size: 0.78rem;
    font-weight: 700;
    color: #94A3B8;
    background: #1E293B;
    border: 1px solid #334155;
    padding: 3px 10px;
    border-radius: 4px;
    letter-spacing: 0.03em;
  }

  .question-title {
    color: #F8FAFC;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.55;
    margin: 0;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

/* MCQ Option Button (Clean Minimalist Theme) */
const StepOptionButton = styled.button`
  width: 100%;
  background: ${props =>
    props.isAnswered
      ? props.isCorrect
        ? "rgba(16, 185, 129, 0.15)"
        : props.isSelected
        ? "rgba(239, 68, 68, 0.15)"
        : "#1E293B"
      : "#1E293B"};
  border: 1px solid ${props =>
    props.isAnswered
      ? props.isCorrect
        ? "#10B981"
        : props.isSelected
        ? "#EF4444"
        : "#334155"
      : "#334155"};
  border-radius: 8px;
  padding: 13px 16px;
  color: ${props =>
    props.isAnswered
      ? props.isCorrect
        ? "#F8FAFC"
        : props.isSelected
        ? "#F87171"
        : "#94A3B8"
      : "#E2E8F0"};
  font-size: 0.92rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${props => (props.isAnswered ? "default" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    ${props =>
      !props.isAnswered &&
      `
      border-color: #F59E0B;
      background: #24344D;
      color: #F8FAFC;
    `}
  }

  .opt-letter {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: ${props =>
      props.isAnswered
        ? props.isCorrect
          ? "#10B981"
          : props.isSelected
          ? "#EF4444"
          : "#334155"
        : "#334155"};
    color: #FFFFFF;
    font-weight: 700;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .opt-text {
    flex: 1;
    line-height: 1.45;
  }

  .status-tag {
    font-size: 0.78rem;
    font-weight: 700;
    margin-left: auto;
    padding: 2px 8px;
    border-radius: 4px;

    &.tag-correct {
      color: #10B981;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    &.tag-wrong {
      color: #EF4444;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
  }
`;

/* Matching Game Layout (Clean Minimalist Theme) */
const MatchingGameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const ColumnGroup = styled.div`
  background: #131E32;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .group-title {
    color: #94A3B8;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-bottom: 4px;
    border-bottom: 1px solid #1E293B;
    margin-bottom: 4px;
  }
`;

const MatchingCardItem = styled.div`
  position: relative;
  background: ${props => (props.isMatched ? "rgba(16, 185, 129, 0.12)" : props.isSelected ? "#1E293B" : "#1E293B")};
  border: 1px solid ${props => (props.isMatched ? "#10B981" : props.isSelected ? "#F59E0B" : props.isError ? "#EF4444" : "#334155")};
  border-radius: 8px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => (props.isMatched ? "default" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    ${props =>
      !props.isMatched &&
      `
      border-color: #94A3B8;
      background: #24344D;
    `}
  }

  .badge-tag {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: ${props => (props.isMatched ? "#10B981" : "#334155")};
    color: #FFFFFF;
    font-weight: 700;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-text {
    color: #F8FAFC;
    font-size: 0.86rem;
    font-weight: 500;
    line-height: 1.4;
    flex: 1;
  }

  .socket {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid ${props => (props.isMatched ? "#10B981" : props.isSelected ? "#F59E0B" : "#475569")};
    background: ${props => (props.isMatched ? "#10B981" : props.isSelected ? "#F59E0B" : "#0F172A")};
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .matched-tag {
    font-size: 0.75rem;
    font-weight: 700;
    color: #10B981;
    background: rgba(16, 185, 129, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const MatchCompleteBanner = styled.div`
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  .banner-text {
    h4 {
      color: #10B981;
      font-size: 0.92rem;
      font-weight: 700;
      margin: 0 0 2px 0;
    }
    p {
      color: #94A3B8;
      font-size: 0.82rem;
      margin: 0;
    }
  }

  button.view-explanation-btn {
    background: #1E293B;
    border: 1px solid #334155;
    color: #E2E8F0;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #F59E0B;
      color: #F59E0B;
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #1E293B;
  padding-top: 1.2rem;
  margin-top: auto;

  button {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &.prev-btn {
      background: #1E293B;
      color: #94A3B8;
      border: 1px solid #334155;

      &:hover:not(:disabled) {
        border-color: #64748B;
        color: #F8FAFC;
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    &.next-btn {
      background: #1E293B;
      color: #F8FAFC;
      border: 1px solid #475569;
      margin-left: auto;

      &:hover {
        border-color: #F59E0B;
        color: #F59E0B;
      }
    }

    &.finish-btn {
      background: #D97706;
      color: #FFFFFF;
      border: none;
      margin-left: auto;

      &:hover {
        background: #B45309;
      }
    }
  }
`;

const SummaryView = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
  padding: 1.5rem 0;
  flex: 1;

  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #F59E0B;
    background: #1E293B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .big-num {
      font-size: 2rem;
      font-weight: 800;
      color: #F8FAFC;
    }

    .percent {
      font-size: 0.8rem;
      color: #F59E0B;
      font-weight: 700;
    }
  }

  h3 {
    color: #F8FAFC;
    font-size: 1.4rem;
    margin: 0;
  }

  p.eval-msg {
    color: #94A3B8;
    font-size: 0.92rem;
    max-width: 540px;
    line-height: 1.6;
    margin: 0;
  }

  .action-group {
    display: flex;
    gap: 12px;
    margin-top: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;

    button {
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;

      &.retry {
        background: #1E293B;
        color: #F8FAFC;
        border: 1px solid #475569;

        &:hover {
          border-color: #F59E0B;
          color: #F59E0B;
        }
      }

      &.view-leaderboard {
        background: #D97706;
        color: #FFFFFF;
        border: none;

        &:hover {
          background: #B45309;
        }
      }
    }
  }
`;

/* Leaderboard Tab (with Aggregated Metrics Bar) */
const LeaderboardContainer = styled.div`
  background: #0F172A;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }

    .metric-card {
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .metric-label {
        font-size: 0.75rem;
        color: #94A3B8;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .metric-value {
        font-size: 1.4rem;
        font-weight: 800;
        color: #F8FAFC;

        &.highlight {
          color: #F59E0B;
        }
      }

      .metric-sub {
        font-size: 0.82rem;
        color: #64748B;
      }
    }
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      h3 {
        color: #F8FAFC;
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0;
      }

      .sync-badge {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 4px;
        letter-spacing: 0.04em;

        &.cloud {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        &.local {
          background: rgba(148, 163, 184, 0.12);
          color: #94A3B8;
          border: 1px solid rgba(148, 163, 184, 0.25);
        }
      }
    }

    .btn-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      button {
        background: transparent;
        border: 1px solid #475569;
        color: #94A3B8;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #1E293B;
          color: #F8FAFC;
          border-color: #64748B;
        }

        &.sync-btn {
          border-color: #d97706;
          color: #F59E0B;

          &:hover {
            background: rgba(245, 158, 11, 0.1);
          }
        }
      }
    }
  }

  .table-wrap {
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #334155;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    min-width: 520px;

    th {
      background: #1E293B;
      color: #94A3B8;
      padding: 12px 16px;
      font-size: 0.82rem;
      font-weight: 700;
      border-bottom: 1px solid #334155;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    td {
      padding: 12px 16px;
      color: #CBD5E1;
      font-size: 0.88rem;
      border-bottom: 1px solid #1E293B;

      &.rank {
        font-weight: 700;
        color: #94A3B8;

        &.top-1 {
          color: #F59E0B;
        }
        &.top-2 {
          color: #E2E8F0;
        }
        &.top-3 {
          color: #CD7F32;
        }
      }

      &.score {
        font-weight: 700;
        color: #10B981;
      }
    }

    tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }
  }

  .empty-state {
    text-align: center;
    color: #64748B;
    padding: 3rem 1rem;
    font-size: 0.92rem;
    background: #1E293B;
    border: 1px dashed #334155;
    border-radius: 8px;
  }
`;

const ReviewQuiz = () => {
  const [activeTab, setActiveTab] = useState("quiz");

  // Quiz Phases: "start" | "playing" | "result"
  const [quizPhase, setQuizPhase] = useState("start");
  const [userName, setUserName] = useState("");
  const [questions, setQuestions] = useState(() => generateQuizSet());
  const [currentIndex, setCurrentIndex] = useState(0);

  // answers map: { [qId]: { selectedIndex, isCorrect } }
  const [answers, setAnswers] = useState({});
  const [showExpMap, setShowExpMap] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // Matching Question State: { [qId]: [{ leftId, rightId }] }
  const [matchedPairsMap, setMatchedPairsMap] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [errorPair, setErrorPair] = useState(null);
  const [lineCoords, setLineCoords] = useState({});

  // Leaderboard saved results (Chỉ hiển thị bài từ Google Sheets)
  const [leaderboard, setLeaderboard] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Xóa sạch cache/local cũ nếu có
  useEffect(() => {
    try {
      localStorage.removeItem("hcm202_quiz_leaderboard_v4");
      localStorage.removeItem("hcm202_custom_google_script_url");
    } catch (e) {}
  }, []);

  const containerRef = useRef(null);
  const quizCardRef = useRef(null);
  const boardRef = useRef(null);
  const leftSocketRefs = useRef({});
  const rightSocketRefs = useRef({});

  const currentQ = questions[currentIndex] || questions[0];
  const totalQ = questions.length;
  const isMatchingQ = currentQ?.type === "matching";

  const currentMatchedPairs = isMatchingQ ? (matchedPairsMap[currentQ.id] || []) : [];
  const currentLeftOptions = currentQ?.leftOptions || [];
  const currentRightOptions = currentQ?.rightOptions || [];
  const isAllMatched = isMatchingQ && currentMatchedPairs.length === currentLeftOptions.length;
  const isAnsweredCurrent = answers[currentQ?.id] !== undefined;
  const isExpVisible = !!showExpMap[currentQ?.id];

  // Load and sync Leaderboard data
  const loadLeaderboardData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetchLeaderboard();
      setLeaderboard(res.records);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboardData();
  }, [loadLeaderboardData, activeTab]);

  // Calculate SVG Connecting Lines between sockets for active matching question
  const updateLines = useCallback(() => {
    if (!boardRef.current || !isMatchingQ) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const newCoords = {};
    const pairs = matchedPairsMap[currentQ?.id] || [];

    pairs.forEach(({ leftId, rightId }) => {
      const leftEl = leftSocketRefs.current[leftId];
      const rightEl = rightSocketRefs.current[rightId];
      if (leftEl && rightEl) {
        const lRect = leftEl.getBoundingClientRect();
        const rRect = rightEl.getBoundingClientRect();
        newCoords[`${leftId}_${rightId}`] = {
          x1: lRect.left - boardRect.left + lRect.width / 2,
          y1: lRect.top - boardRect.top + lRect.height / 2,
          x2: rRect.left - boardRect.left + rRect.width / 2,
          y2: rRect.top - boardRect.top + rRect.height / 2
        };
      }
    });

    setLineCoords(newCoords);
  }, [matchedPairsMap, currentQ, isMatchingQ]);

  useEffect(() => {
    updateLines();
    const timer = setTimeout(updateLines, 100);
    window.addEventListener("resize", updateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLines);
    };
  }, [updateLines, currentIndex, matchedPairsMap]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (quizCardRef.current) {
        gsap.fromTo(
          quizCardRef.current,
          { scale: 0.97, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quizCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab, quizPhase]);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    const freshQuestions = generateQuizSet();
    setQuestions(freshQuestions);
    setQuizPhase("playing");
    setCurrentIndex(0);
    setAnswers({});
    setShowExpMap({});
    setSelectedLeft(null);
    setMatchedPairsMap({});
    setErrorPair(null);
    setShowConfetti(false);
  };

  // Securely handle MCQ selection using cryptographic hash verification
  const handleSelectOption = (optIdx) => {
    if (answers[currentQ.id] !== undefined) return;

    const isCorrect = verifyOption(currentQ.id, optIdx, currentQ.targetHash);
    const newAnswers = {
      ...answers,
      [currentQ.id]: {
        selectedIndex: optIdx,
        isCorrect: isCorrect
      }
    };
    setAnswers(newAnswers);
  };

  // Securely handle Dynamic Matching Game clicks with pair hash validation
  const handleLeftClick = (leftId) => {
    const alreadyMatched = currentMatchedPairs.some(p => p.leftId === leftId);
    if (alreadyMatched) return;
    setSelectedLeft(selectedLeft === leftId ? null : leftId);
    setErrorPair(null);
  };

  const handleRightClick = (rightId) => {
    const alreadyMatched = currentMatchedPairs.some(p => p.rightId === rightId);
    if (alreadyMatched || !selectedLeft) return;

    const isValid = verifyMatchingPair(currentQ.id, selectedLeft, rightId, currentQ.validPairHashes);

    if (isValid) {
      const nextPairs = [...currentMatchedPairs, { leftId: selectedLeft, rightId: rightId }];
      setMatchedPairsMap({
        ...matchedPairsMap,
        [currentQ.id]: nextPairs
      });
      setSelectedLeft(null);
      setErrorPair(null);

      if (nextPairs.length === currentLeftOptions.length) {
        setAnswers({
          ...answers,
          [currentQ.id]: {
            selectedIndex: 1,
            isCorrect: true
          }
        });
      }
    } else {
      setErrorPair({ leftId: selectedLeft, rightId: rightId });
      setTimeout(() => {
        setErrorPair(null);
        setSelectedLeft(null);
      }, 400);
    }
  };

  const toggleExplanation = (qId) => {
    setShowExpMap({
      ...showExpMap,
      [qId]: !showExpMap[qId]
    });
  };

  const getCorrectCount = () => {
    return Object.values(answers).filter(a => a && a.isCorrect).length;
  };

  const correctCount = getCorrectCount();
  const answeredCount = Object.keys(answers).length;

  const handleFinishQuiz = async () => {
    setQuizPhase("result");
    const score = getCorrectCount();
    const percent = Math.round((score / totalQ) * 100);

    if (score >= Math.floor(totalQ * 0.8)) {
      setShowConfetti(true);
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} - ${now.getDate()}/${now.getMonth() + 1}`;

    const newRecord = {
      name: userName.trim() || "Thí sinh ẩn danh",
      score: score,
      total: totalQ,
      percent: percent,
      time: timeStr,
      timestamp: now.getTime()
    };

    try {
      const res = await submitLeaderboardScore(newRecord);
      setLeaderboard(res.records);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetAll = () => {
    const freshQuestions = generateQuizSet();
    setQuestions(freshQuestions);
    setQuizPhase("start");
    setAnswers({});
    setShowExpMap({});
    setSelectedLeft(null);
    setMatchedPairsMap({});
    setErrorPair(null);
    setCurrentIndex(0);
    setShowConfetti(false);
  };

  // Metrics for Leaderboard Aggregation (Ưu tiên điểm cao nhất trước, bằng điểm thì ai sớm nhất)
  const totalParticipants = leaderboard.length;
  const topScorer = leaderboard.length > 0 ? leaderboard[0] : null;
  const highestScore = topScorer ? topScorer.score : 0;

  return (
    <Section id="quiz-section" ref={containerRef}>
      <ConfettiEffect active={showConfetti} />
      <Container>
        <HeaderBox>
          <span className="badge badge-gold">CỦNG CỐ KIẾN THỨC</span>
          <h2>Trắc Nghiệm Ôn Tập & Bảng Kết Quả</h2>
          <p>Luyện tập trắc nghiệm từng câu và mini-game nối thẻ có phản hồi tức thì</p>
        </HeaderBox>

        <TabsWrapper>
          <button
            className={activeTab === "quiz" ? "active-tab" : "inactive-tab"}
            onClick={() => setActiveTab("quiz")}
          >
            Trắc Nghiệm Từng Câu ({totalQ} câu)
          </button>
          <button
            className={activeTab === "leaderboard" ? "active-tab" : "inactive-tab"}
            onClick={() => setActiveTab("leaderboard")}
          >
            Bảng Kết Quả ({totalParticipants} thí sinh)
          </button>
        </TabsWrapper>

        {activeTab === "quiz" ? (
          <QuizStageWrapper>
            <QuizContainer ref={quizCardRef}>
              {quizPhase === "start" && (
                <StartScreen>
                  <span className="start-tag">HCM202 • CHƯƠNG 5</span>
                  <h3>Nhập Tên Để Bắt Đầu Làm Bài</h3>
                  <p>
                    Bộ đề gồm 10 câu (8 câu trắc nghiệm ngẫu nhiên & 2 câu mini-game nối thẻ kiến thức). Kết quả sẽ được tự động lưu vào Bảng xếp hạng.
                  </p>

                  <form className="input-form" onSubmit={handleStartQuiz}>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên hoặc mã sinh viên..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="start-btn"
                      disabled={!userName.trim()}
                    >
                      Bắt Đầu Làm Bài Trắc Nghiệm
                    </button>
                  </form>
                </StartScreen>
              )}

              {quizPhase === "playing" && (
                <>
                  <QuizTopBar>
                    <div className="top-meta">
                      <div className="user-info">
                        <span>Thí sinh:</span>
                        <span className="tag">{userName}</span>
                        <span style={{ color: "#94A3B8", fontSize: "0.85rem", marginLeft: "4px" }}>
                          (Câu {currentIndex + 1}/{totalQ})
                        </span>
                      </div>
                      <span className="score-badge">Đã làm: {answeredCount}/{totalQ} • Đúng: {correctCount}</span>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
                      />
                    </div>

                    <div className="question-palette">
                      {questions.map((q, idx) => {
                        let statusClass = "unanswered";
                        const ans = answers[q.id];
                        if (ans !== undefined) {
                          statusClass = ans.isCorrect ? "correct" : "wrong";
                        }
                        const isCurr = idx === currentIndex ? "current" : "";

                        return (
                          <button
                            key={q.id}
                            className={`${statusClass} ${isCurr}`}
                            onClick={() => {
                              setCurrentIndex(idx);
                              setSelectedLeft(null);
                              setErrorPair(null);
                            }}
                            title={`Chuyển đến câu ${idx + 1}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </QuizTopBar>

                  <SingleQuestionBox key={currentIndex}>
                    <span className="speaker-badge-tag">{currentQ.speakerTag}</span>
                    <h3 className="question-title">
                      Câu {currentIndex + 1}: {currentQ.question}
                    </h3>

                    {/* Standard Multiple-Choice */}
                    {!isMatchingQ && (
                      <>
                        <div className="options-grid">
                          {currentQ.options.map((opt, optIdx) => {
                            const isSelected = answers[currentQ.id]?.selectedIndex === optIdx;
                            const isCorrect = isAnsweredCurrent && verifyOption(currentQ.id, optIdx, currentQ.targetHash);

                            return (
                              <StepOptionButton
                                key={optIdx}
                                isAnswered={isAnsweredCurrent}
                                isSelected={isSelected}
                                isCorrect={isCorrect}
                                onClick={() => handleSelectOption(optIdx)}
                              >
                                <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                                <span className="opt-text">{opt}</span>
                                {isAnsweredCurrent && (
                                  <>
                                    {isCorrect && <span className="status-tag tag-correct">[ĐÚNG]</span>}
                                    {isSelected && !isCorrect && <span className="status-tag tag-wrong">[CHƯA ĐÚNG]</span>}
                                  </>
                                )}
                              </StepOptionButton>
                            );
                          })}
                        </div>

                        {/* Explanation for MCQ */}
                        {isAnsweredCurrent && (
                          <div
                            style={{
                              marginTop: "12px",
                              background: "#1E293B",
                              borderLeft: "3px solid #F59E0B",
                              borderRadius: "0 8px 8px 0",
                              padding: "11px 15px",
                              color: "#CBD5E1",
                              fontSize: "0.88rem",
                              lineHeight: "1.55"
                            }}
                          >
                            <strong style={{ color: "#F59E0B" }}>Giải thích: </strong>
                            {decodeExplanation(currentQ.encodedExplanation)}
                          </div>
                        )}
                      </>
                    )}

                    {/* Dynamic Pixel-Perfect Matching Cards */}
                    {isMatchingQ && (
                      <MatchingGameSection>
                        <BoardGrid ref={boardRef}>
                          {/* SVG Curved Connecting Lines */}
                          <svg
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              pointerEvents: "none",
                              zIndex: 10
                            }}
                          >
                            {currentMatchedPairs.map(({ leftId, rightId }) => {
                              const pairKey = `${leftId}_${rightId}`;
                              const c = lineCoords[pairKey];
                              if (!c) return null;
                              const dx = Math.abs(c.x2 - c.x1) * 0.52;
                              const pathD = `M ${c.x1} ${c.y1} C ${c.x1 + dx} ${c.y1}, ${c.x2 - dx} ${c.y2}, ${c.x2} ${c.y2}`;

                              return (
                                <g key={pairKey}>
                                  <path
                                    d={pathD}
                                    stroke="#F59E0B"
                                    strokeWidth="5"
                                    strokeOpacity="0.25"
                                    fill="none"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d={pathD}
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                  />
                                  <circle cx={c.x1} cy={c.y1} r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                                  <circle cx={c.x2} cy={c.y2} r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                                </g>
                              );
                            })}
                          </svg>

                          {/* Left Column */}
                          <ColumnGroup>
                            <div className="group-title">
                              {currentQ.leftTitle || "1. NỘI DUNG / MỐC SON"}
                            </div>

                            {currentLeftOptions.map((item) => {
                              const isMatched = currentMatchedPairs.some(p => p.leftId === item.id);
                              const isSelected = selectedLeft === item.id;

                              return (
                                <MatchingCardItem
                                  key={item.id}
                                  isMatched={isMatched}
                                  isSelected={isSelected}
                                  onClick={() => handleLeftClick(item.id)}
                                >
                                  <div className="badge-tag">{item.letter}</div>
                                  <div className="card-text">{item.text}</div>
                                  <div
                                    className="socket"
                                    ref={(el) => (leftSocketRefs.current[item.id] = el)}
                                  />
                                </MatchingCardItem>
                              );
                            })}
                          </ColumnGroup>

                          {/* Right Column */}
                          <ColumnGroup>
                            <div className="group-title">
                              {currentQ.rightTitle || "2. BẢN CHẤT & TRỌNG TÂM"}
                            </div>

                            {currentRightOptions.map((item) => {
                              const isMatched = currentMatchedPairs.some(p => p.rightId === item.id);
                              const isError = errorPair && errorPair.rightId === item.id;

                              return (
                                <MatchingCardItem
                                  key={item.id}
                                  isMatched={isMatched}
                                  isError={isError}
                                  onClick={() => handleRightClick(item.id)}
                                >
                                  <div
                                    className="socket"
                                    ref={(el) => (rightSocketRefs.current[item.id] = el)}
                                  />
                                  <div className="badge-tag">{item.num}</div>
                                  <div className="card-text">{item.text}</div>
                                  {isMatched && (
                                    <span className="matched-tag">ĐÃ NỐI</span>
                                  )}
                                </MatchingCardItem>
                              );
                            })}
                          </ColumnGroup>
                        </BoardGrid>

                        {/* Match Complete Banner */}
                        {isAllMatched && (
                          <MatchCompleteBanner>
                            <div className="banner-text">
                              <h4>Hoàn thành nối thẻ!</h4>
                              <p>Bạn đã ghép nối chính xác tất cả các cặp kiến thức.</p>
                            </div>

                            <button
                              className="view-explanation-btn"
                              onClick={() => toggleExplanation(currentQ.id)}
                            >
                              {isExpVisible ? "Ẩn giải thích" : "Xem giải thích"}
                            </button>
                          </MatchCompleteBanner>
                        )}

                        {isAllMatched && isExpVisible && (
                          <div
                            style={{
                              background: "#1E293B",
                              borderLeft: "3px solid #10B981",
                              borderRadius: "0 8px 8px 0",
                              padding: "11px 15px",
                              color: "#CBD5E1",
                              fontSize: "0.85rem",
                              lineHeight: "1.55"
                            }}
                          >
                            <strong style={{ color: "#10B981" }}>Giải thích: </strong>
                            {decodeExplanation(currentQ.encodedExplanation)}
                          </div>
                        )}
                      </MatchingGameSection>
                    )}
                  </SingleQuestionBox>

                  <NavButtons>
                    <button
                      className="prev-btn"
                      disabled={currentIndex === 0}
                      onClick={() => {
                        setCurrentIndex(currentIndex - 1);
                        setSelectedLeft(null);
                        setErrorPair(null);
                      }}
                    >
                      Câu Trước
                    </button>

                    {currentIndex < totalQ - 1 ? (
                      <button
                        className="next-btn"
                        onClick={() => {
                          setCurrentIndex(currentIndex + 1);
                          setSelectedLeft(null);
                          setErrorPair(null);
                        }}
                      >
                        Câu Kế Tiếp
                      </button>
                    ) : (
                      <button
                        className="finish-btn"
                        onClick={handleFinishQuiz}
                      >
                        Hoàn Thành & Lưu Điểm
                      </button>
                    )}
                  </NavButtons>
                </>
              )}

              {quizPhase === "result" && (
                <SummaryView>
                  <div className="score-circle">
                    <span className="big-num">{correctCount}/{totalQ}</span>
                    <span className="percent">{Math.round((correctCount / totalQ) * 100)}%</span>
                  </div>
                  <h3>Kết Quả: {userName}</h3>
                  <p className="eval-msg">
                    {correctCount === totalQ
                      ? "Xuất sắc! Bạn đã trả lời đúng 10/10 câu hỏi ôn tập Chương 5."
                      : correctCount >= Math.floor(totalQ * 0.7)
                      ? "Rất tốt! Bạn đã nắm vững các luận điểm cốt lõi của bài học."
                      : "Bạn đã hoàn thành bài test! Hãy ôn lại các chuyên đề lý luận bên trên để nâng cao điểm số nhé."}
                  </p>

                  <div className="action-group">
                    <button className="retry" onClick={handleResetAll}>
                      Làm Lại Lượt Mới
                    </button>
                    <button
                      className="view-leaderboard"
                      onClick={() => setActiveTab("leaderboard")}
                    >
                      Xem Bảng Kết Quả
                    </button>
                  </div>
                </SummaryView>
              )}
            </QuizContainer>
          </QuizStageWrapper>
        ) : (
          <LeaderboardContainer>
            {/* Realtime Aggregated Metrics */}
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Tổng Thí Sinh</span>
                <span className="metric-value">{totalParticipants}</span>
                <span className="metric-sub">Lượt thi ghi nhận</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Điểm Cao Nhất (Thủ Khoa)</span>
                <span className="metric-value highlight">{highestScore} / 10</span>
                <span className="metric-sub">
                  {topScorer ? `${topScorer.name} (${topScorer.time || "Sớm nhất"})` : "Chưa có dữ liệu"}
                </span>
              </div>
            </div>

            <div className="table-header">
              <div className="title-group">
                <h3>Bảng Xếp Hạng & Lịch Sử Làm Bài</h3>
              </div>

              <div className="btn-group">
                <button
                  className="sync-btn"
                  onClick={loadLeaderboardData}
                  disabled={isSyncing}
                  title="Tải lại dữ liệu mới nhất từ Google Sheets"
                >
                  {isSyncing ? "Đang tải..." : "Làm Mới"}
                </button>
              </div>
            </div>

            {leaderboard.length > 0 ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "80px" }}>Hạng</th>
                      <th>Họ và Tên / Thí Sinh</th>
                      <th>Điểm Số</th>
                      <th>Tỷ Lệ</th>
                      <th>Thời Gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item, idx) => (
                      <tr key={idx}>
                        <td className={`rank ${idx === 0 ? "top-1" : idx === 1 ? "top-2" : idx === 2 ? "top-3" : ""}`}>
                          #{idx + 1}
                        </td>
                        <td style={{ fontWeight: "700", color: "#F8FAFC" }}>{item.name}</td>
                        <td className="score">{item.score} / {item.total || 10}</td>
                        <td style={{ color: "#94A3B8", fontWeight: "600" }}>{item.percent}%</td>
                        <td style={{ color: "#64748B", fontSize: "0.82rem" }}>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                Chưa có lượt thi nào được ghi nhận. Hãy bắt đầu làm bài để ghi tên lên bảng vàng!
              </div>
            )}
          </LeaderboardContainer>
        )}
      </Container>
    </Section>
  );
};

export default ReviewQuiz;
