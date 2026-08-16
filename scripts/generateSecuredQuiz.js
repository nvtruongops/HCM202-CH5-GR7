// Script to generate hashed quiz data
const fs = require('fs');
const path = require('path');

const QUIZ_SALT = "HCM202_KIENTHUC_CHUONG5_SECURE_SALT_2024";

const hashChoice = (qId, optionIndex) => {
  const payload = `${QUIZ_SALT}_qid_${qId}_choice_${optionIndex}_ans`;
  let h1 = 0x811c9dc5;
  let h2 = 0x5a17c09e;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 0x01000193);
    h2 = Math.imul(h2 ^ code, 0x01000193) ^ h1;
  }
  return ((h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)).padStart(16, "0");
};

const hashPair = (qId, leftId, rightId) => {
  const payload = `${QUIZ_SALT}_qid_${qId}_match_${leftId}_to_${rightId}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x5a17c09e;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 0x01000193);
    h2 = Math.imul(h2 ^ code, 0x01000193) ^ h1;
  }
  return ((h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)).padStart(16, "0");
};

const encodeExplanation = (text, keyString = QUIZ_SALT) => {
  const bytes = Buffer.from(text, 'utf-8');
  const keyBytes = Buffer.from(keyString, 'utf-8');
  const encoded = Buffer.alloc(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    encoded[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
  }
  return encoded.toString('base64');
};

const rawMCQ = [
  {
    id: 1,
    speakerTag: "5.1.1 • Vai Trò Chiến Lược",
    question: "Theo tư tưởng Hồ Chí Minh, đại đoàn kết toàn dân tộc có vị trí như thế nào trong tiến trình cách mạng Việt Nam?",
    options: [
      "Là một giải pháp tình thế trong từng giai đoạn",
      "Là vấn đề có ý nghĩa chiến lược, quyết định thành công",
      "Là thủ đoạn chính trị để tập hợp lực lượng quần chúng",
      "Là mục tiêu phụ trợ bên cạnh chiến lược phát triển"
    ],
    correctIndex: 1,
    explanation: "Hồ Chí Minh khẳng định đại đoàn kết toàn dân tộc là vấn đề có ý nghĩa chiến lược cơ bản, nhất quán, lâu dài và xuyên suốt, quyết định mọi thắng lợi của cách mạng."
  },
  {
    id: 2,
    speakerTag: "5.1.1 • Khẩu Hiệu Bất Hủ",
    question: "Hồ Chí Minh đúc kết câu khẩu hiệu nổi tiếng nào về sức mạnh của khối đại đoàn kết toàn dân tộc?",
    options: [
      "Đoàn kết là sức mạnh - Đấu tranh là thắng lợi - Phát triển là thành công",
      "Không có gì quý hơn độc lập, tự do - Hạnh phúc, hạnh phúc, đại hạnh phúc",
      "Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công",
      "Đoàn kết toàn dân - Kháng chiến toàn diện - Độc lập dân tộc - Tự do nhân dân"
    ],
    correctIndex: 2,
    explanation: "Câu khẩu hiệu kinh điển: 'Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công' thể hiện quy luật sức mạnh to lớn của khối đại đoàn kết."
  },
  {
    id: 3,
    speakerTag: "5.1.1 • Mục Tiêu & Nhiệm Vụ",
    question: "Theo tư tưởng Hồ Chí Minh, đại đoàn kết toàn dân tộc là mục tiêu, nhiệm vụ hàng đầu của tổ chức nào?",
    options: [
      "Riêng lực lượng vũ trang nhân dân",
      "Các đoàn thể thanh niên và phụ nữ",
      "Chính phủ và các cơ quan hành chính",
      "Đảng và toàn thể cách mạng Việt Nam"
    ],
    correctIndex: 3,
    explanation: "Đại đoàn kết toàn dân tộc là mục tiêu, nhiệm vụ hàng đầu của Đảng và của toàn thể dân tộc cách mạng Việt Nam."
  },
  {
    id: 4,
    speakerTag: "5.1.2 • Khái Niệm Dân & Nhân Dân",
    question: "Trong tư tưởng Hồ Chí Minh, hai khái niệm 'Dân' và 'Nhân dân' dùng để chỉ những đối tượng nào?",
    options: [
      "Mọi con dân nước Việt, mỗi một con Rồng cháu Tiên",
      "Chỉ giai cấp công nhân và giai cấp nông dân",
      "Những tầng lớp lao động sống ở trong nước",
      "Những người theo giai cấp tư sản tiến bộ"
    ],
    correctIndex: 0,
    explanation: "Bác quan niệm 'Dân' và 'Nhân dân' chỉ mọi con dân nước Việt, mỗi một con Rồng cháu Tiên, không phân biệt già trẻ, gái trai, giàu nghèo, quý tiện."
  },
  {
    id: 5,
    speakerTag: "5.1.2 • Nền Tảng Nòng Cốt",
    question: "Nền tảng của khối đại đoàn kết toàn dân tộc theo tư tưởng Hồ Chí Minh là lực lượng nào?",
    options: [
      "Tập hợp các đảng phái chính trị và tổ chức tôn giáo",
      "Liên minh giữa giai cấp công nhân, nông dân và tầng lớp trí thức",
      "Liên minh giữa giai cấp tư sản dân tộc và tiểu tư sản",
      "Khối hợp tác giữa các dân tộc thiểu số và đa số"
    ],
    correctIndex: 1,
    explanation: "Khối đại đoàn kết toàn dân tộc được xây dựng trên nền tảng liên minh Công nhân - Nông dân - Trí thức đặt dưới sự lãnh đạo của Đảng."
  },
  {
    id: 6,
    speakerTag: "5.1.3 • Mẫu Số Chung Quy Tụ",
    question: "Một trong 4 điều kiện cốt lõi để xây dựng khối đại đoàn kết toàn dân tộc là gì?",
    options: [
      "Xóa bỏ hoàn toàn mọi khác biệt về lợi ích cá nhân",
      "Bắt buộc tất cả các giai tầng phải có chung một mức thu nhập",
      "Lấy lợi ích chung của dân tộc làm điểm quy tụ, đồng thời tôn trọng lợi ích khác biệt chính đáng",
      "Chỉ tập hợp những người có cùng quan điểm chính trị tuyệt đối"
    ],
    correctIndex: 2,
    explanation: "Điều kiện hàng đầu là lấy lợi ích chung của Tổ quốc làm điểm quy tụ, lấy lợi ích tối cao của dân tộc làm mẫu số chung, đồng thời tôn trọng lợi ích khác biệt chính đáng."
  },
  {
    id: 7,
    speakerTag: "5.1.4 • Nguyên Tắc Mặt Trận",
    question: "Mặt trận Dân tộc Thống nhất hoạt động theo nguyên tắc cơ bản nào sau đây?",
    options: [
      "Chấp hành mệnh lệnh hành chính một chiều",
      "Hiệp thương dân chủ",
      "Đa số tuyệt đối quyết định mọi vấn đề",
      "Chỉ phục tùng ý chí của các giai cấp nòng cốt"
    ],
    correctIndex: 1,
    explanation: "Mặt trận Dân tộc Thống nhất hoạt động theo nguyên tắc hiệp thương dân chủ, bàn bạc công khai, đi đến nhất trí vì lợi ích chung của quốc gia dân tộc."
  },
  {
    id: 8,
    speakerTag: "5.1.5 • Phương Thức Dân Vận",
    question: "Phương thức đầu tiên và quan trọng nhất trong xây dựng khối đại đoàn kết dân tộc theo Hồ Chí Minh là gì?",
    options: [
      "Sử dụng biện pháp cưỡng chế hành chính",
      "Áp đặt các chỉ tiêu hành chính bắt buộc",
      "Mở rộng các hoạt động ngoại giao đa phương trước tiên",
      "Làm tốt công tác vận động quần chúng (Dân vận)"
    ],
    correctIndex: 3,
    explanation: "Phương thức đầu tiên là làm tốt công tác Dân vận theo phương châm: Trọng dân, gần dân, hiểu dân, học dân và có trách nhiệm với nhân dân."
  },
  {
    id: 9,
    speakerTag: "5.2.1 • Sức Mạnh Tổng Hợp",
    question: "Mục đích cơ bản của việc thực hiện đoàn kết quốc tế theo tư tưởng Hồ Chí Minh là nhằm kết hợp sức mạnh dân tộc với sức mạnh thời đại để làm gì?",
    options: [
      "Tạo thành sức mạnh tổng hợp đưa cách mạng đến thắng lợi hoàn toàn",
      "Trông chờ toàn bộ nguồn lực tài chính từ bên ngoài",
      "Thay thế hoàn toàn lực lượng chiến đấu trong nước",
      "Phụ thuộc vào sự bảo trợ của các nước lớn"
    ],
    correctIndex: 0,
    explanation: "Đoàn kết quốc tế nhằm kết hợp sức mạnh dân tộc với sức mạnh thời đại, tạo nên sức mạnh tổng hợp vô địch để chiến thắng kẻ thù và xây dựng đất nước."
  },
  {
    id: 10,
    speakerTag: "5.2.1 • Mục Tiêu Thời Đại",
    question: "Hồ Chí Minh xác định 4 mục tiêu cao cả của thời đại mà cách mạng Việt Nam cùng nhân dân thế giới phấn đấu thực hiện là gì?",
    options: [
      "Tự do thương mại, tăng trưởng kinh tế, công nghệ hóa, hiện đại hóa",
      "Bình đẳng xã hội, toàn cầu hóa, xóa đói giảm nghèo, bảo vệ môi trường",
      "Hòa bình, độc lập dân tộc, dân chủ và chủ nghĩa xã hội",
      "Chống biến đổi khí hậu, an ninh năng lượng, trật tự kinh tế mới, hợp tác số"
    ],
    correctIndex: 2,
    explanation: "Bốn mục tiêu thời đại thiêng liêng là: Hòa bình, Độc lập dân tộc, Dân chủ và Chủ nghĩa xã hội."
  },
  {
    id: 11,
    speakerTag: "5.2.2 • Lực Lượng Tiên Phong",
    question: "Lực lượng nào là nòng cốt tiên phong, là chỗ dựa tin cậy vững chắc của phong trào cách mạng thế giới trong tư tưởng Hồ Chí Minh?",
    options: [
      "Phong trào tôn giáo tiến bộ",
      "Phong trào cộng sản và công nhân quốc tế",
      "Các tổ chức phi chính phủ quốc tế",
      "Hiệp hội các doanh nghiệp đa quốc gia"
    ],
    correctIndex: 1,
    explanation: "Phong trào cộng sản và công nhân quốc tế là lực lượng nòng cốt tiên phong, đứng trên lập trường chủ nghĩa Mác - Lênin và chủ nghĩa quốc tế vô sản."
  },
  {
    id: 12,
    speakerTag: "5.2.2 • Nền Tảng 4 Tầng Mặt Trận",
    question: "Trong mô hình 4 Tầng Mặt trận đoàn kết quốc tế, tầng nào đóng vai trò là nền tảng gốc rễ nội sinh?",
    options: [
      "Mặt trận Đại đoàn kết dân tộc (sức mạnh nội sinh)",
      "Mặt trận nhân dân Á - Phi",
      "Mặt trận Việt - Miên - Lào",
      "Mặt trận nhân dân thế giới ủng hộ Việt Nam"
    ],
    correctIndex: 0,
    explanation: "Tầng 1 - Mặt trận Đại đoàn kết dân tộc là cội nguồn sức mạnh nội sinh, làm nền tảng vững chắc để mở rộng liên kết ra khu vực và quốc tế."
  },
  {
    id: 13,
    speakerTag: "5.2.2 • Liên Minh Đông Dương",
    question: "Đại hội liên minh nhân dân 3 nước Đông Dương (Việt - Miên - Lào) được thành lập vào thời gian nào?",
    options: [
      "Tháng 8 năm 1945 tại Hà Nội",
      "Tháng 5 năm 1954 tại Điện Biên Phủ",
      "Tháng 4 năm 1975 tại Sài Gòn",
      "Tháng 3 năm 1951 tại chiến khu Việt Bắc"
    ],
    correctIndex: 3,
    explanation: "Tháng 3/1951, Đại hội liên minh nhân dân 3 nước Đông Dương họp tại chiến khu Việt Bắc, hình thành khối liên minh chiến đấu cùng chung chiến hào chống kẻ thù chung."
  },
  {
    id: 14,
    speakerTag: "5.2.3 • Nguyên Tắc Có Lý, Có Tình",
    question: "Nguyên tắc 'Có lý' trong đoàn kết quốc tế theo Hồ Chí Minh đòi hỏi các bên phải tôn trọng điều gì?",
    options: [
      "Sự phân chia lợi ích kinh tế tuyệt đối đồng đều",
      "Độc lập, chủ quyền, toàn vẹn lãnh thổ và quyền tự quyết của mỗi dân tộc",
      "Quyền can thiệp nội bộ khi có bất đồng chính kiến",
      "Quy chế đặc quyền của các quốc gia phát triển"
    ],
    correctIndex: 1,
    explanation: "'Có lý' là tuân thủ luật pháp quốc tế, tôn trọng độc lập, chủ quyền, toàn vẹn lãnh thổ và quyền tự quyết thiêng liêng của mỗi dân tộc."
  },
  {
    id: 15,
    speakerTag: "5.2.3 • Triết Lý Cái Chiêng - Cái Tiếng",
    question: "Câu nói: 'Thực lực là cái chiêng, ngoại giao là cái tiếng' của Chủ tịch Hồ Chí Minh nhấn mạnh điều gì?",
    options: [
      "Hoạt động ngoại giao quan trọng hơn phát triển kinh tế",
      "Cần mở rộng quan hệ quốc tế trước khi xây dựng lực lượng",
      "Thực lực bên trong là nhân tố quyết định, ngoại giao dựa trên sức mạnh thực lực",
      "Chỉ cần tuyên truyền đối ngoại tốt là đủ để bảo vệ Tổ quốc"
    ],
    correctIndex: 2,
    explanation: "Thực lực nội tại là nền tảng cốt lõi (cái chiêng), hoạt động ngoại giao là sự phản ánh của thực lực (cái tiếng) - chiêng có to tiếng mới lớn."
  },
  {
    id: 16,
    speakerTag: "5.3.1 • Nghị Quyết 07/NQ-TW",
    question: "Nghị quyết số 07/NQ-TW của Bộ Chính trị về Đại đoàn kết dân tộc và tăng cường Mặt trận dân tộc thống nhất được ban hành vào thời gian nào?",
    options: [
      "Tháng 12 năm 1986",
      "Tháng 11 năm 1993",
      "Tháng 6 năm 1996",
      "Tháng 4 năm 2001"
    ],
    correctIndex: 1,
    explanation: "Tháng 11/1993, Bộ Chính trị khóa VII ban hành Nghị quyết 07/NQ-TW đánh dấu bước chuyển chiến lược quan trọng trong thời kỳ Đổi mới."
  },
  {
    id: 17,
    speakerTag: "5.3.1 • Bước Đột Phá Đối Ngoại",
    question: "Chủ trương: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới' được Đảng ta chính thức đưa ra tại Đại hội nào?",
    options: [
      "Đại hội đại biểu toàn quốc lần thứ VI",
      "Đại hội đại biểu toàn quốc lần thứ IX",
      "Đại hội đại biểu toàn quốc lần thứ VII",
      "Đại hội đại biểu toàn quốc lần thứ XI"
    ],
    correctIndex: 2,
    explanation: "Đại hội VII (1991) mở ra bước đột phá đối ngoại đổi mới: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển'."
  },
  {
    id: 18,
    speakerTag: "5.3.1 • Đại Hội VIII (1996)",
    question: "Đại hội Đảng lần thứ VIII (1996) đã đặt vấn đề đại đoàn kết toàn dân tộc ở tầm cao mới nhằm mục tiêu gì?",
    options: [
      "Tập trung lực lượng hoàn thành tái cấu trúc hệ thống ngân hàng",
      "Phục vụ cho sự nghiệp công nghiệp hóa, hiện đại hóa đất nước",
      "Khôi phục kinh tế sau thời kỳ bao cấp kéo dài",
      "Hoàn thành nhiệm vụ cải cách ruộng đất trên phạm vi cả nước"
    ],
    correctIndex: 1,
    explanation: "Đại hội VIII (1996) xác định đại đoàn kết toàn dân tộc là nguồn sức mạnh và động lực chủ yếu để đẩy mạnh sự nghiệp công nghiệp hóa, hiện đại hóa đất nước."
  },
  {
    id: 19,
    speakerTag: "5.3.2 • Gìn Giữ Hòa Bình LHQ",
    question: "Việt Nam chính thức tham gia lực lượng gìn giữ hòa bình của Liên Hợp Quốc từ năm nào?",
    options: [
      "Năm 2014",
      "Năm 2010",
      "Năm 2000",
      "Năm 2020"
    ],
    correctIndex: 0,
    explanation: "Năm 2014, Việt Nam chính thức cử lực lượng tham gia các phái bộ gìn giữ hòa bình Liên Hợp Quốc, khẳng định vai trò thành viên tích cực, có trách nhiệm với quốc tế."
  },
  {
    id: 20,
    speakerTag: "5.3.3 • Bài Học Quyết Định",
    question: "Bài học kinh nghiệm hàng đầu mang tính quyết định trong chiến lược đoàn kết quốc tế của Hồ Chí Minh là gì?",
    options: [
      "Nêu cao tinh thần độc lập tự chủ, tự lực tự cường, dựa vào sức mình là chính",
      "Sẵn sàng đánh đổi một phần chủ quyền để lấy viện trợ kinh tế",
      "Trông chờ vào sự can thiệp và giúp đỡ của các nước lớn",
      "Ưu tiên đàm phán ngoại giao hơn là xây dựng thực lực nội tại"
    ],
    correctIndex: 0,
    explanation: "Bài học kinh nghiệm hàng đầu là luôn nêu cao ngọn cờ độc lập tự chủ, tự lực cánh sinh, 'đem sức ta mà tự giải phóng cho ta', dựa vào sức mình là chính."
  }
];

const matchingQ = [
  {
    id: 101,
    type: "matching",
    speakerTag: "5.2.2 • Nối 4 Tầng Mặt Trận",
    question: "Nối 4 Tầng Mặt Trận Đoàn Kết Quốc Tế (Tư tưởng Hồ Chí Minh) với Bản chất & Lực lượng tương ứng:",
    leftTitle: "1. BỐN TẦNG MẶT TRẬN",
    rightTitle: "2. BẢN CHẤT & LỰC LƯỢNG",
    leftOptions: [
      { id: "L1", text: "Tầng 1: Mặt trận Đại đoàn kết dân tộc", letter: "A" },
      { id: "L2", text: "Tầng 2: Mặt trận Việt – Miên – Lào", letter: "B" },
      { id: "L3", text: "Tầng 3: Mặt trận Nhân dân Á – Phi", letter: "C" },
      { id: "L4", text: "Tầng 4: Mặt trận Nhân dân Thế giới", letter: "D" }
    ],
    rightOptions: [
      { id: "R1", text: "Quy tụ các lực lượng tiến bộ, hòa bình và công lý toàn cầu", num: 1 },
      { id: "R2", text: "Đoàn kết phong trào giải phóng dân tộc chống chủ nghĩa thực dân", num: 2 },
      { id: "R3", text: "Liên minh chiến đấu cùng chung chiến hào trên bán đảo Đông Dương", num: 3 },
      { id: "R4", text: "Nền tảng gốc rễ, tập hợp toàn thể nhân dân và kiều bào", num: 4 }
    ],
    validPairs: [
      { leftId: "L1", rightId: "R4" },
      { leftId: "L2", rightId: "R3" },
      { leftId: "L3", rightId: "R2" },
      { leftId: "L4", rightId: "R1" }
    ],
    explanation: "Hồ Chí Minh đã sáng lập mô hình 4 Tầng Mặt trận từ hẹp đến rộng: lấy Mặt trận dân tộc làm nòng cốt gốc rễ, mở rộng sang liên minh Đông Dương (Việt - Miên - Lào), phong trào Á - Phi và vươn tới toàn thể nhân loại tiến bộ trên thế giới."
  },
  {
    id: 102,
    type: "matching",
    speakerTag: "5.3.1 • Nối Mốc Son Đổi Mới",
    question: "Nối các Mốc son & Đại hội Đảng thời kỳ Đổi mới với Trọng tâm chiến lược tương ứng:",
    leftTitle: "1. MỐC SON & ĐẠI HỘI",
    rightTitle: "2. TRỌNG TÂM CHIẾN LƯỢC",
    leftOptions: [
      { id: "L1", text: "Năm 1993: Nghị quyết 07/NQ-TW", letter: "A" },
      { id: "L2", text: "Đại hội VIII (1996)", letter: "B" },
      { id: "L3", text: "Đại hội IX (2001)", letter: "C" },
      { id: "L4", text: "Đại hội XIII (2021)", letter: "D" }
    ],
    rightOptions: [
      { id: "R1", text: "Lấy mục tiêu giữ vững độc lập, thống nhất, vì dân giàu nước mạnh làm điểm tương đồng", num: 1 },
      { id: "R2", text: "Khơi dậy khát vọng phát triển đất nước phồn vinh, hạnh phúc và phát huy sức mạnh thời đại", num: 2 },
      { id: "R3", text: "Tăng cường khối đại đoàn kết toàn dân tộc và Mặt trận Dân tộc Thống nhất trong thời kỳ mới", num: 3 },
      { id: "R4", text: "Phát huy sức mạnh toàn dân phục vụ sự nghiệp Công nghiệp hóa - Hiện đại hóa đất nước", num: 4 }
    ],
    validPairs: [
      { leftId: "L1", rightId: "R3" },
      { leftId: "L2", rightId: "R4" },
      { leftId: "L3", rightId: "R1" },
      { leftId: "L4", rightId: "R2" }
    ],
    explanation: "Qua các thời kỳ Đổi mới từ Nghị quyết 07 (1993) đến Đại hội XIII (2021), tư duy của Đảng về Đại đoàn kết dân tộc và Đoàn kết quốc tế không ngừng được hoàn thiện và nâng tầm chiến lược phù hợp với bối cảnh đất nước."
  }
];

const securedMCQ = rawMCQ.map(q => ({
  id: q.id,
  speakerTag: q.speakerTag,
  question: q.question,
  options: q.options,
  targetHash: hashChoice(q.id, q.correctIndex),
  encodedExplanation: encodeExplanation(q.explanation)
}));

const securedMatching = matchingQ.map(q => ({
  id: q.id,
  type: q.type,
  speakerTag: q.speakerTag,
  question: q.question,
  leftTitle: q.leftTitle,
  rightTitle: q.rightTitle,
  leftOptions: q.leftOptions,
  rightOptions: q.rightOptions,
  validPairHashes: q.validPairs.map(p => hashPair(q.id, p.leftId, p.rightId)),
  encodedExplanation: encodeExplanation(q.explanation)
}));

const outputCode = `// Secure Encrypted Quiz Data for HCM202 - Chuong 5
// Answers are securely hashed; no plain-text correctIndex or plain answers exist in bundle.

export const quizData = {
  multipleChoiceQuestions: ${JSON.stringify(securedMCQ, null, 2)},
  matchingQuestions: ${JSON.stringify(securedMatching, null, 2)}
};

// Generate a random 10-question set for each participant: 8 MCQs + 2 Matching
export const generateQuizSet = () => {
  const mcq = [...quizData.multipleChoiceQuestions];
  for (let i = mcq.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mcq[i], mcq[j]] = [mcq[j], mcq[i]];
  }
  const selectedMCQ = mcq.slice(0, 8);
  const matchingQ = [...quizData.matchingQuestions];
  return [...selectedMCQ, ...matchingQ];
};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/quizData.js'), outputCode, 'utf-8');
console.log("Successfully generated secured quizData.js!");
