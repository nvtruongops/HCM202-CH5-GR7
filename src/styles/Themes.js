// Định nghĩa Design Tokens theo design.md
export const darkTheme = {
  body: "#0F172A",
  bodyRgba: "15, 23, 42",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textRgba: "248, 250, 252",
  
  // Màu sắc chủ đạo tư tưởng
  primaryGold: "#FFD700",
  accentGold: "#D4AF37",
  darkGold: "#B8860B",
  
  accentRed: "#D32F2F",
  darkRed: "#8B0000",
  brightRed: "#EF4444",
  
  highlightBlue: "#38BDF8",
  darkBlue: "#0369A1",
  
  // Card & Khung kính mờ
  cardBg: "rgba(30, 41, 59, 0.8)",
  cardBgHover: "rgba(30, 41, 59, 0.95)",
  cardBorder: "rgba(255, 215, 0, 0.25)",
  cardBorderHover: "rgba(255, 215, 0, 0.6)",
  carouselColor: "#1E293B",
  
  // Kích thước chữ
  fontxs: "0.75rem",
  fontsm: "0.875rem",
  fontmd: "1rem",
  fontlg: "1.25rem",
  fontxl: "1.75rem",
  fontxxl: "2.5rem",
  fontxxxl: "3.5rem",
  fontButton: "0.95rem",
  
  navHeight: "4.5rem",
  borderRadius: "16px",
};

export const lightTheme = {
  ...darkTheme,
  body: "#F8FAFC",
  bodyRgba: "248, 250, 252",
  text: "#0F172A",
  textMuted: "#475569",
  textRgba: "15, 23, 42",
  cardBg: "rgba(255, 255, 255, 0.9)",
  cardBgHover: "rgba(255, 255, 255, 1)",
  cardBorder: "rgba(212, 175, 55, 0.3)",
};
