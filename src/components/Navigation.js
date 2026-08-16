import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NavContainer = styled.header`
  width: ${props => props.menuOpen ? "calc(100vw - 380px)" : "100%"};
  max-width: ${props => props.menuOpen ? "calc(100vw - 380px)" : "100%"};
  height: 4.2rem;
  background-color: ${props => props.scrolled ? "rgba(15, 23, 42, 0.85)" : "rgba(15, 23, 42, 0.65)"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.scrolled ? "rgba(255, 215, 0, 0.35)" : "rgba(255, 255, 255, 0.08)"};
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-bottom 0.3s ease;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #D32F2F, #FFD700, #38BDF8);
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
`;

const NavInner = styled.div`
  width: 94%;
  max-width: 1350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;

  .star-badge {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #D32F2F, #8B0000);
    border: 2px solid #FFD700;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFD700;
    font-size: 1.1rem;
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.4);
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    
    .course {
      font-size: clamp(0.9rem, 1vw, 1.05rem);
      font-weight: 800;
      color: #FFD700;
      letter-spacing: 0.03em;
      line-height: 1.1;
      white-space: nowrap;
    }

    .sub {
      font-size: 0.65rem;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: clamp(8px, 1vw, 16px);
  margin: 0 auto;

  @media (max-width: 1080px) {
    display: ${props => props.open ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100vw;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    padding: 24px 0;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    gap: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
  }
`;

const NavItem = styled.li`
  white-space: nowrap;

  a {
    color: #F8FAFC;
    font-size: clamp(0.82rem, 0.88vw, 0.9rem);
    font-weight: 500;
    position: relative;
    padding: 6px 4px;
    letter-spacing: 0.01em;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #FFD700;
      transition: width 0.25s ease;
    }

    &:hover {
      color: #FFD700;
      &::after {
        width: 100%;
      }
    }
  }

  @media (max-width: 1080px) {
    a {
      font-size: 1.05rem;
      padding: 8px 16px;
    }
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const FullscreenBtn = styled.button`
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38BDF8;
  height: 38px;
  padding: 0 12px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:hover {
    background: rgba(56, 189, 248, 0.18);
    border-color: #FFD700;
    color: #FFD700;
    transform: translateY(-1px);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.35);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:active svg {
    transform: scale(0.9);
  }

  .btn-label {
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const CTAButton = styled.a`
  background: linear-gradient(135deg, #FFD700, #B8860B);
  color: #0F172A;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 8px 16px;
  height: 38px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
    background: linear-gradient(135deg, #FFF080, #D4AF37);
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: transparent;
  color: #FFD700;
  font-size: 1.6rem;
  cursor: pointer;
  padding: 4px;

  @media (max-width: 1080px) {
    display: block;
  }
`;

const Navigation = ({ menuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));

      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <NavContainer scrolled={scrolled} menuOpen={menuOpen}>
      <ProgressBar progress={scrollProgress} />
      <NavInner>
        <Logo href="#home">
          <div className="star-badge">★</div>
          <div className="logo-text">
            <span className="course">HCM202 • CHƯƠNG 5</span>
            <span className="sub">Tư Tưởng Hồ Chí Minh</span>
          </div>
        </Logo>

        <NavLinks open={mobileOpen}>
          <NavItem><a href="#overview" onClick={closeMenu}>Tổng Quan</a></NavItem>
          <NavItem><a href="#great-unity" onClick={closeMenu}>Đại Đoàn Kết Dân Tộc</a></NavItem>
          <NavItem><a href="#international-unity" onClick={closeMenu}>Đoàn Kết Quốc Tế</a></NavItem>
          <NavItem><a href="#modern-application" onClick={closeMenu}>Vận Dụng Hiện Nay</a></NavItem>
        </NavLinks>

        <RightControls>
          <FullscreenBtn
            onClick={toggleFullscreen}
            title={isFullscreen ? "Thu nhỏ màn hình (Esc)" : "Mở rộng toàn màn hình (Full Page)"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
                <span className="btn-label">Thu Nhỏ</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
                <span className="btn-label">Full Page</span>
              </>
            )}
          </FullscreenBtn>

          <CTAButton href="#quiz-section">
            <span>Ôn Tập & Quiz</span>
          </CTAButton>

          <MobileMenuBtn onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? "✕" : "☰"}
          </MobileMenuBtn>
        </RightControls>
      </NavInner>
    </NavContainer>
  );
};

export default Navigation;
