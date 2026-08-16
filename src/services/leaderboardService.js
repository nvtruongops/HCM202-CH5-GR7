import { GOOGLE_SHEET_CONFIG } from "../config/googleSheetConfig";

/**
 * Thuật toán sắp xếp bảng xếp hạng chuẩn:
 * 1. Điểm số cao nhất xếp trước (score DESC)
 * 2. Bằng điểm nhau: Ai hoàn thành sớm hơn xếp trước (timestamp ASC)
 */
export const sortLeaderboardRecords = (records) => {
  if (!Array.isArray(records)) return [];
  return [...records].sort((a, b) => {
    const scoreDiff = (b.score || 0) - (a.score || 0);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    const timeA = typeof a.timestamp === "number" ? a.timestamp : 0;
    const timeB = typeof b.timestamp === "number" ? b.timestamp : 0;
    return timeA - timeB;
  });
};

/**
 * Tải danh sách Bảng Xếp Hạng trực tiếp từ Google Sheets (Chỉ nhận dữ liệu từ Sheet)
 */
export const fetchLeaderboard = async () => {
  const webappUrl = GOOGLE_SHEET_CONFIG.getWebappUrl();

  if (!webappUrl) {
    return {
      records: [],
      isCloudSync: false,
      message: "Chưa cấu hình Google Sheet Webhook URL"
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(webappUrl, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const result = await response.json();
    if (result && result.status === "success" && Array.isArray(result.data)) {
      const sortedCloud = sortLeaderboardRecords(result.data);
      return {
        records: sortedCloud,
        isCloudSync: true,
        message: "Đồng bộ từ Google Sheets thành công"
      };
    }
  } catch (err) {
    console.warn("Không thể tải dữ liệu từ Google Sheets:", err);
  }

  return {
    records: [],
    isCloudSync: false,
    message: "Không thể kết nối Google Sheets"
  };
};

/**
 * Gửi điểm số mới trực tiếp lên Google Sheets và nhận lại danh sách mới nhất từ Sheet
 */
export const submitLeaderboardScore = async (newRecord) => {
  const completeRecord = {
    name: (newRecord.name || "Thí sinh").trim(),
    score: Number(newRecord.score) || 0,
    total: Number(newRecord.total) || 10,
    percent: Number(newRecord.percent) || Math.round(((Number(newRecord.score) || 0) / (Number(newRecord.total) || 10)) * 100),
    time: newRecord.time || "",
    timestamp: typeof newRecord.timestamp === "number" ? newRecord.timestamp : Date.now()
  };

  const webappUrl = GOOGLE_SHEET_CONFIG.getWebappUrl();
  if (!webappUrl) {
    console.warn("Chưa điền DEFAULT_WEBAPP_URL trong file src/config/googleSheetConfig.js");
    return {
      records: [completeRecord],
      isCloudSync: false,
      message: "Chưa cấu hình Webhook URL trong googleSheetConfig.js"
    };
  }

  try {
    // 1. Gửi request POST dạng text/plain để tránh preflight CORS OPTIONS của trình duyệt
    const response = await fetch(webappUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(completeRecord)
    });

    if (response.ok) {
      try {
        const result = await response.json();
        if (result && result.status === "success" && Array.isArray(result.data)) {
          const sortedCloud = sortLeaderboardRecords(result.data);
          return { records: sortedCloud, isCloudSync: true, message: "Gửi điểm thành công" };
        }
      } catch (jsonErr) {
        // Fallback đọc lại dữ liệu mới nhất
        const fresh = await fetchLeaderboard();
        if (fresh.isCloudSync) {
          return fresh;
        }
      }
    }
  } catch (err) {
    console.warn("Đang thử lại qua chế độ no-cors fallback:", err);
    try {
      // 2. Fallback mode: no-cors cho trường hợp trình duyệt chặn CORS redirect của Google Apps Script
      await fetch(webappUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(completeRecord)
      });

      // Đợi 700ms để Google Apps Script ghi vào trang tính rồi fetch lại
      await new Promise((resolve) => setTimeout(resolve, 700));
      const fresh = await fetchLeaderboard();
      if (fresh.isCloudSync) {
        return fresh;
      }
    } catch (fallbackErr) {
      console.error("Lỗi khi gửi dữ liệu lên Google Sheets:", fallbackErr);
    }
  }

  return { records: [completeRecord], isCloudSync: false, message: "Lỗi kết nối Webhook" };
};
