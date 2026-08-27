import { SituationItem } from '../types';

export const SITUATIONS_DATA: SituationItem[] = [
  {
    id: "sit-1",
    lessonId: 4,
    lessonTitle: "Bài 4: Tôn trọng sự thật & Văn hóa mạng",
    title: "Tình huống 1: Tin đồn chưa kiểm chứng trên Facebook",
    scenario: "Vào một buổi tối, Tuấn lướt mạng xã hội và thấy một bài viết giật gân từ một tài khoản nặc danh tố cáo: 'Trường THCS X gần nhà có học sinh ngộ độc nước ngọt bán ở cổng trường sắp đóng cửa'. Bài viết chưa hề có xác nhận của cơ quan chức năng hay báo chí. Một số bạn bè trong lớp Tuấn đang chia sẻ rầm rộ và rủ Tuấn cùng chia sẻ để 'cảnh báo mọi người'.",
    character: "Bạn Tuấn (Lớp 6A)",
    avatar: "🧑‍💻",
    options: [
      {
        id: "opt-1",
        text: "Bấm chia sẻ ngay lên trang cá nhân và tag tất cả các bạn trong lớp vào để tỏ ra mình là người nắm tin tức nhanh nhất.",
        isOptimal: false
      },
      {
        id: "opt-2",
        text: "Không chia sẻ; nhắn tin nhẹ nhàng khuyên các bạn trong nhóm lớp dừng chia sẻ tin chưa kiểm chứng và cùng tìm đọc thông tin chính thức từ báo chí địa phương hoặc nhà trường.",
        isOptimal: true
      },
      {
        id: "opt-3",
        text: "Viết thêm bình luận khẳng định mình cũng từng bị đau bụng khi uống nước ở đó dù chưa từng uống.",
        isOptimal: false
      },
      {
        id: "opt-4",
        text: "Kệ các bạn làm gì thì làm, không quan tâm cũng không lên tiếng.",
        isOptimal: false
      }
    ],
    optimalAnswer: "Phương án 2: Không chia sẻ và khuyên bạn bè kiểm chứng thông tin chính thống.",
    explanation: "Chia sẻ thông tin giả mạo hoặc chưa kiểm chứng gây tâm lý hoang mang cho phụ huynh, học sinh và làm tổn hại uy tín của nhà trường. Hành vi này có thể vi phạm Luật An ninh mạng. Biết dừng lại và cảnh báo bạn bè thể hiện tư duy phản biện và văn hóa số mẫu mực.",
    lessonLearned: "Trước bất kỳ thông tin giật gân nào trên không gian mạng, hãy luôn 'Chậm lại 3 giây - Kiểm chứng nguồn tin - Tuyệt đối không tiếp tay cho tin giả'."
  },
  {
    id: "sit-2",
    lessonId: 2,
    lessonTitle: "Bài 2: Yêu thương con người & Phòng chống bắt nạt",
    title: "Tình huống 2: Người bạn mới bị cô lập",
    scenario: "Lớp 6B đón nhận một bạn học sinh mới chuyển từ vùng nông thôn lên tên là Dũng. Do Dũng có giọng nói địa phương hơi đặc biệt và mang dép tổ ong cũ, một nhóm bạn trong lớp hay xì xào, nhại lại giọng của Dũng và không cho Dũng ngồi cùng bàn ăn trưa.",
    character: "Bạn Hà (Học sinh lớp 6B)",
    avatar: "👧",
    options: [
      {
        id: "opt-1",
        text: "Chủ động đến ngồi ăn cùng Dũng, vui vẻ trò chuyện, giới thiệu cho Dũng các phòng chức năng của trường và đề nghị các bạn trong nhóm dừng trêu chọc.",
        isOptimal: true
      },
      {
        id: "opt-2",
        text: "Cũng cười hùa theo nhóm bạn để không bị các bạn tẩy chay mình.",
        isOptimal: false
      },
      {
        id: "opt-3",
        text: "Thương Dũng nhưng im lặng vì sợ nhóm bạn kia sẽ quay sang bắt nạt mình.",
        isOptimal: false
      },
      {
        id: "opt-4",
        text: "Khuyên Dũng không nên đi học nữa để khỏi bị trêu chọc.",
        isOptimal: false
      }
    ],
    optimalAnswer: "Phương án 1: Chủ động kết bạn, đồng cảm và lên tiếng bảo vệ bạn mới.",
    explanation: "Sự phân biệt đối xử và trêu chọc giọng nói, hoàn cảnh của người khác là hành vi thiếu văn minh và gây tổn thương tâm lý sâu sắc. Hành động dang tay đón nhận bạn mới của Hà thể hiện tình yêu thương con người và sự dũng cảm chống lại nạn bạo lực tinh thần.",
    lessonLearned: "Mỗi người sinh ra đều có nét đặc trưng và hoàn cảnh riêng. Tôn trọng sự khác biệt và sẻ chia yêu thương chính là thước đo phẩm giá của một học sinh văn minh."
  },
  {
    id: "sit-3",
    lessonId: 7,
    lessonTitle: "Bài 7: Kỹ năng ứng phó khi người lạ bám theo",
    title: "Tình huống 3: Bị người lạ đi xe máy bám theo",
    scenario: "Tan học lúc 17h30 trời nhá nhem tối, Lan đi bộ một mình qua đoạn đường vắng thì phát hiện một người đàn ông lạ mặt đội mũ kín mít đi xe máy chạy chậm rì rì sau lưng, liên tục gọi Lan lại bảo: 'Lên xe chú chở về giúp, mẹ cháu nhờ chú đón đấy'. Lan chưa từng gặp người này bao giờ.",
    character: "Bạn Lan (Học sinh lớp 6C)",
    avatar: "🏃‍♀️",
    options: [
      {
        id: "opt-1",
        text: "Nhanh chóng bước chân vào một cửa hàng tạp hóa hoặc quán ăn đông người gần nhất, sau đó nhờ người lớn hoặc gọi điện cho bố mẹ đến đón.",
        isOptimal: true
      },
      {
        id: "opt-2",
        text: "Tin lời người lạ và vui vẻ leo lên xe máy cho người đó chở về.",
        isOptimal: false
      },
      {
        id: "opt-3",
        text: "Đứng lại tranh cãi tay đôi với người lạ giữa đường vắng.",
        isOptimal: false
      },
      {
        id: "opt-4",
        text: "Chạy thẳng vào ngõ tối vắng người để trốn.",
        isOptimal: false
      }
    ],
    optimalAnswer: "Phương án 1: Di chuyển ngay đến nơi đông người và liên hệ với người thân.",
    explanation: "Khi nghi ngờ có kẻ xấu bám theo, nguyên tắc an toàn hàng đầu là: Không bao giờ đi vào chỗ vắng, không nghe lời dụ dỗ của người lạ, di chuyển ngay vào nơi sáng sủa có nhiều người lớn và nhờ sự trợ giúp.",
    lessonLearned: "Luôn cảnh giác với người lạ, tuyệt đối không lên xe người không quen biết và ghi nhớ số điện thoại khẩn cấp của cha mẹ."
  },
  {
    id: "sit-4",
    lessonId: 3,
    lessonTitle: "Bài 3: Siêng năng, kiên trì & Tự giác",
    title: "Tình huống 4: Cám dỗ trước kỳ kiểm tra học kỳ",
    scenario: "Ngày mai có bài kiểm tra học kỳ môn GDCD và môn Toán. Buổi tối khi Kiên đang ngồi vào bàn học thì các bạn trong xóm rủ Kiên vào lập team 'leo rank' trong game trực tuyến đang có sự kiện tặng quà đặc biệt chỉ diễn ra trong tối nay.",
    character: "Bạn Kiên (Lớp 6D)",
    avatar: "🎮",
    options: [
      {
        id: "opt-1",
        text: "Lịch sự từ chối lời mời của các bạn, tắt thông báo điện thoại, tập trung cao độ ôn tập theo đề cương để chuẩn bị tốt cho bài thi ngày mai.",
        isOptimal: true
      },
      {
        id: "opt-2",
        text: "Chơi game đến 1 giờ sáng rồi sáng mai dậy sớm chép bài bạn.",
        isOptimal: false
      },
      {
        id: "opt-3",
        text: "Vừa mở sách vừa bật game chơi lén lút.",
        isOptimal: false
      },
      {
        id: "opt-4",
        text: "Bỏ thi luôn để cày sự kiện game cho bằng bạn bè.",
        isOptimal: false
      }
    ],
    optimalAnswer: "Phương án 1: Tự giác từ chối cám dỗ, tập trung hoàn thành nhiệm vụ học tập.",
    explanation: "Siêng năng và kiên trì đòi hỏi con người phải có tính kỷ luật tự giác, biết đặt thứ tự ưu tiên cho việc học và tương lai thay vì sa đà vào những trò giải trí nhất thời.",
    lessonLearned: "'Học ra học, chơi ra chơi'. Vượt qua được sự lười biếng và cám dỗ nhất thời sẽ giúp em gặt hái thành quả xứng đáng."
  },
  {
    id: "sit-5",
    lessonId: 8,
    lessonTitle: "Bài 8: Tiết kiệm & Tránh lãng phí",
    title: "Tình huống 5: Bữa tiệc sinh nhật phung phí",
    scenario: "Bình muốn tổ chức sinh nhật thật hoành tráng để khoe với các bạn trong lớp. Bình đòi bố mẹ phải đặt nhà hàng sang trọng, mua thật nhiều đồ ăn đắt tiền dù gia đình bố mẹ chỉ là công nhân thu nhập trung bình.",
    character: "Bạn Bình (Lớp 6E)",
    avatar: "🎂",
    options: [
      {
        id: "opt-1",
        text: "Hiểu được sự vất vả của cha mẹ, chủ động đề xuất tổ chức một buổi liên hoan ấm cúng, giản dị tại nhà với bánh kẹo và hoa quả tự làm, mời bạn bè thân thiết.",
        isOptimal: true
      },
      {
        id: "opt-2",
        text: "Khóc lóc, dọa bỏ ăn nếu bố mẹ không chịu thuê nhà hàng sang trọng.",
        isOptimal: false
      },
      {
        id: "opt-3",
        text: "Đi vay tiền bạn bè để tự tổ chức tiệc hoành tráng.",
        isOptimal: false
      },
      {
        id: "opt-4",
        text: "Bắt bạn bè đến dự phải mang theo quà đắt tiền thì mới cho vào.",
        isOptimal: false
      }
    ],
    optimalAnswer: "Phương án 1: Tổ chức sinh nhật giản dị, ấm áp phù hợp với điều kiện gia đình.",
    explanation: "Ý nghĩa thực sự của ngày sinh nhật là sự sum họp, niềm vui gắn kết bạn bè và lòng biết ơn công sinh thành của cha mẹ, chứ không phải sự xa hoa phô trương lãng phí vượt quá khả năng gia đình.",
    lessonLearned: "Sống giản dị, biết thương cha mẹ và trân trọng đồng tiền mồ hôi nước mắt là phẩm chất của người con hiếu thảo và công dân có trách nhiệm."
  }
];
