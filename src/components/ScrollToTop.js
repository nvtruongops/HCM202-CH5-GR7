import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 6px 28px rgba(255, 215, 0, 0.75);
  }
  100% {
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  }
`;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: ${props => (props.isOpen ? "none" : "block")};

  @media (max-width: 640px) {
    bottom: 1.2rem;
    right: 1.2rem;
  }
`;

const FloatingButton = styled.button`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: #0A0F1D;
  border: 2px solid #FFF080;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${pulseGlow} 3s infinite ease-in-out;

  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.8);
    background: linear-gradient(135deg, #FFF080, #D4AF37);
  }

  .icon {
    font-size: 1.25rem;
    line-height: 1;
    font-weight: 900;
  }

  .label-hint {
    font-size: 0.52rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
    .icon {
      font-size: 1.1rem;
    }
    .label-hint {
      font-size: 0.48rem;
    }
  }
`;

/* Side Panel Drawer (DevTools Docked Style - NO Full Page Blur) */
const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 380px;
  max-width: 88vw;
  height: 100vh;
  background: rgba(10, 15, 29, 0.96);
  backdrop-filter: blur(16px);
  border-left: 1.5px solid rgba(255, 215, 0, 0.35);
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 215, 0, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 10001;
  animation: ${slideInRight} 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 640px) {
    width: 100vw;
    max-width: 100vw;
    border-left: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.3rem;
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  flex-shrink: 0;

  .header-title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;

    .star {
      color: #FFD700;
      font-size: 1.15rem;
    }

    h3 {
      font-size: 0.98rem;
      font-weight: 800;
      color: #F8FAFC;
      letter-spacing: 0.5px;
      margin: 0;
      text-transform: uppercase;
    }
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #CBD5E1;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: #EF4444;
      color: #EF4444;
      transform: rotate(90deg);
    }
  }
`;

const DrawerBody = styled.div`
  padding: 1.1rem 1.2rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.35);
    border-radius: 3px;
  }

  @media (max-width: 640px) {
    padding: 0.9rem 1rem;
    gap: 0.85rem;
  }
`;

const SectionGroup = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.isGroupActive ? "rgba(255, 215, 0, 0.4)" : "rgba(255, 255, 255, 0.07)"};
  border-radius: 12px;
  padding: 0.85rem 1rem;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.35);
    background: rgba(15, 23, 42, 0.8);
  }

  .main-heading {
    display: flex;
    align-items: flex-start;
    font-size: 0.92rem;
    font-weight: 800;
    color: ${props => props.isGroupActive ? "#FFF080" : "#FFD700"};
    margin-bottom: 0.65rem;
    cursor: pointer;
    line-height: 1.4;
    transition: color 0.2s ease;

    &:hover {
      color: #FFF080;
      text-decoration: underline;
    }
  }

  .sub-list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-left: 0.2rem;
  }
`;

const SubItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  font-size: 0.86rem;
  line-height: 1.4;
  border: 1px solid ${props => props.isActive ? "#FFD700" : "transparent"};
  background: ${props => props.isActive ? "linear-gradient(135deg, rgba(255, 215, 0, 0.22), rgba(212, 175, 55, 0.12))" : "transparent"};
  color: ${props => props.isActive ? "#FFFFFF" : "#CBD5E1"};
  font-weight: ${props => props.isActive ? "700" : "400"};
  transform: ${props => props.isActive ? "translateX(4px)" : "none"};
  box-shadow: ${props => props.isActive ? "0 2px 10px rgba(255, 215, 0, 0.2)" : "none"};

  .tree-branch {
    color: ${props => props.isActive ? "#FFD700" : "#64748B"};
    font-family: monospace;
    font-weight: bold;
    user-select: none;
    flex-shrink: 0;
  }

  .active-indicator {
    color: #FFD700;
    font-size: 0.75rem;
    line-height: 1.4;
    margin-right: 2px;
  }

  .sub-text {
    flex: 1;
    color: ${props => props.isActive ? "#FFD700" : "inherit"};
    transition: color 0.2s ease;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.12);
    color: #F8FAFC;
    transform: translateX(4px);

    .tree-branch {
      color: #FFD700;
    }
    .sub-text {
      color: #FFD700;
    }
  }
