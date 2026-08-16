/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - REALTIME LEADERBOARD WEBHOOK (HCM202 - CHƯƠNG 5)
 * ==============================================================================
 * HƯỚNG DẪN TRIỂN KHAI NHANH TRONG 1 PHÚT (HOÀN TOÀN MIỄN PHÍ - 0 ĐỒNG):
 * 
 * 1. Truy cập https://sheets.new để tạo một trang tính Google Sheets mới.
 * 2. Đặt tên Sheet là: "HCM202_Leaderboard".
 * 3. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 4. Xóa toàn bộ mã mặc định trong file Code.gs và dán toàn bộ đoạn code này vào.
 * 5. Nhấn nút "Lưu" (biểu tượng đĩa mềm hoặc Ctrl + S).
 * 6. Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 7. Chọn loại triển khai: "Ứng dụng web" (Web app).
 *    - Mô tả (Description): "HCM202 Leaderboard Webhook"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> [RẤT QUAN TRỌNG: để sinh viên gửi điểm được]
 * 8. Nhấn "Triển khai" (Deploy) -> Cấp quyền cho Script nếu Google yêu cầu.
 * 9. Copy "URL Ứng dụng web" (Web app URL có dạng https://script.google.com/macros/s/.../exec)
 * 10. Dán URL đó vào file `src/config/googleSheetConfig.js` hoặc nhập trực tiếp trên web!
 * ==============================================================================
 */

function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    var rows = [];

    // Bỏ qua dòng tiêu đề (row 0)
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (row[0] && String(row[0]).trim() !== "") {
          rows.push({
            name: String(row[0]).trim(),
            score: Number(row[1]) || 0,
            total: Number(row[2]) || 10,
            percent: Number(row[3]) || 0,
            time: String(row[4] || "").trim(),
            timestamp: Number(row[5]) || 0
          });
        }
      }
    }

    // Xếp hạng: 1. Điểm cao nhất trước; 2. Bằng điểm: Ai nộp sớm nhất trước
    rows.sort(function(a, b) {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (a.timestamp || 0) - (b.timestamp || 0);
    });

    return createJsonResponse({
      status: "success",
      count: rows.length,
      data: rows
    });
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    var payload = {};

    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    var name = (payload.name || "Thí sinh ẩn danh").toString().trim();
    var score = Number(payload.score) || 0;
    var total = Number(payload.total) || 10;
    var percent = Number(payload.percent) || Math.round((score / total) * 100);
    var time = (payload.time || "").toString().trim();
    var timestamp = Number(payload.timestamp) || new Date().getTime();

    // Ghi dòng mới vào Google Sheet
    sheet.appendRow([name, score, total, percent, time, timestamp]);

    // Trả về danh sách xếp hạng mới nhất sau khi cập nhật
    return doGet(e);
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function getOrCreateSheet() {
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  if (!ss) {
    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty("HCM202_SHEET_ID");
    if (sheetId) {
      try {
        ss = SpreadsheetApp.openById(sheetId);
      } catch (e) {}
    }

    if (!ss) {
      // Tự động tạo trang tính HCM202_Leaderboard_DB trong Google Drive nếu là script độc lập
      ss = SpreadsheetApp.create("HCM202_Leaderboard_DB");
      props.setProperty("HCM202_SHEET_ID", ss.getId());
    }
  }

  var sheet = ss.getActiveSheet();

  // Khởi tạo hàng tiêu đề nếu sheet còn trống
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Họ và Tên", "Điểm Số", "Tổng Điểm", "Tỷ Lệ (%)", "Thời Gian", "Timestamp"]);
    sheet.getRange(1, 1, 1, 6)
      .setFontWeight("bold")
      .setBackground("#1E293B")
      .setFontColor("#F8FAFC");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
