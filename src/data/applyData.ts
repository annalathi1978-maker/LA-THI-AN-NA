import { ApplyThoughtTask, ApplyActionTask, ApplyCreativeTask } from '../types';

export const APPLY_THOUGHT_TASKS: ApplyThoughtTask[] = [
  {
    id: "th-1",
    lessonId: 1,
    lessonTitle: "Bài 1: Truyền thống gia đình, dòng họ",
    question: "Hãy viết một đoạn văn ngắn (5 - 7 câu) giới thiệu một truyền thống tốt đẹp hoặc một nghề nghiệp đáng quý của gia đình/dòng họ em mà em cảm thấy tự hào nhất.",
    context: "Gợi ý: Tên truyền thống (hiếu học, làng nghề, đùm bọc...), những việc làm cụ thể của ông bà cha mẹ, và cảm xúc cùng lời hứa của em để tiếp nối truyền thống đó.",
    sampleAnswerHint: "Em có thể bắt đầu: 'Gia đình em luôn tự hào với truyền thống hiếu học từ thời ông bà...' hoặc 'Dòng họ em có truyền thống yêu thương, tương trợ lẫn nhau...'"
  },
  {
    id: "th-2",
    lessonId: 2,
    lessonTitle: "Bài 2: Yêu thương con người",
    question: "Kể lại một kỷ niệm khi em đã làm một việc tốt giúp đỡ bạn bè hoặc người gặp khó khăn. Khi đó em cảm thấy như thế nào?",
    context: "Gợi ý: Người được giúp là ai? Hoàn cảnh lúc đó ra sao? Hành động của em là gì? Cảm xúc ấm áp trong lòng em sau khi trao đi sự giúp đỡ.",
    sampleAnswerHint: "Kể về lần nhường ghế xe buýt, cho bạn mượn bút, phụ bà cụ qua đường..."
  },
  {
    id: "th-3",
    lessonId: 4,
    lessonTitle: "Bài 4: Tôn trọng sự thật",
    question: "Nếu một lần trót nói dối bố mẹ hoặc thầy cô giáo, em sẽ làm gì để dũng cảm đối diện với sự thật và lấy lại niềm tin từ mọi người?",
    context: "Gợi ý: Sự chân thành nhận lỗi, lời xin lỗi chân thật, hành động sửa sai và bài học rút ra cho bản thân.",
    sampleAnswerHint: "Nêu rõ sự hối hận, việc chủ động đến gặp thầy cô/bố mẹ xin lỗi và quyết tâm không tái phạm."
  },
  {
    id: "th-4",
    lessonId: 8,
    lessonTitle: "Bài 8: Tiết kiệm",
    question: "Em hãy đề xuất 3 giải pháp cụ thể giúp lớp học của em tiết kiệm điện, nước và bảo vệ tài sản chung của nhà trường.",
    context: "Gợi ý: Phân công tắt quạt/đèn khi ra chơi, khóa vòi nước rửa tay cẩn thận, không vẽ bậy lên bàn ghế, gom giấy vụn phân loại...",
    sampleAnswerHint: "1. Tắt 100% quạt và đèn khi xuống sân chào cờ/thể dục; 2. Cử tổ trưởng kiểm tra vòi nước; 3. Tổ chức phong trào 'Kế hoạch nhỏ'."
  }
];

export const APPLY_ACTION_TASKS: ApplyActionTask[] = [
  {
    id: "act-1",
    title: "Nhật ký Tự lập 7 ngày",
    category: "Rèn luyện phẩm chất",
    targetDays: 7,
    description: "Tự giác thực hiện các việc cá nhân mỗi ngày mà không cần bố mẹ nhắc nhở.",
    steps: [
      "Tự gấp chăn màn và dọn dẹp giường ngủ sau khi thức dậy",
      "Tự chuẩn bị sách vở, đồng phục đúng thời khóa biểu",
      "Tự giác hoàn thành bài tập về nhà trước 21h00",
      "Tự rửa bát đĩa của mình sau bữa ăn gia đình"
    ]
  },
  {
    id: "act-2",
    title: "Hành động xanh: Tiết kiệm năng lượng",
    category: "Lối sống văn minh",
    targetDays: 5,
    description: "Thực hành thói quen tiết kiệm điện nước tại gia đình và trường học.",
    steps: [
      "Tắt đèn, quạt mỗi khi bước ra khỏi phòng trên 15 phút",
      "Khóa chặt vòi nước khi đang xoa xà phòng rửa tay",
      "Tận dụng ánh sáng tự nhiên từ cửa sổ vào ban ngày",
      "Không để thiết bị điện tử ở chế độ chờ (Standby) qua đêm"
    ]
  },
  {
    id: "act-3",
    title: "Trao gửi yêu thương - Mỗi ngày một việc tốt",
    category: "Đạo đức & Lối sống",
    targetDays: 3,
    description: "Làm ít nhất 1 việc tốt giúp đỡ bạn bè, gia đình hoặc người xung quanh.",
    steps: [
      "Nói lời cảm ơn và giúp bố mẹ làm một việc nhà",
      "Hướng dẫn một bạn trong lớp bài tập bạn chưa hiểu",
      "Nhặt rác bỏ vào thùng rác đúng nơi quy định ở sân trường"
    ]
  }
];

export const APPLY_CREATIVE_TASKS: ApplyCreativeTask[] = [
  {
    id: "cr-1",
    title: "Thiết kế Thông điệp: 'Nói không với bạo lực học đường'",
    topic: "Bảo vệ nhân phẩm và tình bạn trong sáng",
    type: "poster",
    guidelines: [
      "Nêu rõ khẩu hiệu ngắn gọn, dễ nhớ (vd: 'Trường học hạnh phúc - Bạn bè yêu thương')",
      "Hình vẽ hoặc màu sắc tươi sáng, thể hiện sự đoàn kết",
      "Nêu số điện thoại bảo vệ trẻ em: 111"
    ],
    examples: [
      "Khẩu hiệu: 'Gieo hạt mầm yêu thương - Đẩy lùi bạo lực học đường'",
      "Khẩu hiệu: 'Lắng nghe bằng trái tim - Nắm tay cùng tiến bước'"
    ]
  },
  {
    id: "cr-2",
    title: "Infographic: '5 Quy tắc an toàn khi sử dụng Mạng xã hội'",
    topic: "Công dân số có trách nhiệm",
    type: "infographic",
    guidelines: [
      "Trình bày 5 mẹo ngắn: Bảo mật mật khẩu, Không chat với người lạ, Kiểm chứng tin đồn, Không bình luận xúc phạm người khác, Giới hạn thời gian dùng máy",
      "Có icon minh họa bắt mắt"
    ],
    examples: [
      "1. Mật khẩu mạnh & Bí mật",
      "2. Suy nghĩ trước khi Like & Share",
      "3. Lịch sự trong từng bình luận",
      "4. Bảo vệ thông tin cá nhân",
      "5. Báo người lớn khi bị đe dọa"
    ]
  },
  {
    id: "cr-3",
    title: "Khẩu hiệu tuyên truyền: 'Lối sống tiết kiệm - Tương lai xanh'",
    topic: "Tiết kiệm vì môi trường",
    type: "slogan",
    guidelines: [
      "Sáng tác 1 câu thơ lục bát hoặc câu khẩu hiệu ngắn gọn",
      "Truyền cảm hứng tiết kiệm điện, nước và giảm rác thải nhựa"
    ],
    examples: [
      "'Tắt một bóng đèn - Thêm một tương lai'",
      "'Nước là nguồn sống muôn loài / Dùng xong khóa chặt chẳng hoài phí đi'"
    ]
  }
];
