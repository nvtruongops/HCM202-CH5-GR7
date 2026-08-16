import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    /* Cuộn đứt khúc tự nhiên (Snap Scrolling Proximity) bắt điểm chuẩn xác từng phần */
    scroll-snap-type: y proximity;
    scroll-padding-top: 76px;
    font-size: 16px;
  }

  body {
    font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Tự động snap dừng khớp ở đầu mỗi section */
  section {
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    scroll-margin-top: 76px;
  }

  /* React View Transitions & Native CSS Transitions */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
    animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Be Vietnam Pro', 'Montserrat', sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  button {
    font-family: 'Be Vietnam Pro', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  /* Tùy chỉnh thanh cuộn hoàng gia Dark & Gold */
  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-webkit-scrollbar-track {
    background: #0B1120;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FFD700, #B8860B);
    border-radius: 6px;
    border: 2px solid #0B1120;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #FFF080, #D4AF37);
  }

  ::selection {
    background-color: #D32F2F;
    color: #FFD700;
  }

  .badge-gold {
    background: linear-gradient(135deg, #FFD700, #B8860B);
    color: #0F172A;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.78rem;
    display: inline-block;
    letter-spacing: 0.03em;
  }

  .badge-red {
    background: linear-gradient(135deg, #EF4444, #991B1B);
    color: #FFFFFF;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.78rem;
    display: inline-block;
    letter-spacing: 0.03em;
  }

  .badge-blue {
    background: linear-gradient(135deg, #38BDF8, #0369A1);
    color: #FFFFFF;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.78rem;
    display: inline-block;
    letter-spacing: 0.03em;
  }
`;

export default GlobalStyles;
