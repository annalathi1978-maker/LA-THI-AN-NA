import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- Dạng 1: Trắc nghiệm ABCD ---
  {
    id: "p-choice-1",
    lessonId: 1,
    lessonTitle: "Bài 1: Truyền thống gia đình, dòng họ",
    type: "choice",
    question: "Câu nói 'Con nhà tông không giống lông cũng giống cánh' phản ánh điều gì?",
    options: [
      "A. Sự di truyền và tiếp nối những nét đặc trưng tốt đẹp của dòng họ",
      "B. Con cái phải làm y hệt nghề của cha mẹ",
      "C. Không thể thay đổi được số phận",
      "D. Cha mẹ giàu thì con cái không cần học"
    ],
    correctAnswer: 0,
    explanation: "Câu tục ngữ đúc kết kinh nghiệm dân gian về sự kế thừa nếp nhà, cốt cách và truyền thống tốt đẹp từ thế hệ trước.",
    practicalTip: "Hãy tự hào và học hỏi những đức tính tốt của ông bà cha mẹ mình nhé!"
  },
  {
    id: "p-choice-2",
    lessonId: 2,
    lessonTitle: "Bài 2: Yêu thương con người",
    type: "choice",
    question: "Hành động nào sau đây là biểu hiện KHÔNG đúng của tình yêu thương con người?",
    options: [
      "A. Động viên bạn bè khi bạn gặp chuyện buồn",
      "B. Bao che cho bạn quay cóp trong giờ kiểm tra vì 'thương bạn'",
      "C. Quyên góp quần áo ấm cho trẻ em vùng cao",
      "D. Giúp đỡ cụ già qua đường an toàn"
    ],
    correctAnswer: 1,
    explanation: "Bao che cho bạn làm việc sai trái là 'thương hại mù quáng' hoặc đồng lõa với cái xấu, làm hại bạn chứ không phải yêu thương chân chính.",
    practicalTip: "Yêu thương thật sự là phải giúp bạn nhận ra lỗi sai và cùng tiến bộ."
  },
  {
    id: "p-choice-3",
    lessonId: 3,
    lessonTitle: "Bài 3: Siêng năng, kiên trì",
    type: "choice",
    question: "Thành ngữ nào sau đây thể hiện sự thiếu kiên trì, làm việc nửa vời?",
    options: [
      "A. Có công mài sắt có ngày nên kim",
      "B. Đẽo cày giữa đường",
      "C. Nước chảy đá mòn",
      "D. Chân cứng đá mềm"
    ],
    correctAnswer: 1,
    explanation: "'Đẽo cày giữa đường' chỉ người không có lập trường, thiếu kiên trì, ai bảo sao nghe vậy dẫn đến thất bại.",
    practicalTip: "Khi đặt mục tiêu, hãy kiên trì từng bước và tin tưởng vào kế hoạch của mình."
  },
  {
    id: "p-choice-4",
    lessonId: 4,
    lessonTitle: "Bài 4: Tôn trọng sự thật",
    type: "choice",
    question: "Hành vi tung tin sai sự thật trên mạng xã hội sẽ bị xử lý như thế nào?",
    options: [
      "A. Không sao cả vì mạng là ảo",
      "B. Chỉ bị bạn bè nhắc nhở nhẹ nhàng",
      "C. Bị xử phạt vi phạm hành chính hoặc thậm chí truy cứu trách nhiệm hình sự theo pháp luật",
      "D. Được thưởng vì giúp mạng sôi động"
    ],
    correctAnswer: 2,
    explanation: "Theo Luật An ninh mạng, việc bịa đặt, lan truyền thông tin sai sự thật xúc phạm nhân phẩm hoặc gây hoang mang dư luận đều bị pháp luật xử lý nghiêm khắc.",
    practicalTip: "Nguyên tắc 3 bước trước khi bấm Share: Kiểm chứng nguồn - Xem có gây hại ai không - Có mang lại điều tốt không."
  },
  {
    id: "p-choice-5",
    lessonId: 8,
    lessonTitle: "Bài 8: Tiết kiệm",
    type: "choice",
    question: "Trong quy tắc quản lý tài chính cá nhân đơn giản cho học sinh, khoản tiền nào nên được ưu tiên tiết kiệm?",
    options: [
      "A. Tiêu hết vào đồ ăn vặt và đồ chơi rồi còn bao nhiêu mới cất đi",
      "B. Dành ra một phần cố định (như 10-20% tiền tiêu vặt hoặc tiền lì xì) ngay khi nhận được để tích lũy",
      "C. Đưa hết cho bạn mượn",
      "D. Mua đồ thật đắt để khoe trên mạng"
    ],
    correctAnswer: 1,
    explanation: "Nguyên tắc 'Tiết kiệm trước - Chi tiêu sau' giúp hình thành thói quen tích lũy tài chính thông minh suốt đời.",
    practicalTip: "Một chú heo đất nhỏ chính là khởi đầu cho những ước mơ lớn!"
  },
  {
    id: "p-choice-6",
    lessonId: 9,
    lessonTitle: "Bài 9: Công dân Việt Nam",
    type: "choice",
    question: "Lễ hội nào sau đây thể hiện truyền thống đạo lý 'Uống nước nhớ nguồn' của mọi công dân Việt Nam?",
    options: [
      "A. Giỗ Tổ Hùng Vương (10 tháng 3 âm lịch)",
      "B. Lễ hội Halloween",
      "C. Ngày Cá tháng Tư",
      "D. Ngày Black Friday"
    ],
    correctAnswer: 0,
    explanation: "Giỗ Tổ Hùng Vương là ngày lễ trọng đại tôn vinh các Vua Hùng đã có công dựng nước, nhắc nhở bổn phận giữ nước của mọi thế hệ công dân Việt Nam.",
    practicalTip: "'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba'."
  },

  // --- Dạng 2: Đúng – Sai (Nhận định) ---
  {
    id: "p-tf-1",
    lessonId: 1,
    lessonTitle: "Bài 1: Truyền thống gia đình, dòng họ",
    type: "true_false",
    question: "Nhận định: 'Chỉ những gia đình làm quan to hoặc nghệ nhân nổi tiếng mới có truyền thống tốt đẹp đáng tự hào.'",
    correctAnswer: false,
    explanation: "Sai. Mọi gia đình dù làm bất kỳ nghề chân chính nào (nông nghiệp, thợ may, buôn bán nhỏ...) nếu luôn giữ nếp sống lương thiện, hòa thuận, hiếu thảo thì đều có những giá trị truyền thống vô cùng cao quý.",
    practicalTip: "Nghề chân chính nào cũng vinh quang và đáng tự hào."
  },
  {
    id: "p-tf-2",
    lessonId: 2,
    lessonTitle: "Bài 2: Yêu thương con người",
    type: "true_false",
    question: "Nhận định: 'Yêu thương con người là phải luôn vui vẻ nhường nhịn kể cả khi bị người khác lừa dối, bắt nạt liên tục.'",
    correctAnswer: false,
    explanation: "Sai. Yêu thương con người không đồng nghĩa với cam chịu, yếu đuối hay dung túng cho kẻ xấu bắt nạt. Cần biết tự bảo vệ mình và lên tiếng tố cáo hành vi sai trái.",
    practicalTip: "Yêu thương cần đi liền với trí tuệ và sự dũng cảm bảo vệ lẽ phải."
  },
  {
    id: "p-tf-3",
    lessonId: 3,
    lessonTitle: "Bài 3: Siêng năng, kiên trì",
    type: "true_false",
    question: "Nhận định: 'Thiên tài chỉ là 1% cảm hứng, 99% còn lại là mồ hôi và sự nỗ lực khổ luyện hàng ngày.'",
    correctAnswer: true,
    explanation: "Đúng. Đây là câu nói nổi tiếng của nhà bác học Thomas Edison khẳng định sự siêng năng, kiên trì chính là yếu tố quyết định thành tài.",
    practicalTip: "Đừng vội nản lòng nếu bạn chưa phải là người thông minh nhất; người chăm chỉ nhất mới là người về đích!"
  },
  {
    id: "p-tf-4",
    lessonId: 5,
    lessonTitle: "Bài 5: Tự lập",
    type: "true_false",
    question: "Nhận định: 'Người có tính tự lập thì tuyệt đối không được nhờ cậy hay lắng nghe sự hướng dẫn của thầy cô, cha mẹ.'",
    correctAnswer: false,
    explanation: "Sai. Tự lập là tự mình nỗ lực làm việc, nhưng luôn biết lắng nghe, học hỏi kinh nghiệm và sẵn sàng phối hợp làm việc nhóm khi cần.",
    practicalTip: "Biết tìm kiếm sự hỗ trợ đúng lúc cũng là một kỹ năng của người thông minh."
  },
  {
    id: "p-tf-5",
    lessonId: 7,
    lessonTitle: "Bài 7: Ứng phó nguy hiểm",
    type: "true_false",
    question: "Nhận định: 'Khi xảy ra cháy ở chung cư, thang máy là phương tiện chạy nhanh nhất nên cần ưu tiên chạy vào thang máy để xuống đất.'",
    correctAnswer: false,
    explanation: "Sai hoàn toàn! Khi hỏa hoạn, điện thang máy có thể bị ngắt đột ngột hoặc hố thang máy hút khói độc gây kẹt và ngạt thở chết người. Bắt buộc phải đi cầu thang bộ thoát hiểm có đèn exit.",
    practicalTip: "Ghi nhớ tuyệt đối: Không dùng thang máy khi có báo cháy!"
  },
  {
    id: "p-tf-6",
    lessonId: 8,
    lessonTitle: "Bài 8: Tiết kiệm",
    type: "true_false",
    question: "Nhận định: 'Tiết kiệm điện nước không chỉ giúp giảm tiền cho gia đình mà còn góp phần bảo vệ tài nguyên quốc gia và chống biến đổi khí hậu.'",
    correctAnswer: true,
    explanation: "Đúng. Năng lượng và nước ngọt là tài nguyên quý giá. Mỗi kWh điện tiết kiệm được giúp giảm phát thải khí nhà kính từ các nhà máy điện.",
    practicalTip: "Hãy tạo thói quen kiểm tra đèn quạt trước khi bước ra khỏi phòng học."
  },

  // --- Dạng 3: Tình huống ứng xử ---
  {
    id: "p-sit-1",
    lessonId: 4,
    lessonTitle: "Bài 4: Tôn trọng sự thật",
    type: "situation",
    question: "Tình huống: Trong giờ kiểm tra 15 phút môn Toán, bạn thân ngồi cạnh em thì thầm xin xem trắc nghiệm vì hôm qua bạn bị ốm chưa kịp ôn bài. Em nên chọn cách ứng xử nào?",
    options: [
      "A. Mở rộng vở cho bạn chép hết để giữ tình bạn thân thiết",
      "B. Viết đáp án ra mẩu giấy nháp rồi chuyền sang cho bạn",
      "C. Nhẹ nhàng từ chối trong giờ thi và hứa sau giờ học sẽ giảng lại bài chi tiết cho bạn hiểu",
      "D. Đứng dậy hét to giữa lớp tố cáo bạn đang gian lận"
    ],
    correctAnswer: 2,
    explanation: "Phương án C vừa tôn trọng sự thật và kỷ luật thi cử, vừa thể hiện tình cảm chân thành và giúp bạn khắc phục lỗ hổng kiến thức thực sự.",
    practicalTip: "Giúp bạn hiểu bài sau giờ học quý gấp vạn lần cho bạn chép bài trong giờ thi!"
  },
  {
    id: "p-sit-2",
    lessonId: 6,
    lessonTitle: "Bài 6: Tự nhận thức bản thân",
    type: "situation",
    question: "Tình huống: Lớp em tổ chức đăng ký các tiết mục văn nghệ chào mừng ngày 20/11. Em rất thích hát nhưng giọng còn run và chưa tự tin. Em sẽ làm gì?",
    options: [
      "A. Trốn ở nhà không đi học buổi sinh hoạt lớp nữa",
      "B. Đăng ký tham gia tiết mục tốp ca cùng các bạn trong lớp và chăm chỉ tập luyện để vừa được thử sức, vừa rèn luyện sự tự tin",
      "C. Chê bai tiết mục của các bạn khác để che giấu sự tự ti của mình",
      "D. Đòi cô giáo cho mình hát đơn ca một mình ngay"
    ],
    correctAnswer: 1,
    explanation: "Tham gia hát tốp ca là cách tuyệt vời để bạn vừa được thỏa mãn đam mê nghệ thuật, vừa được bạn bè hỗ trợ rèn luyện sự tự tin dần dần.",
    practicalTip: "Từng bước nhỏ tích lũy sẽ tạo nên sự tự tin vững chắc."
  },
  {
    id: "p-sit-3",
    lessonId: 10,
    lessonTitle: "Bài 10: Quyền & Nghĩa vụ công dân",
    type: "situation",
    question: "Tình huống: Trên đường đi học về, em nhặt được một chiếc ví rơi bên vệ đường, bên trong có 1 triệu đồng và giấy tờ tùy thân của một người lạ. Em sẽ xử lý thế nào?",
    options: [
      "A. Lấy hết tiền tiêu xài rồi vứt ví và giấy tờ xuống cống",
      "B. Mang ví đến nộp cho Công an phường gần nhất hoặc nhờ thầy cô Ban Giám hiệu liên hệ trao trả lại cho người đánh rơi",
      "C. Chia cho các bạn trong nhóm đi cùng để giữ bí mật",
      "D. Đăng ảnh giấy tờ cá nhân của họ lên trang mạng công cộng kèm lời trêu chọc"
    ],
    correctAnswer: 1,
    explanation: "Giao nộp cho cơ quan công an hoặc nhà trường là nghĩa vụ đạo đức và pháp lý của công dân tốt ('Nhặt được của rơi, trả người đánh mất').",
    practicalTip: "Người làm mất ví đang rất lo lắng, hành động của em sẽ mang lại niềm vui lớn lao cho họ!"
  }
];
