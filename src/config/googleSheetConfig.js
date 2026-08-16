/**
 * Cấu hình Webhook đồng bộ Bảng Xếp Hạng qua Google Sheets (Realtime Sync)
 * 
 * - Đọc an toàn từ biến môi trường `REACT_APP_GOOGLE_SHEET_WEBAPP_URL`
 * - Được inject tự động thông qua GitHub Actions Secrets khi deploy lên GitHub Pages
 * - Tuyệt đối không hardcode URL nhạy cảm trong mã nguồn công khai trên GitHub
 */

export const GOOGLE_SHEET_CONFIG = {
  // Lấy URL Webhook từ biến môi trường (build-time secret)
  getWebappUrl: () => {
    const envUrl = process.env.REACT_APP_GOOGLE_SHEET_WEBAPP_URL;
    if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
      return envUrl.trim();
    }
    return "";
  }
};