`;

const UtilityBar = styled.div`
  padding: 0.85rem 1.2rem;
  background: rgba(15, 23, 42, 0.85);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  .top-btn {
    width: 100%;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 215, 0, 0.3);
    color: #FFD700;
    padding: 9px 14px;
    border-radius: 8px;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    transition: all 0.25s ease;

    &:hover {
      background: linear-gradient(135deg, #FFD700, #D4AF37);
      border-color: #FFF080;
      color: #0A0F1D;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    }
  }
`;

const TOC_DATA = [
  {
    id: "home",
    title: "GIỚI THIỆU TỔNG QUAN",
    items: [
      { id: "home", title: "Giới thiệu Chương 5 & Danh ngôn Bác Hồ" },
    ],
  },
  {
    id: "overview",
    title: "HỆ THỐNG KIẾN THỨC",
    items: [
      { id: "overview", title: "3 Trụ Cột Tri Thức Cốt Lõi" },
    ],
  },
  {
    id: "great-unity",
    title: "5.1. TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC",
    items: [
      { id: "sec-5-1-1", title: "5.1.1. Vai trò của đại đoàn kết toàn dân tộc" },
      { id: "sec-5-1-2", title: "5.1.2. Lực lượng đại đoàn kết dân tộc" },
      { id: "sec-5-1-3", title: "5.1.3. Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc" },
      { id: "sec-5-1-4", title: "5.1.4. Hình thức tổ chức: Mặt trận Dân tộc Thống nhất" },
      { id: "sec-5-1-5", title: "5.1.5. Phương thức xây dựng khối đại đoàn kết dân tộc" },
    ],
  },
  {
    id: "international-unity",
    title: "5.2. TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐOÀN KẾT QUỐC TẾ",
    items: [
      { id: "sec-5-2-1", title: "5.2.1. Sự cần thiết phải đoàn kết quốc tế" },
      { id: "sec-5-2-2", title: "5.2.2. Lực lượng đoàn kết quốc tế và hình thức tổ chức" },
      { id: "sec-5-2-3", title: "5.2.3. Nguyên tắc đoàn kết quốc tế" },
    ],
  },
  {
    id: "modern-application",
    title: "5.3. VẬN DỤNG TƯ TƯỞNG HỒ CHÍ MINH TRONG GIAI ĐOẠN HIỆN NAY",
    items: [
      { id: "sec-5-3-1", title: "5.3.1. Quán triệt tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế" },
      { id: "sec-5-3-2", title: "5.3.2. Xây dựng khối đại đoàn kết trên nền tảng liên minh công - nông - trí" },
      { id: "sec-5-3-3", title: "5.3.3. Đại đoàn kết toàn dân tộc phải kết hợp với đoàn kết quốc tế & 4 bài học kinh nghiệm" },
    ],
  },
  {
    id: "summary-focus-questions",
    title: "TỔNG KẾT TOÀN DIỆN: TRẢ LỜI CÂU HỎI TRỌNG TÂM",
    items: [
      { id: "summary-focus-questions", title: "Trả lời câu hỏi trọng tâm: Mối quan hệ 2 chiều giữa Độc lập dân tộc & Đoàn kết quốc tế" },
    ],
  },
  {
    id: "quiz-section",
    title: "ÔN TẬP & TRẮC NGHIỆM ĐÁNH GIÁ (QUIZ)",
    items: [
      { id: "quiz-section", title: "Làm bài tập trắc nghiệm củng cố kiến thức Chương 5 (20 Câu hỏi)" },
    ],
  },
];

const CHECKPOINTS = [
  { trigger: "home", activeId: "home" },
  { trigger: "overview", activeId: "overview" },
  { trigger: "great-unity", activeId: "sec-5-1-1" },
  { trigger: "sec-5-1-1", activeId: "sec-5-1-1" },
  { trigger: "sec-5-1-2", activeId: "sec-5-1-2" },
  { trigger: "sec-5-1-3", activeId: "sec-5-1-3" },
  { trigger: "sec-5-1-4", activeId: "sec-5-1-4" },
  { trigger: "sec-5-1-5", activeId: "sec-5-1-5" },
  { trigger: "international-unity", activeId: "sec-5-2-1" },
  { trigger: "sec-5-2-1", activeId: "sec-5-2-1" },
  { trigger: "sec-5-2-2", activeId: "sec-5-2-2" },
  { trigger: "sec-5-2-3", activeId: "sec-5-2-3" },
  { trigger: "modern-application", activeId: "sec-5-3-1" },
  { trigger: "sec-5-3-1", activeId: "sec-5-3-1" },
  { trigger: "sec-5-3-2", activeId: "sec-5-3-2" },
  { trigger: "sec-5-3-3", activeId: "sec-5-3-3" },
  { trigger: "summary-focus-questions", activeId: "summary-focus-questions" },
  { trigger: "quiz-section", activeId: "quiz-section" },
];

const ScrollToTop = ({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen || setInternalIsOpen;
  const [activeId, setActiveId] = useState("home");

  // ScrollSpy: Instant and zero-latency active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Bottom of page check
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100) {
        setActiveId("quiz-section");
        return;
      }

      if (window.pageYOffset < 150) {
        setActiveId("home");
        return;
      }

      const scrollTarget = window.pageYOffset + 200;

      for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
        const cp = CHECKPOINTS[i];
        const el = document.getElementById(cp.trigger);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollTarget >= top) {
            setActiveId(cp.activeId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveId("");
  };

  return (
    <>
      <FloatingContainer isOpen={isOpen}>
        {/* Main TOC Button: ALWAYS VISIBLE & TOGGLES DRAWER */}
        <FloatingButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Đóng Menu Mục Lục" : "Mở Menu Mục Lục & Theo Dõi"}
          aria-label={isOpen ? "Đóng Menu Mục Lục" : "Mở Menu Mục Lục & Theo Dõi"}
        >
          <span className="icon">{isOpen ? "✕" : "☰"}</span>
          <span className="label-hint">{isOpen ? "Đóng" : "Mục Lục"}</span>
        </FloatingButton>
      </FloatingContainer>

      {/* Side Panel Drawer (DevTools Docked Style - NO Full Page Blur) */}
      {isOpen && (
        <SidePanel>
          <DrawerHeader>
            <div className="header-title-wrap">
              <span className="star">★</span>
              <h3>Mục Lục & Điều Hướng</h3>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng mục lục"
            >
              ✕
            </button>
          </DrawerHeader>

          <DrawerBody>
            {TOC_DATA.map((group) => {
              const isGroupActive = group.items.some((item) => item.id === activeId);
              return (
                <SectionGroup key={group.id} isGroupActive={isGroupActive}>
                  <div
                    className="main-heading"
                    onClick={() => scrollToSection(group.id)}
                    title={`Chuyển đến ${group.title}`}
                  >
                    <span>{group.title}</span>
                  </div>

                  <div className="sub-list">
                    {group.items.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <SubItem
                          key={item.id}
                          isActive={isActive}
                          onClick={() => scrollToSection(item.id)}
                          title={`Xem ${item.title}`}
                        >
                          <span className="tree-branch">└──</span>
                          {isActive && <span className="active-indicator">▶</span>}
                          <span className="sub-text">{item.title}</span>
                        </SubItem>
                      );
                    })}
                  </div>
                </SectionGroup>
              );
            })}
          </DrawerBody>

          <UtilityBar>
            <button className="top-btn" onClick={scrollToTop}>
              ⬆ Cuộn Lên Đầu Trang
            </button>
          </UtilityBar>
        </SidePanel>
      )}
    </>
  );
};

export default ScrollToTop;
