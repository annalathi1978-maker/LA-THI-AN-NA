import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 1,
    title: "Bài 1: Tự hào về truyền thống gia đình, dòng họ",
    order: 1,
    shortDesc: "Kế thừa và phát huy những giá trị tốt đẹp của tổ tiên, ông bà, cha mẹ.",
    icon: "🏠",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    bgColor: "from-amber-500/10 to-orange-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Gia đình truyền thống ngành Y – Cố GS Tôn Thất Tùng & BS Tôn Thất Bách",
        content: "Cố Giáo sư Tôn Thất Tùng (1912 - 1982) là danh y lỗi lạc, để lại 123 công trình y văn thế giới và phương pháp mổ gan chấn động địa cầu. Ba người con của ông đều tiếp nối sự nghiệp ngành Y, tiêu biểu là PGS. Viện sĩ Tôn Thất Bách - chuyên gia đầu ngành tim mạch. Cùng với đó là tấm gương chị Huỳnh Thị Tuyết Nga (Bình Định) khởi nghiệp làm giàu từ nghề làm cốm truyền thống của cha ông.",
        lessonTakeaway: "Truyền thống gia đình mang lại cho con cháu kinh nghiệm, niềm tin và ý chí vươn lên thành công.",
        characterOrEvent: "Cố GS Tôn Thất Tùng & Làng cốm truyền thống Phù Cát"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Các tấm gương bạn Nam, bạn Hà và bạn Khuê",
        content: "Bạn Nam sinh ra trong gia đình có truyền thống hiếu học, bố mẹ luôn chăm lo việc học và nói tiếng Anh lưu loát. Bạn Hà sinh ra trong gia đình luôn chan hòa, gắn bó, thường xuyên giúp đỡ bà con lối xóm. Bạn Khuê nhiều đời làm nghề mộc mỹ nghệ đồ gỗ, từ nhỏ Khuê đã say mê xưởng mộc và ấp ủ thi vào ngành điêu khắc để phát triển nghề gia đình.",
        lessonTakeaway: "Mỗi gia đình đều có nét đẹp riêng về đạo đức, lối sống, văn hóa hay nghề nghiệp đáng được trân trọng.",
        characterOrEvent: "Nam (Hiếu học), Hà (Đoàn kết xóm giềng), Khuê (Nghề mộc đồ gỗ)"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Dòng họ Đặng ở Sơn La & Tinh hoa đàn bầu gia đình bạn An",
        content: "Dòng họ Đặng ở Sơn La có truyền thống hiếu học qua nhiều thế hệ, con cháu đều được học hành đỗ đạt cao. Bạn Dung học xa nhà luôn nhớ lời dạy cần cù của ông ngoại để vượt khó. Bạn An lớn lên bên tiếng đàn bầu của bà và mẹ (nghệ sĩ đàn bầu nổi tiếng), An chăm chỉ khổ luyện để quảng bá nét đẹp nhạc cụ dân tộc Việt Nam ra thế giới.",
        lessonTakeaway: "Giữ gìn truyền thống bằng việc làm cụ thể, phù hợp với lứa tuổi như học tập tốt, rèn luyện đạo đức.",
        characterOrEvent: "Dòng họ Đặng Sơn La & Bạn An gắn bó với tiếng đàn bầu"
      }
    ],
    intro: {
      title: "Khởi động: Cảm xúc với giai điệu gia đình",
      scenario: "Giai điệu bài hát 'Ba ngọn nến lung linh' (Ngọc Lễ) và 'Lá cờ' (Tạ Quang Thắng) nhắc nhở chúng ta về cội nguồn thiêng liêng: 'Ba là cây nến vàng, mẹ là cây nến xanh, con là cây nến hồng, ba ngọn nến lung linh thắp sáng một gia đình'.",
      question: "Gia đình, dòng họ của em có những truyền thống tốt đẹp nào khiến em cảm thấy tự hào nhất?",
      suggestedThought: "Mỗi gia đình Việt Nam đều có những giá trị đạo đức, học vấn hoặc nghề nghiệp đáng trân quý."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Khái niệm truyền thống gia đình, dòng họ",
          content: "Là những giá trị tốt đẹp (văn hóa, đạo đức, nghề nghiệp, học tập, cần cù lao động, yêu nước...) được hình thành qua thời gian dài trong lối sống, nếp nghĩ và được lưu truyền từ thế hệ này sang thế hệ khác.",
          example: "Truyền thống hiếu học (dòng họ Đặng Sơn La), nghề Y cao quý (gia đình GS Tôn Thất Tùng), nghề mộc mỹ nghệ, nếp sống đoàn kết thương người...",
          icon: "📜"
        },
        {
          heading: "2. Ý nghĩa của truyền thống gia đình, dòng họ",
          content: "Tạo động lực tinh thần to lớn, tiếp thêm kinh nghiệm, sức mạnh và sự tự tin giúp con người vượt qua khó khăn, nỗ lực vươn lên thành công và góp phần làm phong phú bản sắc văn hóa dân tộc.",
          example: "Bạn Dung xa nhà nhớ lời ông ngoại cần cù để vượt khó học giỏi; chị Nga phát triển nghề cốm quê hương.",
          icon: "🌟"
        },
        {
          heading: "3. Trách nhiệm và hành động của học sinh",
          content: "Tự hào, trân trọng, nối tiếp và phát huy bằng hành động thiết thực, phù hợp lứa tuổi; chăm chỉ học tập, rèn đức luyện tài; không làm điều gì tổn hại đến thanh danh gia đình, dòng họ.",
          example: "Kính trọng ông bà cha mẹ, giữ gìn nghề thủ công truyền thống, tránh thói ỷ lại lười biếng.",
          icon: "🌱"
        }
      ]
    },
    summary: [
      "Truyền thống gia đình, dòng họ là những giá trị tốt đẹp được lưu truyền và phát huy qua nhiều thế hệ.",
      "Tự hào về truyền thống giúp chúng ta có thêm động lực, kinh nghiệm và sức mạnh để vươn lên.",
      "Học sinh cần giữ gìn truyền thống bằng việc làm cụ thể: học giỏi, lễ phép, chăm chỉ, không làm hoen ố thanh danh dòng họ.",
      "Phê phán thái độ tự ti, giấu giếm nguồn gốc hoặc ỷ lại, kiêu ngạo dựa dẫm vào gia đình."
    ],
    mindmap: {
      centerTitle: "Tự hào truyền thống gia đình, dòng họ",
      nodes: [
        {
          id: "m1-1",
          label: "Khái niệm & Các loại truyền thống",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c1-1", label: "Đạo đức: Hiếu thảo, nhân ái, yêu nước" },
            { id: "c1-2", label: "Học tập: Hiếu học, khổ luyện thành tài" },
            { id: "c1-3", label: "Nghề nghiệp: Nghề Y, thủ công mộc, dệt chiếu, làm cốm..." }
          ]
        },
        {
          id: "m1-2",
          label: "Ý nghĩa to lớn",
          color: "border-emerald-400 bg-emerald-50 text-emerald-900",
          children: [
            { id: "c1-4", label: "Tiếp thêm sức mạnh và niềm tin" },
            { id: "c1-5", label: "Hành trang vững chắc vào đời" },
            { id: "c1-6", label: "Góp phần làm giàu bản sắc dân tộc" }
          ]
        },
        {
          id: "m1-3",
          label: "Hành động của học sinh",
          color: "border-purple-400 bg-purple-50 text-purple-900",
          children: [
            { id: "c1-7", label: "Tìm hiểu cội nguồn gia phả" },
            { id: "c1-8", label: "Chăm ngoan, học giỏi, rèn luyện nhân cách" },
            { id: "c1-9", label: "Tránh tự ti mặc cảm hoặc kiêu ngạo ỷ lại" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q1-1",
        question: "Hành vi nào sau đây thể hiện đúng sự tự hào về truyền thống gia đình, dòng họ?",
        options: [
          "A. Giấu giếm nghề làm nông của cha mẹ vì sợ bạn bè cười chê",
          "B. Cố gắng chăm ngoan, học giỏi để phát huy truyền thống hiếu học",
          "C. Dựa dẫm vào sự giàu có của bố mẹ mà lười biếng học tập",
          "D. Không bao giờ tham gia ngày giỗ tổ tiên của dòng họ"
        ],
        correctAnswer: 1,
        explanation: "Chăm ngoan, học giỏi là hành động thiết thực nhất của học sinh lớp 6 để tiếp nối truyền thống hiếu học.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q1-2",
        question: "Trong bộ sách Cánh Diều, tấm gương gia đình cố Giáo sư Tôn Thất Tùng đại diện cho truyền thống gì?",
        options: [
          "A. Truyền thống kinh doanh buôn bán lụa tơ tằm",
          "B. Truyền thống y đức cao quý và cống hiến cho ngành Y học",
          "C. Truyền thống điêu khắc gỗ nghệ thuật",
          "D. Truyền thống thể thao điền kinh"
        ],
        correctAnswer: 1,
        explanation: "Gia đình cố GS Tôn Thất Tùng và PGS.TS Tôn Thất Bách là gia đình y đức nổi tiếng cống hiến to lớn cho y học Việt Nam và thế giới.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q1-3",
        question: "Khi gia đình có một nghề thủ công truyền thống (làm cốm, dệt chiếu, làm gốm), học sinh nên có thái độ nào?",
        options: [
          "A. Học hỏi các kỹ thuật cơ bản và tự hào giới thiệu nét đẹp làng nghề",
          "B. Chê bai nghề lỗi thời, xa lánh xưởng làm việc của gia đình",
          "C. Khuyên bố mẹ bỏ nghề ngay lập tức vì vất vả",
          "D. Xấu hổ khi có ai hỏi về công việc của ông bà, cha mẹ"
        ],
        correctAnswer: 0,
        explanation: "Biết trân trọng, học hỏi và giới thiệu nét đẹp làng nghề truyền thống là thể hiện tình yêu gia đình và văn hóa quê hương.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q1-4",
        question: "Dòng họ Đặng ở Sơn La trong bộ sách Kết Nối Tri Thức nổi tiếng với truyền thống gì?",
        options: [
          "A. Đánh bắt thủy hải sản",
          "B. Hiếu học, nhiều thế hệ con cháu đỗ đạt và thành cán bộ cống hiến cho đất nước",
          "C. Nghề làm pháo hoa cổ truyền",
          "D. Chăn nuôi đại gia súc"
        ],
        correctAnswer: 1,
        explanation: "Dòng họ Đặng ở Sơn La có truyền thống hiếu học vẻ vang, con cháu luôn nỗ lực học tập thành tài.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q1-5",
        question: "Nhận định nào sau đây là SAI khi nói về truyền thống gia đình, dòng họ?",
        options: [
          "A. Mọi gia đình, dòng họ đều có những nét đẹp truyền thống đáng tự hào",
          "B. Giữ gìn truyền thống giúp chúng ta có thêm động lực vượt qua khó khăn",
          "C. Chỉ những gia đình làm quan to, giàu có mới có truyền thống đáng tự hào",
          "D. Học sinh cần rèn luyện phẩm chất tốt đẹp để tiếp nối truyền thống cha ông"
        ],
        correctAnswer: 2,
        explanation: "Mọi gia đình, dòng họ (kể cả gia đình làm nông, làm nghề bình dị) đều có những giá trị đạo đức, lao động và văn hóa tốt đẹp cần phát huy.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2: Yêu thương con người",
    order: 2,
    shortDesc: "Quan tâm, giúp đỡ, đồng cảm và sẻ chia với mọi người xung quanh.",
    icon: "💖",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    bgColor: "from-rose-500/10 to-pink-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Thiên sứ 7 tuổi Nguyễn Hải An & Nghĩa tình đồng bào lũ lụt miền Trung",
        content: "Bé Nguyễn Hải An (7 tuổi) mắc u não nan y đã dũng cảm tâm sự với mẹ: 'Con muốn sau này khi mất đi, những bộ phận của con vẫn sống trên cơ thể người khác'. Nghĩa cử hiến giác mạc đem lại ánh sáng cho 2 bệnh nhân đã làm lay động hàng triệu trái tim. Cùng với đó là hình ảnh người dân cả nước hướng về khúc ruột miền Trung chịu bão lũ năm 2020 quyên góp 'Lá lành đùm lá rách'.",
        lessonTakeaway: "Yêu thương con người là giá trị nhân văn cao quý nhất, mang lại ánh sáng và hy vọng cho cuộc sống.",
        characterOrEvent: "Bé Hải An hiến giác mạc & Cứu trợ bão lũ miền Trung 2020"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Người bạn mới của lớp 6A1 (bạn Trà) & Cây ATM gạo nghĩa tình",
        content: "Bạn Trà bị tật ở chân, nhà xa trường đi lại rất khó khăn. Cô giáo chủ nhiệm và các bạn đi xe đạp trong lớp 6A1 đã tự nguyện thay nhau chở Trà đi học mỗi ngày. Hình ảnh cây 'ATM gạo tự động' phát miễn phí cho người nghèo trong đại dịch và tiệm sách yêu thương đã thắp sáng tinh thần tương thân tương ái.",
        lessonTakeaway: "Yêu thương con người bắt đầu từ những hành động nhỏ bé, thiết thực dành cho bạn bè cùng lớp.",
        characterOrEvent: "Bạn Trà (Lớp 6A1) & Cây ATM gạo cho người nghèo"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Chương trình 'Cặp lá yêu thương' & Bạn Phúc chăm sóc cụ già neo đơn",
        content: "Chương trình nhân ái 'Cặp lá yêu thương', 'Cùng xây ước mơ' giúp đỡ các em học sinh nghèo mồ côi được tiếp tục đến trường. Bạn Phúc cạnh nhà có cụ bà neo đơn, mỗi khi rảnh rỗi Phúc rủ bạn bè sang quét dọn sân nhà, nhổ cỏ vườn và trò chuyện giúp cụ vơi bớt nỗi cô đơn.",
        lessonTakeaway: "Biết cảm thông, tha thứ và sẻ chia thời gian, tấm lòng với những người có hoàn cảnh khó khăn.",
        characterOrEvent: "Cặp lá yêu thương & Bạn Phúc giúp cụ bà neo đơn"
      }
    ],
    intro: {
      title: "Khởi động: Câu ca dao nghĩa tình dân tộc",
      scenario: "Lời dạy ngàn đời của cha ông: 'Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn' hay 'Nhiễu điều phủ lấy giá gương, người trong một nước phải thương nhau cùng'.",
      question: "Em đã từng nhận được sự yêu thương, giúp đỡ của người khác khi gặp khó khăn chưa? Cảm xúc lúc đó của em như thế nào?",
      suggestedThought: "Tình yêu thương sưởi ấm tâm hồn, xua tan cô đơn và tiếp thêm niềm tin trong cuộc sống."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Thế nào là yêu thương con người?",
          content: "Là sự quan tâm, giúp đỡ, làm những điều tốt đẹp cho người khác; đồng cảm, chia sẻ với những khó khăn, đau thương của đồng loại, nhất là những người gặp hoạn nạn, cơ nhỡ.",
          example: "Bé Hải An hiến giác mạc, cả lớp thay nhau chở bạn Trà đi học, ủng hộ đồng bào bị lũ lụt, giúp đỡ người tàn tật...",
          icon: "❤️"
        },
        {
          heading: "2. Biểu hiện của tình yêu thương con người",
          content: "Sẵn sàng giúp đỡ, chia sẻ lúc khó khăn; bao dung, tha thứ cho lỗi lầm khi người khác hối cải; dìu dắt người mắc sai lầm; biết hy sinh quyền lợi bản thân vì người khác; phê phán thái độ ích kỷ, vô cảm, bạo lực.",
          example: "Lời nói ân cần, cử chỉ nhường nhịn, quyên góp sách vở cho bạn nghèo, lên tiếng bảo vệ bạn bị bắt nạt.",
          icon: "🤝"
        },
        {
          heading: "3. Giá trị của tình yêu thương con người",
          content: "Giúp người được nhận có thêm sức mạnh vượt qua hoạn nạn; giúp người cho đi thấy tâm hồn thanh thản, sống đẹp hơn; làm cho xã hội trở nên lành mạnh, đoàn kết và nhân ái.",
          example: "Tục ngữ: 'Một miếng khi đói bằng một gói khi no', 'Thương người như thể thương thân'.",
          icon: "✨"
        }
      ]
    },
    summary: [
      "Yêu thương con người là quan tâm, giúp đỡ và làm điều tốt đẹp cho người khác, đặc biệt khi gặp khó khăn.",
      "Biểu hiện: Lời nói lễ độ, hành động giúp đỡ vô tư, tha thứ cho người sửa lỗi, bảo vệ người yếu thế.",
      "Ý nghĩa: Mang lại niềm vui, gắn kết con người, xây dựng xã hội hòa bình, nhân ái.",
      "Phê phán lối sống vô cảm, ích kỷ, thờ ơ trước nỗi đau của người khác hoặc hành vi bắt nạt, bạo lực."
    ],
    mindmap: {
      centerTitle: "Yêu thương con người",
      nodes: [
        {
          id: "m2-1",
          label: "Bản chất khái niệm",
          color: "border-rose-400 bg-rose-50 text-rose-900",
          children: [
            { id: "c2-1", label: "Quan tâm, đồng cảm, sẻ chia" },
            { id: "c2-2", label: "Giúp đỡ người nghèo, hoạn nạn" },
            { id: "c2-3", label: "Bao dung, độ lượng, tha thứ" }
          ]
        },
        {
          id: "m2-2",
          label: "Biểu hiện cụ thể",
          color: "border-pink-400 bg-pink-50 text-pink-900",
          children: [
            { id: "c2-4", label: "Trong gia đình: Hiếu thảo, chăm sóc người thân" },
            { id: "c2-5", label: "Trong nhà trường: Giúp bạn học kém, giúp bạn khuyết tật" },
            { id: "c2-6", label: "Ngoài xã hội: Quyên góp cứu trợ, hiến máu, bảo vệ môi trường" }
          ]
        },
        {
          id: "m2-3",
          label: "Hành vi trái ngược cần phê phán",
          color: "border-slate-400 bg-slate-50 text-slate-900",
          children: [
            { id: "c2-7", label: "Thờ ơ, vô cảm 'mặc kệ nó'" },
            { id: "c2-8", label: "Bạo lực học đường, bắt nạt bạn" },
            { id: "c2-9", label: "Trục lợi, nâng giá hàng hóa khi dịch bệnh" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q2-1",
        question: "Câu chuyện nào trong SGK GDCD 6 là tấm gương xúc động về sự hiến dâng sự sống và tình yêu thương con người?",
        options: [
          "A. Cậu bé chăn cừu và chó sói",
          "B. Bé Nguyễn Hải An 7 tuổi hiến giác mạc trao ánh sáng",
          "C. Chuyện Rô-bi tập đánh đàn piano",
          "D. Ga-li-lê chứng minh Trái Đất quay"
        ],
        correctAnswer: 1,
        explanation: "Nghĩa cử cao đẹp của bé Hải An (7 tuổi) hiến giác mạc cứu người là biểu tượng sáng ngời về lòng nhân ái trong SGK.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q2-2",
        question: "Hành vi nào sau đây thể hiện tình yêu thương con người trong trường học?",
        options: [
          "A. Cười nhạo bạn khi bạn bị điểm kém",
          "B. Cùng các bạn thay phiên đưa đón bạn bị gãy chân đến lớp",
          "C. Lập nhóm tẩy chay bạn học mới chuyển trường đến",
          "D. Cho bạn chép bài kiểm tra để bạn được điểm cao"
        ],
        correctAnswer: 1,
        explanation: "Thay phiên giúp đỡ bạn có hoàn cảnh khó khăn hoặc khuyết tật đến trường là hành động yêu thương thiết thực.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q2-3",
        question: "Hành động nào sau đây là TRÁI VỚI tình yêu thương con người?",
        options: [
          "A. Quyên góp áo ấm ủng hộ trẻ em vùng cao",
          "B. Vô cảm đứng quay clip khi thấy bạn bị bạo lực học đường thay vì báo người lớn",
          "C. Dắt người già và em nhỏ sang đường an toàn",
          "D. Nhường ghế xe buýt cho phụ nữ mang thai"
        ],
        correctAnswer: 1,
        explanation: "Thờ ơ, đứng quay clip bạo lực để câu view là hành vi vô cảm, dung túng cái ác, trái với đạo đức con người.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q2-4",
        question: "Câu tục ngữ, thành ngữ nào sau đây KHÔNG nói về tình yêu thương con người?",
        options: [
          "A. 'Cháy nhà hàng xóm bình chân như vại'",
          "B. 'Lá lành đùm lá rách'",
          "C. 'Thương người như thể thương thân'",
          "D. 'Một con ngựa đau cả tàu bỏ cỏ'"
        ],
        correctAnswer: 0,
        explanation: "'Cháy nhà hàng xóm bình chân như vại' phê phán sự ích kỷ, thờ ơ, vô cảm trước tai họa của người khác.",
        sourceBook: "Tổng Hợp"
      },
      {
        id: "q2-5",
        question: "Ý nghĩa cao đẹp nhất của tình yêu thương con người là gì?",
        options: [
          "A. Để được mọi người khen ngợi và thưởng tiền",
          "B. Giúp con người vượt qua gian khó, gắn kết xã hội và làm cuộc sống ấm áp, tươi đẹp hơn",
          "C. Để sau này bắt người khác phải trả ơn mình",
          "D. Để khoe khoang trên mạng xã hội"
        ],
        correctAnswer: 1,
        explanation: "Tình yêu thương làm cho cuộc sống tràn ngập hạnh phúc, xua tan đau thương và xây dựng một xã hội văn minh, nhân ái.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3: Siêng năng, kiên trì",
    order: 3,
    shortDesc: "Cần cù, tự giác, miệt mài theo đuổi mục tiêu dù gặp khó khăn, thử thách.",
    icon: "🐝",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    bgColor: "from-blue-500/10 to-indigo-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Cậu bé Rô-bi (Robby) học dương cầm & Thomas Edison phát minh bóng đèn",
        content: "Cậu bé Rô-bi (11 tuổi) bị khiếm khuyết khả năng cảm thụ âm nhạc nhưng đã miệt mài luyện đàn từng ngày để biểu diễn bản nhạc tuyệt tác tặng người mẹ ốm nặng. Nhà bác học Thomas Edison đã thực hiện hơn 10.000 thí nghiệm thất bại trước khi tìm ra sợi đốt vonfram phát sáng cho nhân loại.",
        lessonTakeaway: "Kiên trì không nản chí sẽ biến những điều không thể thành hiện thực kỳ diệu.",
        characterOrEvent: "Rô-bi (11 tuổi) & Nhà bác học Thomas Edison"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Bạn Cử vượt qua bóng tối cuộc đời & Trồng rau thủy canh",
        content: "Bạn Cử (6 tuổi bị mù mắt) đã vượt qua nỗi mặc cảm, kiên trì học chữ nổi, học máy tính và chơi đàn hát, được nhận bảng khen thiếu niên vượt khó vươn lên. Một bạn học sinh kiên trì chăm sóc giàn rau thủy canh suốt 3 tuần để thu hoạch rau sạch.",
        lessonTakeaway: "'Quan trọng nhất không phải là điểm xuất phát mà là hành trình nỗ lực liên tục không ngừng vượt khó'.",
        characterOrEvent: "Bạn Cử khiếm thị & Hành trình rèn luyện 3 tuần"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Trạng nguyên Mạc Đĩnh Chi bắt đom đóm đọc sách & Bạn Hoa luyện tiếng Anh",
        content: "Trạng nguyên Mạc Đĩnh Chi nhà nghèo không có tiền đi học, ban ngày nhặt củi, ban đêm bắt đom đóm bỏ vào vỏ trứng lấy ánh sáng học bài, đỗ Trạng nguyên lưỡng quốc. Bạn Hoa chuyển từ quê lên Hà Nội kém tiếng Anh đã kiên trì ra bờ Hồ Gươm giao tiếp với người nước ngoài mỗi cuối tuần để tiến bộ rõ rệt.",
        lessonTakeaway: "Có công mài sắt có ngày nên kim, sự nỗ lực kiên trì là chìa khóa mở cánh cửa tri thức.",
        characterOrEvent: "Lưỡng quốc Trạng nguyên Mạc Đĩnh Chi & Bạn Hoa luyện tiếng Anh"
      }
    ],
    intro: {
      title: "Khởi động: Trò chơi 'Ai nhanh hơn - Thành ngữ tục ngữ'",
      scenario: "Dân gian có câu: 'Có công mài sắt, có ngày nên kim' hay danh ngôn của Lỗ Tấn: 'Trên đường thành công không có dấu chân của kẻ lười biếng'.",
      question: "Em đã từng kiên trì vượt qua một môn học khó hay một kỹ năng khó (như bơi lội, chơi cờ, tập đàn) như thế nào?",
      suggestedThought: "Mọi thành tựu lớn lao đều bắt đầu từ những giờ phút nỗ lực không ngừng nghỉ mỗi ngày."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Siêng năng, kiên trì là gì?",
          content: "Siêng năng là đức tính làm việc tự giác, cần cù, chịu khó, thường xuyên của con người. Kiên trì là sự quyết tâm, miệt mài giữ vững ý định, làm đến cùng dù gặp muôn vàn khó khăn, trở ngại.",
          example: "Mạc Đĩnh Chi bắt đom đóm học bài, Robby luyện đàn piano, Edison kiên trì thí nghiệm bóng đèn...",
          icon: "⚡"
        },
        {
          heading: "2. Biểu hiện của người siêng năng, kiên trì",
          content: "Đi học chuyên cần, làm bài tập đầy đủ, không bỏ cuộc khi gặp bài toán khó, chăm làm việc nhà, kiên trì tập luyện thể dục thể thao, theo đuổi mục tiêu đã đề ra.",
          example: "Sắp xếp thời gian biểu học tập đều đặn, không bị cám dỗ bởi trò chơi điện tử khi chưa xong bài.",
          icon: "🎯"
        },
        {
          heading: "3. Ý nghĩa của siêng năng, kiên trì",
          content: "Giúp con người vượt qua mọi khó khăn, thử thách, nâng cao năng lực bản thân, đạt được mục tiêu học tập và thành công trong cuộc sống; được mọi người yêu mến, tin tưởng.",
          example: "Danh ngôn: 'Nghị lực và kiên trì sẽ chiến thắng tất cả' (Benjamin Franklin).",
          icon: "🏆"
        }
      ]
    },
    summary: [
      "Siêng năng: Tự giác, cần cù, chăm chỉ làm việc thường xuyên.",
      "Kiên trì: Quyết tâm theo đuổi mục tiêu đến cùng, không nản lòng trước khó khăn.",
      "Ý nghĩa: Giúp con người gặt hái thành công, hoàn thiện nhân cách, nhận được sự kính trọng.",
      "Cách rèn luyện: Có mục tiêu rõ ràng, không ỷ lại, học tập chuyên cần, vượt qua cám dỗ lười biếng."
    ],
    mindmap: {
      centerTitle: "Siêng năng & Kiên trì",
      nodes: [
        {
          id: "m3-1",
          label: "Khái niệm",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c3-1", label: "Siêng năng: Cần cù, chịu khó, tự giác" },
            { id: "c3-2", label: "Kiên trì: Nhẫn nại, làm đến cùng, không bỏ cuộc" }
          ]
        },
        {
          id: "m3-2",
          label: "Biểu hiện rèn luyện",
          color: "border-emerald-400 bg-emerald-50 text-emerald-900",
          children: [
            { id: "c3-3", label: "Trong học tập: Tự suy nghĩ bài khó, đi học đều" },
            { id: "c3-4", label: "Trong lao động: Chăm làm việc nhà, tăng gia sản xuất" },
            { id: "c3-5", label: "Trong cuộc sống: Tập thể thao kiên trì, rèn thói quen tốt" }
          ]
        },
        {
          id: "m3-3",
          label: "Phê phán thói xấu",
          color: "border-amber-400 bg-amber-50 text-amber-900",
          children: [
            { id: "c3-6", label: "Lười biếng, chán nản 'nghĩ thôi bài khó quá'" },
            { id: "c3-7", label: "ỷ lại, mượn vở bạn chép bài cho nhanh" },
            { id: "c3-8", label: "Cả thèm chóng chán, làm nửa chừng bỏ dở" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q3-1",
        question: "Trạng nguyên Mạc Đĩnh Chi trong sách Kết Nối Tri Thức đã thể hiện tính siêng năng, kiên trì bằng cách nào?",
        options: [
          "A. Mua thật nhiều sách đắt tiền về đọc",
          "B. Đứng ngoài cửa lớp nghe giảng, bắt đom đóm bỏ vào vỏ trứng lấy ánh sáng học ban đêm",
          "C. Nhờ bạn bè làm bài tập hộ để đi chơi",
          "D. Chỉ học khi có thầy giáo kiểm tra"
        ],
        correctAnswer: 1,
        explanation: "Mạc Đĩnh Chi nhà nghèo nhưng đã tận dụng ánh sáng đom đóm trong vỏ trứng để kiên trì học tập thành tài.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q3-2",
        question: "Khi gặp một bài tập Toán nâng cao khó giải, biểu hiện nào sau đây là của người có tính kiên trì?",
        options: [
          "A. Gấp sách lại đi chơi điện tử ngay lập tức",
          "B. Đọc kỹ lại đề, tra cứu tài liệu, suy nghĩ nhiều cách giải hoặc nhờ thầy cô gợi ý",
          "C. Chép bài giải trên mạng để nộp cho xong việc",
          "D. Nhờ bạn giải hộ rồi chép nguyên xi"
        ],
        correctAnswer: 1,
        explanation: "Người kiên trì luôn tìm tòi suy nghĩ nhiều phương pháp để giải quyết vấn đề đến cùng.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q3-3",
        question: "Nhà bác học Thomas Edison đã thực hiện bao nhiêu thí nghiệm để phát minh ra bóng đèn điện?",
        options: [
          "A. Hàng nghìn thí nghiệm với sự kiên trì phi thường không nản chí",
          "B. Chỉ làm 1 lần là thành công ngay",
          "C. Làm 5 lần rồi từ bỏ",
          "D. Nhờ người khác làm hộ toàn bộ"
        ],
        correctAnswer: 0,
        explanation: "Edison đã kiên trì thử nghiệm hàng nghìn chất liệu khác nhau cho đến khi tìm ra sợi đốt bóng đèn hoàn hảo.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q3-4",
        question: "Câu nói 'Trên đường thành công không có dấu chân của kẻ lười biếng' là của ai?",
        options: [
          "A. Thomas Edison",
          "B. Benjamin Franklin",
          "C. Nhà văn Lỗ Tấn",
          "D. Trạng nguyên Mạc Đĩnh Chi"
        ],
        correctAnswer: 2,
        explanation: "Đây là câu danh ngôn nổi tiếng của văn hào Lỗ Tấn nhắc nhở mọi người về giá trị của lao động cần cù.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q3-5",
        question: "Hành động nào thể hiện sự thiếu siêng năng, kiên trì?",
        options: [
          "A. Lập thời gian biểu và thực hiện đều đặn mỗi ngày",
          "B. Đi học võ được 2 ngày thấy đau nhức liền bỏ học ngay",
          "C. Chăm chỉ tưới cây và nhổ cỏ mỗi buổi sáng",
          "D. Thức dậy sớm tập thể dục đều đặn trong 3 tuần"
        ],
        correctAnswer: 1,
        explanation: "Thấy khó khăn ban đầu mà vội nản chí bỏ cuộc là biểu hiện của 'cả thèm chóng chán', thiếu kiên trì.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4: Tôn trọng sự thật",
    order: 4,
    shortDesc: "Công nhận, suy nghĩ, nói và làm theo đúng sự thật khách quan.",
    icon: "⚖️",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    bgColor: "from-purple-500/10 to-violet-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Ga-li-lê và chân lý 'Dù sao Trái Đất vẫn quay' & Trung thực trong lớp học",
        content: "Nhà thiên văn học Ga-li-lê (Galileo Galilei) bị tòa án La Mã kết án vì bảo vệ học thuyết Trái Đất quay quanh Mặt Trời. Khi bước ra khỏi tòa án, ông vẫn khẳng khái tuyên bố: 'Dù sao Trái Đất vẫn quay!'. Tình huống bạn Mai dũng cảm chỉ ra bạn Thảo chưa chuẩn bị bài, dù hai người là bạn thân.",
        lessonTakeaway: "Tôn trọng sự thật là bảo vệ chân lý đúng đắn, không bao che cho sai lầm.",
        characterOrEvent: "Nhà bác học Ga-li-lê & Bạn Mai lớp trưởng"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Mảnh giấy xin lỗi sau khi làm vỡ gương ô tô & Nhà thơ chân chính Dagestan",
        content: "Một bạn học sinh ở Hải Phòng vô tình làm vỡ gương ô tô bên đường, bạn đã dũng cảm dán lại mảnh giấy ghi số điện thoại xin lỗi và cam kết đền bù khiến người chủ xe vô cùng cảm động. Câu chuyện nhà thơ xứ Dagestan thà chết trên giàn hỏa thiêu chứ không chịu bẻ cong ngòi bút ca ngợi tên bạo chúa gian tà.",
        lessonTakeaway: "Dũng cảm nhận lỗi và sống trung thực giúp phẩm giá con người tỏa sáng.",
        characterOrEvent: "Mảnh giấy xin lỗi ở Hải Phòng & Nhà thơ chân chính Dagestan"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Bố bạn Toàn dạy về lòng trung thực & Vũ tố giác kẻ móc túi",
        content: "Bố Toàn khuyên con: 'Người thẳng thắn, thật thà có thể chịu thiệt thòi trước mắt nhưng sẽ nhận được sự tin yêu, tâm hồn thanh thản'. Bạn Vũ thấy tên trộm đang móc túi hành khách trên xe buýt đã dũng cảm thì thầm báo ngay cho bác phụ xe can thiệp bắt quả tang.",
        lessonTakeaway: "Nói thật, sống trung thực giúp bảo vệ công lý và đẩy lùi cái xấu.",
        characterOrEvent: "Lời dạy của bố bạn Toàn & Bạn Vũ trên chuyến xe buýt"
      }
    ],
    intro: {
      title: "Khởi động: Trò chơi 'Truyền tin' & Tình huống giao tiếp",
      scenario: "Trong trò chơi 'Truyền tin', nếu mỗi người tự ý bớt xén hoặc thêm thắt lời nói thì thông điệp cuối cùng sẽ bị bóp méo, gây hiểu lầm tai hại. Trong đời thực, nói sai sự thật có thể gây tổn hại lớn.",
      question: "Khi vô tình mắc lỗi (như làm vỡ đồ dùng hay bị điểm kém), em chọn nói thật với bố mẹ hay tìm cách nói dối?",
      suggestedThought: "Sự thật luôn là nền tảng của niềm tin và sự tôn trọng giữa người với người."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Thế nào là tôn trọng sự thật?",
          content: "Sự thật là những gì có thật trong hiện thực khách quan. Tôn trọng sự thật là công nhận cái có thật, suy nghĩ, nói và làm theo đúng sự thật; bảo vệ sự thật, bảo vệ lẽ phải.",
          example: "Ga-li-lê khẳng định Trái Đất quay; học sinh để lại lời nhắn đền bù khi làm vỡ gương xe; bạn Vũ tố giác kẻ móc túi...",
          icon: "🔍"
        },
        {
          heading: "2. Biểu hiện của người tôn trọng sự thật",
          content: "Luôn nói đúng sự thật với thầy cô, bạn bè, cha mẹ; dũng cảm nhận lỗi khi làm sai; cung cấp thông tin chính xác cho cơ quan chức năng; không bao che cho hành vi gian dối, quay cóp.",
          example: "Thẳng thắn nhận lỗi khi đi học muộn; không đổ tội cho bạn khác; phê phán thông tin bịa đặt giả mạo trên mạng.",
          icon: "🗣️"
        },
        {
          heading: "3. Ý nghĩa của tôn trọng sự thật",
          content: "Giúp chúng ta hiểu rõ bản chất sự việc, bảo vệ lẽ phải, tránh oan sai; giúp bản thân nâng cao phẩm giá, sống thanh thản, được mọi người tin cậy, kính trọng.",
          example: "Ca dao: 'Những người tính nết thật thà / Đi đâu cũng được người ta tin dùng'.",
          icon: "🌟"
        }
      ]
    },
    summary: [
      "Tôn trọng sự thật: Công nhận, nói và làm đúng theo sự thật khách quan.",
      "Biểu hiện: Sống ngay thẳng, thật thà, dũng cảm nhận lỗi, lên án sự dối trá.",
      "Ý nghĩa: Bảo vệ chân lý, đẩy lùi sai trái, tạo dựng lòng tin và sự bình an trong tâm hồn.",
      "Phê phán hành vi xuyên tạc, vu khống, bao che khuyết điểm hoặc lan truyền tin giả."
    ],
    mindmap: {
      centerTitle: "Tôn trọng sự thật",
      nodes: [
        {
          id: "m4-1",
          label: "Khái niệm",
          color: "border-purple-400 bg-purple-50 text-purple-900",
          children: [
            { id: "c4-1", label: "Sự thật: Cái có thật trong thực tế" },
            { id: "c4-2", label: "Tôn trọng sự thật: Nói và làm theo đúng sự thật" }
          ]
        },
        {
          id: "m4-2",
          label: "Biểu hiện tích cực",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c4-3", label: "Dũng cảm nhận lỗi khi làm vỡ kính, đi muộn" },
            { id: "c4-4", label: "Không quay cóp, trung thực trong thi cử" },
            { id: "c4-5", label: "Báo với người có trách nhiệm khi thấy điều xấu" }
          ]
        },
        {
          id: "m4-3",
          label: "Hành vi trái ngược",
          color: "border-rose-400 bg-rose-50 text-rose-900",
          children: [
            { id: "c4-6", label: "Nói dối bố mẹ, trốn học chơi game" },
            { id: "c4-7", label: "Bao che cho bạn làm việc xấu" },
            { id: "c4-8", label: "Tung tin bịa đặt, bôi nhọ người khác trên mạng" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q4-1",
        question: "Câu nói nổi tiếng của nhà bác học Ga-li-lê trước tòa án La Mã thể hiện đức tính gì?",
        options: [
          "A. 'Tôi muốn đi khắp năm châu bốn biển'",
          "B. 'Dù sao Trái Đất vẫn quay!' - Thể hiện ý chí kiên định bảo vệ sự thật và chân lý khoa học",
          "C. 'Học, học nữa, học mãi'",
          "D. 'Thời gian là vàng bạc'"
        ],
        correctAnswer: 1,
        explanation: "Câu nói 'Dù sao Trái Đất vẫn quay' của Ga-li-lê là biểu tượng bất diệt của việc tôn trọng và bảo vệ sự thật khoa học.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q4-2",
        question: "Hành động để lại mảnh giấy kèm số điện thoại xin lỗi sau khi va quẹt làm vỡ gương xe ở Hải Phòng thể hiện điều gì?",
        options: [
          "A. Thể hiện sự thiếu suy nghĩ",
          "B. Thể hiện sự trung thực, tôn trọng sự thật và tinh thần dám chịu trách nhiệm",
          "C. Thể hiện sự sợ hãi bị công an bắt",
          "D. Thể hiện sự khoe khoang"
        ],
        correctAnswer: 1,
        explanation: "Dám dũng cảm để lại lời nhắn xin lỗi và nhận trách nhiệm bồi thường là tấm gương sáng về tính trung thực.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q4-3",
        question: "Khi biết bạn thân của mình quay cóp trong giờ kiểm tra, em nên ứng xử như thế nào là đúng đắn?",
        options: [
          "A. Làm ngơ coi như không thấy gì để giữ tình bạn",
          "B. Cùng quay cóp với bạn để điểm cao",
          "C. Nhắc nhở, khuyên bạn nên tự làm bài và không được tái phạm",
          "D. Đăng bài lên mạng bêu rếu bạn để cả trường biết"
        ],
        correctAnswer: 2,
        explanation: "Khuyên bạn tự giác làm bài, chỉ ra cái sai là giúp bạn tiến bộ và thể hiện sự tôn trọng sự thật trong học đường.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q4-4",
        question: "Hành vi nào sau đây là vi phạm đức tính tôn trọng sự thật?",
        options: [
          "A. Nói đúng sự thật dù có thể không có lợi cho bản thân",
          "B. Tung tin đồn thất thiệt, sai sự thật về dịch bệnh hoặc bôi nhọ người khác trên Facebook",
          "C. Làm chứng đúng sự thật khi chứng kiến tai nạn giao thông",
          "D. Nhận khuyết điểm khi làm vỡ bình hoa của lớp"
        ],
        correctAnswer: 1,
        explanation: "Tung tin đồn thất thiệt, xuyên tạc sự thật là hành vi vi phạm đạo đức và pháp luật.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q4-5",
        question: "Ý nghĩa của việc sống trung thực, tôn trọng sự thật đối với mỗi cá nhân là gì?",
        options: [
          "A. Khiến tâm hồn luôn thanh thản, sống đàng hoàng và được mọi người tin yêu, kính trọng",
          "B. Giúp làm giàu nhanh chóng bằng mọi giá",
          "C. Không bao giờ bị ai phê bình",
          "D. Tránh được tất cả mọi nghĩa vụ lao động"
        ],
        correctAnswer: 0,
        explanation: "Người sống trung thực luôn có tâm hồn bình an, không phải lo sợ nói dối bị lộ và nhận được sự tôn trọng từ xã hội.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 5,
    title: "Bài 5: Tự lập",
    order: 5,
    shortDesc: "Tự làm lấy công việc của mình bằng khả năng và sức lực bản thân.",
    icon: "🌱",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    bgColor: "from-emerald-500/10 to-teal-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Bác Hồ ra đi tìm đường cứu nước & Tinh thần tự lập của bạn Long",
        content: "Người thanh niên Nguyễn Tất Thành (Bác Hồ) ra đi tìm đường cứu nước với đôi bàn tay trắng: 'Đây, tiền đây! Chúng ta sẽ làm bất cứ việc gì để sống và để đi'. Bạn Long học giỏi xin bố mẹ đi làm thêm tại quán cà phê để trải nghiệm, kiếm tiền mua sách vở yêu thích mà không phải xin tiền bố mẹ.",
        lessonTakeaway: "Tự lập giúp con người tự chủ, bản lĩnh và giảm bớt gánh nặng cho gia đình.",
        characterOrEvent: "Bác Hồ với hai bàn tay trắng & Bạn Long làm thêm tự mua sách"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Câu chuyện 'Làm bất cứ việc gì' & Bảng kế hoạch hè của bạn Hoa",
        content: "Khi anh Lê lo lắng không có tiền sang Pháp, Bác Hồ xòe hai bàn tay khẳng định sẽ lao động để tự lập nuôi sống bản thân. Bạn Hoa lập bảng kế hoạch hoạt động hè tự giác: học từ mới tiếng Anh, tự quét nhà rửa chén, chạy bộ rèn luyện sức khỏe mỗi ngày.",
        lessonTakeaway: "Tự lập không phải là biệt lập, mà là chủ động giải quyết công việc của mình một cách khoa học.",
        characterOrEvent: "Hai bàn tay Bác Hồ & Bảng kế hoạch mùa hè tự lập của bạn Hoa"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Bạn Hưng chăm sóc mẹ ốm & Anh Luận người Mường lập nghiệp cà phê",
        content: "Bố mất sớm, mẹ ốm nằm viện, bạn Hưng tự giác quán xuyến mọi việc nhà, chăm sóc mẹ và em chu đáo mà vẫn đạt học sinh giỏi. Anh Luận người dân tộc Mường tự đi làm thuê tích lũy vốn và kiến thức, sau đó mở doanh nghiệp cà phê phát triển quê hương.",
        lessonTakeaway: "Tính tự lập giúp con người tự tin đối mặt với nghịch cảnh và gặt hái thành công vững bền.",
        characterOrEvent: "Bạn Hưng vượt khó & Doanh nhân người Mường khởi nghiệp"
      }
    ],
    intro: {
      title: "Khởi động: Câu thơ 'Bàn tay ta làm nên tất cả'",
      scenario: "Nhà thơ Hoàng Trung Thông từng viết: 'Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm'. Câu chuyện Bác Hồ ra đi tìm đường cứu nước với đôi bàn tay lao động luôn là nguồn cảm hứng lớn lao.",
      question: "Những việc nào ở nhà và ở trường mà em đã có thể tự giác hoàn thành mà không cần cha mẹ, thầy cô nhắc nhở?",
      suggestedThought: "Tự lập là bước đầu tiên để một học sinh trưởng thành và làm chủ tương lai."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Khái niệm tự lập",
          content: "Tự lập là tự làm lấy các công việc của mình bằng khả năng và sức lực của bản thân; tự suy nghĩ, tự quyết định và tự chịu trách nhiệm về những việc mình làm.",
          example: "Tự giác học bài, tự giặt quần áo, tự dọn phòng ngủ, tự nấu cơm giúp mẹ, tự chuẩn bị cặp sách...",
          icon: "🚶"
        },
        {
          heading: "2. Biểu hiện của tính tự lập và trái với tự lập",
          content: "- Tự lập: Tự tin, bản lĩnh, kiên trì thực hiện kế hoạch, không trông chờ may rủi.\n- Trái với tự lập: Ỷ lại, dựa dẫm, phụ thuộc vào người khác, lười biếng, đùn đẩy trách nhiệm.",
          example: "Lưu ý: Tự lập không có nghĩa là biệt lập, cô độc hay từ chối mọi sự giúp đỡ hợp lý khi thực sự cần thiết.",
          icon: "⚖️"
        },
        {
          heading: "3. Ý nghĩa của tính tự lập",
          content: "Giúp con người tự tin, làm chủ suy nghĩ và hành động, dễ thành công trong cuộc sống và nhận được sự tin tưởng, tôn trọng của mọi người.",
          example: "Bạn Hưng tự lập vừa học giỏi vừa chăm mẹ; anh Luận tự lập xây dựng doanh nghiệp cho buôn làng.",
          icon: "🌟"
        }
      ]
    },
    summary: [
      "Tự lập là tự làm lấy công việc của mình, tự chịu trách nhiệm trước quyết định của bản thân.",
      "Biểu hiện: Tự giác học tập, lao động, sinh hoạt; không ỷ lại, dựa dẫm vào bố mẹ.",
      "Ý nghĩa: Giúp con người tự tin, vững vàng, dễ thành công và được kính trọng.",
      "Rèn luyện: Bắt đầu từ những việc nhỏ ở nhà, ở trường; lập thời gian biểu khoa học."
    ],
    mindmap: {
      centerTitle: "Tính Tự Lập",
      nodes: [
        {
          id: "m5-1",
          label: "Khái niệm cốt lõi",
          color: "border-emerald-400 bg-emerald-50 text-emerald-900",
          children: [
            { id: "c5-1", label: "Tự làm bằng khả năng và sức lực" },
            { id: "c5-2", label: "Tự chịu trách nhiệm với việc làm" },
            { id: "c5-3", label: "Không đồng nghĩa với cô lập, ích kỷ" }
          ]
        },
        {
          id: "m5-2",
          label: "Biểu hiện tự lập của học sinh",
          color: "border-teal-400 bg-teal-50 text-teal-900",
          children: [
            { id: "c5-4", label: "Sinh hoạt: Tự gấp chăn, rửa bát, nấu ăn" },
            { id: "c5-5", label: "Học tập: Tự chuẩn bị bài, tự giác ôn thi" },
            { id: "c5-6", label: "Ý chí: Vượt khó vươn lên khi gia cảnh khó khăn" }
          ]
        },
        {
          id: "m5-3",
          label: "Hành vi trái với tự lập",
          color: "border-amber-400 bg-amber-50 text-amber-900",
          children: [
            { id: "c5-7", label: "Ỷ lại: Đợi mẹ gọi dậy đi học, nhờ mẹ soạn cặp" },
            { id: "c5-8", label: "Dựa dẫm: Đòi mua đồ xa xỉ, sống phụ thuộc" },
            { id: "c5-9", label: "Gian lận: Chép bài bạn trong giờ kiểm tra" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q5-1",
        question: "Tấm gương sáng ngời nhất về tinh thần tự lập trong lịch sử dân tộc Việt Nam là ai?",
        options: [
          "A. Người thanh niên Nguyễn Tất Thành (Bác Hồ) ra đi tìm đường cứu nước với hai bàn tay trắng",
          "B. Nhà bác học Thomas Edison",
          "C. Nhà thiên văn Ga-li-lê",
          "D. Cậu bé Rô-bi"
        ],
        correctAnswer: 0,
        explanation: "Bác Hồ ra đi tìm đường cứu nước năm 1911 chỉ với hai bàn tay lao động tự lập và ý chí yêu nước vĩ đại.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q5-2",
        question: "Hành vi nào dưới đây thể hiện tính tự lập trong học tập của học sinh lớp 6?",
        options: [
          "A. Đợi đến sát giờ kiểm tra mới mượn vở bạn chép",
          "B. Tự giác soạn sách vở, làm bài tập đầy đủ và tự nghiên cứu bài mới",
          "C. Nhờ bố mẹ làm bài tập hộ để đi chơi",
          "D. Đổ lỗi cho đồng hồ báo thức khi đi học muộn"
        ],
        correctAnswer: 1,
        explanation: "Tự giác soạn bài, học tập và tìm tòi kiến thức là biểu hiện hàng đầu của tính tự lập trong học tập.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q5-3",
        question: "Hiểu thế nào là ĐÚNG về tính tự lập?",
        options: [
          "A. Tự lập là sống biệt lập, không cần bất kỳ ai giúp đỡ trong mọi hoàn cảnh",
          "B. Tự lập là chỉ người nhà nghèo mới phải làm, con nhà giàu không cần",
          "C. Tự lập là tự làm lấy công việc của mình bằng năng lực và sức lực, không dựa dẫm ỷ lại",
          "D. Tự lập là muốn làm gì thì làm, không cần tuân theo quy tắc"
        ],
        correctAnswer: 2,
        explanation: "Tự lập là chủ động hoàn thành công việc của bản thân, tự chịu trách nhiệm nhưng vẫn biết hợp tác và lắng nghe.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q5-4",
        question: "Trong bài kiểm tra Toán gặp câu khó, bạn Nam loay hoay chưa làm được, Dũng ngồi bên đưa bài giải sẵn bảo Nam chép. Nếu là Nam, em nên làm gì?",
        options: [
          "A. Cảm ơn Dũng và chép ngay để được điểm cao",
          "B. Từ chối chép bài, tự mình cố gắng suy nghĩ giải bài theo khả năng để rèn tính tự lập",
          "C. Đưa bài giải của Dũng cho các bạn khác cùng chép",
          "D. Đổ lỗi cho thầy giáo ra đề quá khó"
        ],
        correctAnswer: 1,
        explanation: "Từ chối chép bài thể hiện cả sự trung thực và tinh thần tự lập, tự chịu trách nhiệm với kết quả học tập của mình.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q5-5",
        question: "Người có tính tự lập sẽ nhận được lợi ích gì trong cuộc sống?",
        options: [
          "A. Tự tin, bản lĩnh, làm chủ cuộc sống và nhận được sự kính trọng từ mọi người",
          "B. Luôn bị người khác xa lánh",
          "C. Không cần phải học hành hay làm việc",
          "D. Được hưởng thụ tài sản mà không cần cố gắng"
        ],
        correctAnswer: 0,
        explanation: "Tính tự lập giúp con người tự tin, dễ vượt qua nghịch cảnh và xây dựng tương lai thành công vững chắc.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 6,
    title: "Bài 6: Tự nhận thức bản thân",
    order: 6,
    shortDesc: "Hiểu rõ điểm mạnh, điểm yếu, sở thích và giá trị của chính mình để hoàn thiện.",
    icon: "🪞",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    bgColor: "from-cyan-500/10 to-blue-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Bạn Ngọc vượt qua môn KHTN & Bạn Quân tự tin ước mơ làm bác sĩ",
        content: "Bạn Ngọc học giỏi nhiều môn nhưng sợ môn Khoa học Tự nhiên. Nghe lời cô giáo, Ngọc tự khám phá điểm yếu của mình là chưa nắm chắc phương pháp thực hành, từ đó kiên trì khắc phục và đạt kết quả tốt. Bạn Quân nhà nghèo, suy dinh dưỡng nhưng không tự ti mà xác định rõ mục tiêu học giỏi để trở thành bác sĩ chữa bệnh cho người nghèo.",
        lessonTakeaway: "Tự nhận thức giúp ta phát huy ưu điểm, sửa chữa nhược điểm và kiên định với ước mơ.",
        characterOrEvent: "Bạn Ngọc (Vượt qua môn KHTN) & Bạn Quân (Ước mơ bác sĩ)"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Bạn Linh 'Doraemon' tự tin & Bạn Vân viết nhật ký cảm xúc",
        content: "Bạn Linh mập mạp, da ngăm hay bị gọi là 'Doraemon' nhưng không buồn mà tự hào vì Doraemon thông minh tốt bụng và da ngăm khỏe mạnh. Bạn Vân có thói quen viết nhật ký cảm xúc mỗi ngày để nhận ra mình còn nhút nhát, từ đó chủ động xung phong phát biểu nhiều hơn.",
        lessonTakeaway: "Tự nhận thức bản thân một cách khách quan giúp ta tôn trọng chính mình và cởi mở hơn.",
        characterOrEvent: "Linh (Doraemon tự tin) & Vân (Viết nhật ký rèn luyện)"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Truyện ngụ ngôn 'Con gà đại bàng' & Bạn Hoa tự soi gương nhân cách",
        content: "Quả trứng đại bàng rơi vào tổ gà, chú đại bàng con lớn lên nghĩ mình chỉ là một con gà nên không dám cất cánh bay lên bầu trời bao la. Bạn Hoa mỗi ngày dành thời gian ghi nhật ký tự đánh giá điểm tốt và điểm cần sửa, lắng nghe lời góp ý của thầy cô và bạn bè để hoàn thiện.",
        lessonTakeaway: "Đừng tự giới hạn bản thân như chú đại bàng sống kiếp con gà; hãy khám phá tiềm năng vô hạn của chính mình.",
        characterOrEvent: "Ngụ ngôn 'Con gà đại bàng' & Nhật ký tự đánh giá của bạn Hoa"
      }
    ],
    intro: {
      title: "Khởi động: Hoạt động 'Vẽ bàn tay khám phá bản thân'",
      scenario: "Đặt bàn tay lên giấy và vẽ theo: Ngón cái ghi 3 điểm mạnh, ngón trỏ ghi 1 mục tiêu năm học, ngón giữa ghi ước mơ, ngón áp út ghi điều quan trọng nhất, ngón út ghi điểm cần khắc phục.",
      question: "Nếu phải giới thiệu về 2 ưu điểm lớn nhất và 1 điểm yếu cần sửa đổi của bản thân, em sẽ nói điều gì?",
      suggestedThought: "Hiểu mình là khởi đầu của mọi trí tuệ và sự thành công trong cuộc đời."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Tự nhận thức bản thân là gì?",
          content: "Là khả năng tự nhìn nhận, đánh giá đúng đắn, chính xác về bản thân mình (khả năng, tính cách, sở thích, thói quen, điểm mạnh, điểm yếu, giá trị và vị trí của mình trong cuộc sống).",
          example: "Nhận ra mình có năng khiếu vẽ, học toán nhanh nhưng hay nóng tính, thiếu kiên nhẫn khi đọc sách dài...",
          icon: "💡"
        },
        {
          heading: "2. Ý nghĩa của việc tự nhận thức bản thân",
          content: "Giúp ta hiểu rõ bản thân, tin tưởng vào giá trị của mình, phát huy ưu điểm, khắc phục nhược điểm; biết đặt mục tiêu phù hợp và đưa ra quyết định đúng đắn; biết tôn trọng bản thân và người khác.",
          example: "Bài học từ truyện 'Con gà đại bàng': Không tự ti hạn hẹp, dám khai phá tiềm năng bản thân.",
          icon: "🦅"
        },
        {
          heading: "3. Các cách tự nhận thức bản thân hiệu quả",
          content: "- Tự suy ngẫm, phân tích cảm xúc và hành vi hàng ngày (viết nhật ký).\n- Lắng nghe, đối chiếu nhận xét khách quan của người thân, thầy cô, bạn bè.\n- So sánh mình với các tấm gương tốt để học hỏi.\n- Tích cực tham gia các hoạt động tập thể, thử thách mới để bộc lộ năng lực.",
          example: "Lập bảng kế hoạch phát huy điểm mạnh và khắc phục điểm yếu.",
          icon: "📝"
        }
      ]
    },
    summary: [
      "Tự nhận thức bản thân: Nhìn nhận đúng điểm mạnh, điểm yếu, sở thích, tính cách của mình.",
      "Ý nghĩa: Giúp tự tin, phát huy thế mạnh, sửa đổi khuyết điểm, định hướng tương lai đúng đắn.",
      "Cách thực hiện: Tự quan sát, ghi nhật ký, lắng nghe góp ý chân thành, tích cực thử thách bản thân.",
      "Phê phán: Ảo tưởng kiêu ngạo về bản thân hoặc ngược lại là tự ti, mặc cảm, bắt chước người khác mù quáng."
    ],
    mindmap: {
      centerTitle: "Tự nhận thức bản thân",
      nodes: [
        {
          id: "m6-1",
          label: "Khái niệm",
          color: "border-cyan-400 bg-cyan-50 text-cyan-900",
          children: [
            { id: "c6-1", label: "Nhận diện điểm mạnh (ưu điểm)" },
            { id: "c6-2", label: "Nhận diện điểm yếu (hạn chế)" },
            { id: "c6-3", label: "Xác định ước mơ, sở thích, cảm xúc" }
          ]
        },
        {
          id: "m6-2",
          label: "Phương pháp rèn luyện",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c6-4", label: "Viết nhật ký tự đánh giá mỗi ngày" },
            { id: "c6-5", label: "Lắng nghe nhận xét từ thầy cô, bạn bè" },
            { id: "c6-6", label: "Tham gia hoạt động tập thể để khám phá mình" }
          ]
        },
        {
          id: "m6-3",
          label: "Thái độ đúng đắn",
          color: "border-emerald-400 bg-emerald-50 text-emerald-900",
          children: [
            { id: "c6-7", label: "Tự tin, trân trọng nét riêng bản thân" },
            { id: "c6-8", label: "Kiên trì sửa chữa các thói quen xấu" },
            { id: "c6-9", label: "Tôn trọng sự khác biệt của người khác" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q6-1",
        question: "Bài học sâu sắc nhất rút ra từ câu chuyện ngụ ngôn 'Con gà đại bàng' trong sách Kết Nối Tri Thức là gì?",
        options: [
          "A. Gà không thể sống chung với đại bàng",
          "B. Cần nhận thức đúng năng lực và tiềm năng của bản thân, không để sự tự ti hay định kiến kìm hãm sự phát triển",
          "C. Chỉ có loài chim mới biết bay cao",
          "D. Nên sống an phận như bầy gà"
        ],
        correctAnswer: 1,
        explanation: "Chú đại bàng sống kiếp con gà vì không tự nhận thức được sức mạnh thực sự của mình. Bài học nhắc chúng ta phải dám ước mơ và khám phá năng lực bản thân.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q6-2",
        question: "Cách làm nào dưới đây giúp học sinh tự nhận thức bản thân một cách khoa học và đúng đắn?",
        options: [
          "A. Đi xem bói để biết tương lai và tính cách",
          "B. Tự quan sát, ghi nhật ký, lập kế hoạch và lắng nghe góp ý chân thành từ thầy cô, bạn bè",
          "C. Luôn tự trách bản thân ngay cả khi không có lỗi",
          "D. Luôn coi mình là người hoàn hảo nhất lớp, không nghe ai góp ý"
        ],
        correctAnswer: 1,
        explanation: "Tự quan sát, ghi nhật ký và lắng nghe góp ý là phương pháp tự nhận thức khách quan, hiệu quả nhất.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q6-3",
        question: "Bạn Linh trong sách Chân Trời Sáng Tạo có thân hình mập mạp và da ngăm, bạn đã ứng xử thế nào trước biệt danh 'Doraemon'?",
        options: [
          "A. Khóc lóc và đòi bỏ học vì xấu hổ",
          "B. Đánh bạn vì dám trêu chọc mình",
          "C. Vui vẻ đón nhận, tự tin vì Doraemon tốt bụng và nước da ngăm khỏe khoắn",
          "D. Nhịn ăn để gầy đi thật nhanh bất chấp nguy hại sức khỏe"
        ],
        correctAnswer: 2,
        explanation: "Linh biết tự nhận thức, tự tin yêu quý đặc điểm riêng của mình và luôn sống hòa đồng, cởi mở.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q6-4",
        question: "Tự nhận thức bản thân mang lại ý nghĩa gì quan trọng cho học sinh?",
        options: [
          "A. Giúp học sinh tự tin, phát huy ưu điểm, sửa chữa khuyết điểm và kiên định với mục tiêu học tập",
          "B. Giúp học sinh không cần phải cố gắng học tập nữa",
          "C. Giúp học sinh luôn làm theo ý thích của người khác",
          "D. Giúp học sinh trở nên kiêu ngạo hơn các bạn"
        ],
        correctAnswer: 0,
        explanation: "Tự nhận thức bản thân là chìa khóa để hoàn thiện nhân cách và định hướng tương lai vững vàng.",
        sourceBook: "Tổng Hợp"
      },
      {
        id: "q6-5",
        question: "Hành vi nào dưới đây là biểu hiện của việc CHƯA BIẾT tự nhận thức bản thân?",
        options: [
          "A. Bạn Bình bắt chước mù quáng từ cách ăn mặc, đầu tóc đến sở thích ghét bỏ của ca sĩ thần tượng",
          "B. Bạn Hoa lắng nghe cô giáo chỉ ra chỗ sai trong bài văn để viết lại",
          "C. Bạn Minh biết mình lười đọc sách nên đặt mục tiêu đọc 5 trang sách mỗi tối",
          "D. Bạn Vân xin lỗi bạn vì lỡ to tiếng lúc nóng giận"
        ],
        correctAnswer: 0,
        explanation: "Bắt chước mù quáng thần tượng và đánh mất chính mình là biểu hiện lệch lạc, chưa biết tự nhận thức bản thân.",
        sourceBook: "Kết Nối Tri Thức"
      }
    ]
  },
  {
    id: 7,
    title: "Bài 7: Ứng phó với các tình huống nguy hiểm",
    order: 7,
    shortDesc: "Kỹ năng nhận diện và xử lý an toàn trước nguy hiểm từ con người và thiên nhiên.",
    icon: "🛡️",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    bgColor: "from-red-500/10 to-rose-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Ứng phó bắt nạt, bom mìn ven rừng & Cơn bão số 5 Noul 2020",
        content: "Tình huống bạn H bị bắt nạt và đe dọa; Bạn An và Ninh phát hiện vật lạ giống quả mìn ven rừng (Ninh kiên quyết ngăn An lại gần và chạy báo UBND xã); Tình huống chú thợ điện giả danh khi bố mẹ vắng nhà; Cơn bão số 5 Noul gây thiệt hại nặng nề, nhắc nhở kỹ năng chằng chống nhà cửa và không đi qua ngầm tràn.",
        lessonTakeaway: "Bình tĩnh nhận diện nguồn nguy hiểm, đánh lạc hướng đối tượng hoặc tìm sự trợ giúp khẩn cấp.",
        characterOrEvent: "Quả mìn ven rừng, Kẻ giả danh thợ điện & Bão số 5 Noul"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Kỹ năng chống đuối nước & Thoát hiểm khi bị người lạ theo dõi",
        content: "Quy tắc phòng chống đuối nước: Bình tĩnh nín thở thả nổi cơ thể, dùng tay chân như mái chèo đưa đầu lên thở; Tình huống bạn Hoa đi học về đường vắng bị kẻ xấu kéo tay ép lên xe máy (hét to 'Dừng lại ngay! Cứu tôi với!' để thu hút người đi đường); Không ném đá chọc tổ ong vò vẽ.",
        lessonTakeaway: "Hét thật to kêu cứu, chạy đến chỗ đông người hoặc nhà dân ven đường khi gặp kẻ gian.",
        characterOrEvent: "Kỹ năng chống đuối nước & Tình huống bắt cóc đường vắng"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Kỹ năng thoát hiểm hỏa hoạn & 5 số điện thoại khẩn cấp quốc gia",
        content: "Khi có cháy: Dùng khăn ướt bịt mũi miệng, đi khom hoặc bò thấp theo hành lang cầu thang bộ, đóng các cửa trên đường thoát để ngăn khói lan; Ứng phó mưa dông sấm sét (ở trong nhà, tắt thiết bị điện, tuyệt đối không trú dưới gốc cây to). Ghi nhớ các số khẩn cấp: 111 (Trẻ em), 112 (Cứu nạn), 113 (Công an), 114 (Cứu hỏa), 115 (Cấp cứu).",
        lessonTakeaway: "Trang bị đầy đủ kiến thức và ghi nhớ các số điện thoại cứu nạn là lá chắn bảo vệ sinh mạng.",
        characterOrEvent: "Quy trình thoát hiểm đám cháy & 5 số cứu nạn: 111, 112, 113, 114, 115"
      }
    ],
    intro: {
      title: "Khởi động: Tình huống gặp mưa dông sấm sét trên đường đi học",
      scenario: "Bạn Nam đang đi học về thì trời nổi dông bão, mây đen kéo đến và sấm sét bắt đầu nổ vang trời. Trước mặt Nam có 3 vị trí: (A) Dưới gốc cây to bên đường, (B) Trong chiếc lều bạt ven ruộng, (C) Dưới mái hiên kiên cố của một căn nhà gần đó.",
      question: "Nam nên chọn vị trí nào để trú ẩn an toàn nhất? Vì sao?",
      suggestedThought: "Chọn vị trí (C) - mái hiên nhà kiên cố; tuyệt đối không đứng dưới gốc cây to hay lều bạt giữa cánh đồng trống vì nguy cơ bị sét đánh rất cao."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Nhận diện các tình huống nguy hiểm",
          content: "- Nguy hiểm từ con người: Bắt cóc, bạo lực học đường, xâm hại, trộm cướp, lừa đảo qua mạng, kẻ xấu dụ dỗ...\n- Nguy hiểm từ thiên nhiên: Mưa dông, sấm sét, lũ quét, lũ ống, sạt lở đất, đuối nước, hỏa hoạn, động đất, lốc xoáy...",
          example: "Nạn nhân có thể bị tổn hại nghiêm trọng về tính mạng, sức khỏe, tinh thần và tài sản.",
          icon: "⚠️"
        },
        {
          heading: "2. Các bước ứng phó chung",
          content: "1. Bình tĩnh quan sát, nhận diện mối nguy hiểm.\n2. Đánh giá tình hình (nguy hiểm đến từ ai/hiện tượng gì? có thể xảy ra hậu quả gì?).\n3. Tìm kiếm phương án thoát hiểm an toàn (kêu cứu, chạy đến nơi đông người, gọi điện hỗ trợ).\n4. Thực hiện phương án bảo toàn tính mạng lên hàng đầu.",
          example: "Bị kẻ xấu lôi kéo: Hét to 'Cháy nhà!' hoặc 'Cứu tôi với!' để gây chú ý; Cháy nhà: Dùng khăn ướt bò thấp.",
          icon: "🧠"
        },
        {
          heading: "3. 5 Đầu số điện thoại khẩn cấp quốc gia (BẮT BUỘC GHI NHỚ)",
          content: "📞 111: Tổng đài Quốc gia Bảo vệ Trẻ em (hỗ trợ bạo hành, xâm hại)\n📞 112: Yêu cầu trợ giúp khẩn cấp, tìm kiếm cứu nạn toàn quốc (thiên tai, bão lũ)\n📞 113: Gọi Công an / Cảnh sát phản ứng nhanh (an ninh, trật tự, trộm cướp)\n📞 114: Cảnh sát Phòng cháy, chữa cháy và cứu nạn, cứu hộ (hỏa hoạn, mắc kẹt)\n📞 115: Cấp cứu y tế khẩn cấp",
          example: "Đường dây nóng hỗ trợ trẻ em: 1800 1507 hoặc 111.",
          icon: "📱"
        }
      ]
    },
    summary: [
      "Tình huống nguy hiểm gồm nguy hiểm từ con người (bắt cóc, bạo lực, trộm cắp) và thiên nhiên (bão, dông sét, lũ quét, hỏa hoạn).",
      "Nguyên tắc cốt lõi: Luôn bình tĩnh, ưu tiên bảo vệ tính mạng bản thân lên trên hết.",
      "Kỹ năng thoát hiểm: Không mở cửa cho người lạ; dùng khăn ướt bò thấp khi có cháy; không trú mưa dưới gốc cây to.",
      "Ghi nhớ thuộc lòng 5 số điện thoại khẩn cấp: 111, 112, 113, 114, 115."
    ],
    mindmap: {
      centerTitle: "Ứng phó tình huống nguy hiểm",
      nodes: [
        {
          id: "m7-1",
          label: "Nguy hiểm từ con người",
          color: "border-red-400 bg-red-50 text-red-900",
          children: [
            { id: "c7-1", label: "Bắt cóc: Hét to, chạy vào chỗ đông người" },
            { id: "c7-2", label: "Bạo lực học đường: Báo thầy cô, gọi 111" },
            { id: "c7-3", label: "Trộm cướp, kẻ lạ: Khóa cửa, gọi 113" }
          ]
        },
        {
          id: "m7-2",
          label: "Nguy hiểm từ thiên nhiên",
          color: "border-amber-400 bg-amber-50 text-amber-900",
          children: [
            { id: "c7-4", label: "Hỏa hoạn: Khăn ướt bịt mũi, bò thấp, gọi 114" },
            { id: "c7-5", label: "Dông sét: Không đứng gốc cây, tắt đồ điện" },
            { id: "c7-6", label: "Lũ quét, sạt lở: Theo dõi dự báo, sơ tán, gọi 112" },
            { id: "c7-7", label: "Đuối nước: Bình tĩnh thả nổi, học bơi an toàn" }
          ]
        },
        {
          id: "m7-3",
          label: "5 Số điện thoại khẩn cấp",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c7-8", label: "111 (Bảo vệ trẻ em) | 112 (Cứu nạn bão lũ)" },
            { id: "c7-9", label: "113 (Công an) | 114 (Cứu hỏa) | 115 (Cấp cứu)" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q7-1",
        question: "Khi phát hiện có đám cháy trong chung cư hoặc tòa nhà cao tầng, hành động nào sau đây là ĐÚNG NHẤT?",
        options: [
          "A. Chạy ngay vào thang máy để xuống đất cho nhanh",
          "B. Lấy khăn thấm nước bịt mũi miệng, cúi khom hoặc bò thấp men theo tường thoát ra cầu thang bộ",
          "C. Nhảy ngay từ cửa sổ tầng cao xuống đất",
          "D. Nấp kín trong tủ quần áo chờ cứu hộ"
        ],
        correctAnswer: 1,
        explanation: "Khói độc bốc lên cao, vì vậy phải dùng khăn ướt lọc khí độc và bò thấp, tuyệt đối không dùng thang máy vì có thể mất điện kẹt lại.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q7-2",
        question: "Số điện thoại của Tổng đài Quốc gia Bảo vệ Trẻ em tại Việt Nam là gì?",
        options: [
          "A. 113",
          "B. 114",
          "C. 111",
          "D. 115"
        ],
        correctAnswer: 2,
        explanation: "Tổng đài 111 là đường dây nóng quốc gia tiếp nhận và xử lý mọi thông tin về bảo vệ, chăm sóc trẻ em và phòng chống bạo lực xâm hại trẻ em.",
        sourceBook: "Tổng Hợp"
      },
      {
        id: "q7-3",
        question: "Khi đang trên đường đi học gặp cơn mưa dông có sấm sét dữ dội, em KHÔNG NÊN làm điều gì?",
        options: [
          "A. Chạy vào trú dưới gốc cây cổ thụ to hoặc cột điện ven đường",
          "B. Tìm nơi trú ẩn an toàn dưới mái hiên nhà kiên cố",
          "C. Tránh xa các vật dụng bằng kim loại dẫn điện",
          "D. Không sử dụng điện thoại di động khi đang ở ngoài trời mưa dông"
        ],
        correctAnswer: 0,
        explanation: "Cây to và cột điện cao là những nơi dễ bị sét đánh trúng nhất, tuyệt đối không được trú mưa ở đó.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q7-4",
        question: "Khi ở nhà một mình, có người tự xưng là nhân viên điện lực/thợ sửa ống nước yêu cầu mở cửa vào kiểm tra, em nên làm gì?",
        options: [
          "A. Mở toang cửa mời vào ngay lập tức",
          "B. Khóa chặt cửa, từ chối mở và hẹn khi có bố mẹ về mới tiếp, đồng thời gọi điện báo cho bố mẹ",
          "C. Đi trốn vào gầm giường",
          "D. Đưa chìa khóa cho người đó tự mở"
        ],
        correctAnswer: 1,
        explanation: "Cần cảnh giác trước kẻ gian giả danh; tuyệt đối không mở cửa cho người lạ khi ở nhà một mình.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q7-5",
        question: "Để yêu cầu tìm kiếm cứu nạn khẩn cấp trên phạm vi toàn quốc khi xảy ra thiên tai, bão lũ, ta gọi đến số nào?",
        options: [
          "A. 112",
          "B. 113",
          "C. 114",
          "D. 115"
        ],
        correctAnswer: 0,
        explanation: "Tổng đài 112 là đầu số dịch vụ cứu nạn, cứu hộ khẩn cấp toàn quốc khi gặp sự cố thiên tai, bão lũ, sạt lở.",
        sourceBook: "Kết Nối Tri Thức"
      }
    ]
  },
  {
    id: 8,
    title: "Bài 8: Tiết kiệm",
    order: 8,
    shortDesc: "Sử dụng hợp lý, có hiệu quả tiền bạc, của cải, thời gian và sức lực.",
    icon: "💰",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
    bgColor: "from-yellow-500/10 to-amber-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Tấm gương sống giản dị và tiết kiệm của Bác Hồ",
        content: "Hằng ngày Thông tấn xã Việt Nam gửi bản tin in một mặt, Bác phê bình là lãng phí giấy. Khi đọc xong, Bác bảo chuyển bản tin cho Văn phòng cắt làm phong bì hoặc tận dụng mặt sau làm giấy viết. Ngày 10/5/1969, Bác đã viết lại toàn bộ đoạn mở đầu bản Di chúc lịch sử bằng mực xanh vào mặt sau tờ tin tham khảo. Bác cũng từ chối tổ chức kỷ niệm sinh nhật để dành tiền in sách giáo khoa cho thiếu nhi.",
        lessonTakeaway: "Tiết kiệm từ những tờ giấy, hạt gạo là đức tính cao đẹp của người có nhân cách lớn.",
        characterOrEvent: "Bác Hồ viết Di chúc trên giấy một mặt & Từ chối sinh nhật xa xỉ"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Lối sống tiết kiệm của Bác Hồ & Tiết kiệm nước, điện hằng ngày",
        content: "Bác Hồ đề nghị cứ 10 ngày nhịn ăn một bữa để góp gạo cứu dân nghèo. Các bạn nhỏ học tập Bác qua hành động: lấy nước vo gạo tưới cây xanh, nuôi heo đất tiết kiệm tiền mua sách vở, tắt đèn quạt khi ra khỏi phòng học.",
        lessonTakeaway: "Tiết kiệm không chỉ vì lợi ích cá nhân mà còn để chia sẻ, giúp đỡ cộng đồng.",
        characterOrEvent: "Hũ gạo cứu đói của Bác Hồ & Nước vo gạo tưới cây"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Bạn Hải mổ heo đất mua thuốc cho em gái & Anh Hòa tiêu hoang",
        content: "Em gái Trang bị ốm cần tiền mua thuốc, bạn Hải đã chủ động đập con heo đất tiết kiệm tiền mừng tuổi và tiền bán giấy vụn để phụ mẹ mua thuốc cho em. Ngược lại, anh Hòa mở tiệm tạp hóa kiếm được nhiều tiền nhưng tiêu xài hoang phí, khi lâm bệnh nằm viện đã rơi vào cảnh túng quẫn nợ nần.",
        lessonTakeaway: "Người biết tiết kiệm sẽ chủ động ứng phó trước bất trắc, tai ương trong cuộc sống.",
        characterOrEvent: "Heo đất của bạn Hải & Bài học tiêu hoang của anh Hòa tiệm tạp hóa"
      }
    ],
    intro: {
      title: "Khởi động: Câu ca dao mùa màng & Chiếc đồng hồ thời gian",
      scenario: "Ca dao có câu: 'Được mùa chớ phụ ngô khoai / Đến khi thất bát lấy ai bạn cùng'. Tiết kiệm không chỉ là tiền bạc mà còn là tiết kiệm thời gian, điện nước và sức lực.",
      question: "Em có thói quen tắt đèn, khóa vòi nước khi không sử dụng và lập kế hoạch chi tiêu tiền tiêu vặt không?",
      suggestedThought: "Biết trân trọng mồ hôi nước mắt của cha mẹ là biểu hiện của người con hiếu thảo."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Khái niệm tiết kiệm",
          content: "Tiết kiệm là biết sử dụng một cách hợp lý, có hiệu quả của cải vật chất, tiền bạc, thời gian, công sức của mình và của người khác nhằm đạt được mục tiêu tốt đẹp.",
          example: "Tắt thiết bị điện khi ra khỏi lớp, dùng nước tiết kiệm, không ăn uống bỏ thừa, lập thời gian biểu...",
          icon: "💡"
        },
        {
          heading: "2. Phân biệt tiết kiệm với keo kiệt và lãng phí",
          content: "- Tiết kiệm: Chi tiêu đúng mức, hợp lý, đúng mục đích cần thiết.\n- Keo kiệt, bủn xỉn: Bủn xỉn, không dám chi tiêu ngay cả những nhu cầu thiết yếu phục vụ sức khỏe, học tập.\n- Lãng phí, xa hoa: Tiêu xài phung phí, vứt bỏ đồ dùng còn tốt, lãng phí thời gian vào việc vô bổ.",
          example: "Hải đập heo đất mua thuốc cho em là tiết kiệm; anh Hòa tiêu hoang là lãng phí.",
          icon: "⚖️"
        },
        {
          heading: "3. Ý nghĩa của lối sống tiết kiệm",
          content: "Giúp quý trọng thành quả lao động của bản thân và gia đình; giảm gánh nặng kinh tế; tạo điều kiện tích lũy giúp đỡ người khó khăn; xây dựng nếp sống văn minh.",
          example: "Lời dạy của Bác: 'Nơi nào cũng tiết kiệm một chút thì một năm đỡ được hàng vạn tấn giấy, hàng triệu đồng bạc'.",
          icon: "🌟"
        }
      ]
    },
    summary: [
      "Tiết kiệm: Sử dụng hợp lý, đúng mức tiền bạc, thời gian, sức lực và của cải.",
      "Biểu hiện: Tắt điện nước khi không dùng, bảo quản đồ dùng học tập, không đua đòi xa xỉ, quản lý thời gian tốt.",
      "Ý nghĩa: Giúp gia đình ấm no, tích lũy tương lai, quý trọng sức lao động của cha mẹ.",
      "Phê phán lối sống đua đòi, lãng phí tiền bạc hoặc ngược lại là keo kiệt bủn xỉn."
    ],
    mindmap: {
      centerTitle: "Lối sống tiết kiệm",
      nodes: [
        {
          id: "m8-1",
          label: "Các lĩnh vực tiết kiệm",
          color: "border-yellow-400 bg-yellow-50 text-yellow-900",
          children: [
            { id: "c8-1", label: "Tiết kiệm tiền bạc & Của cải" },
            { id: "c8-2", label: "Tiết kiệm thời gian (học tập đúng giờ)" },
            { id: "c8-3", label: "Tiết kiệm năng lượng: Điện, nước sạch, nhiên liệu" }
          ]
        },
        {
          id: "m8-2",
          label: "Hành động của học sinh",
          color: "border-amber-400 bg-amber-50 text-amber-900",
          children: [
            { id: "c8-4", label: "Bảo quản sách vở, đồ dùng không vẽ bậy" },
            { id: "c8-5", label: "Lấy thức ăn vừa đủ, không lãng phí" },
            { id: "c8-6", label: "Nuôi heo đất tiết kiệm tiền mua dụng cụ" }
          ]
        },
        {
          id: "m8-3",
          label: "Phân biệt ranh giới",
          color: "border-red-400 bg-red-50 text-red-900",
          children: [
            { id: "c8-7", label: "Tiết kiệm: Hợp lý, khoa học, nhân văn" },
            { id: "c8-8", label: "Keo kiệt: Bủn xỉn, bủn bỉn nhu cầu thiết yếu" },
            { id: "c8-9", label: "Lãng phí: Đua đòi hàng hiệu, lãng phí giờ giấc" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q8-1",
        question: "Tấm gương của Bác Hồ trong việc tiết kiệm giấy viết được thể hiện như thế nào trong SGK Cánh Diều?",
        options: [
          "A. Không bao giờ viết bất kỳ bức thư nào",
          "B. Tận dụng mặt sau của bản tin để viết bản Di chúc lịch sử năm 1969 và làm phong bì",
          "C. Bắt nhân viên mua giấy thật rẻ tiền",
          "D. Đốt bỏ toàn bộ các tờ báo cũ"
        ],
        correctAnswer: 1,
        explanation: "Bác Hồ đã viết bản Di chúc lịch sử trên mặt sau tờ tin tham khảo đặc biệt, thể hiện đức tính cần kiệm giản dị phi thường.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q8-2",
        question: "Hành động nào sau đây thể hiện ĐÚNG lối sống tiết kiệm của học sinh?",
        options: [
          "A. Nhịn ăn sáng đến kiệt sức để lấy tiền nạp game",
          "B. Tắt quạt, tắt đèn khi cả lớp ra sân thể dục và khóa vòi nước sau khi rửa tay",
          "C. Vứt bỏ sách giáo khoa cũ sau khi học xong thay vì giữ gìn tặng lại cho các em khóa sau",
          "D. Đòi bố mẹ mua điện thoại đời mới đắt tiền để bằng bạn bằng bè"
        ],
        correctAnswer: 1,
        explanation: "Tắt điện nước khi không sử dụng là hành động tiết kiệm thiết thực bảo vệ nguồn tài nguyên chung.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q8-3",
        question: "Trong bộ sách Kết Nối Tri Thức, bạn Hải đã làm gì với số tiền tiết kiệm từ nuôi heo đất?",
        options: [
          "A. Mua máy chơi game đắt tiền",
          "B. Dùng toàn bộ số tiền để phụ mẹ mua thuốc chữa bệnh cho em gái Trang",
          "C. Mời bạn bè đi ăn nhà hàng sang trọng",
          "D. Đem cho người lạ trên mạng"
        ],
        correctAnswer: 1,
        explanation: "Bạn Hải đã dùng tiền tiết kiệm mổ heo đất để giúp đỡ gia đình lúc hoạn nạn, thể hiện tình yêu thương và sự tiết kiệm cao đẹp.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q8-4",
        question: "Thế nào là sự khác biệt giữa 'Tiết kiệm' và 'Keo kiệt, bủn xỉn'?",
        options: [
          "A. Tiết kiệm là chi tiêu hợp lý đúng mức, còn keo kiệt là bủn xỉn không dám chi tiêu ngay cả những nhu cầu thiết yếu chính đáng",
          "B. Tiết kiệm và keo kiệt hoàn toàn giống hệt nhau",
          "C. Tiết kiệm chỉ dành cho người giàu",
          "D. Keo kiệt là lối sống tốt cần nhân rộng"
        ],
        correctAnswer: 0,
        explanation: "Tiết kiệm là văn minh, khoa học; keo kiệt bủn xỉn là thói xấu gây hại cho sức khỏe và các mối quan hệ xã hội.",
        sourceBook: "Tổng Hợp"
      },
      {
        id: "q8-5",
        question: "Tiết kiệm thời gian được biểu hiện qua hành động nào dưới đây?",
        options: [
          "A. Vừa học bài vừa lướt mạng xã hội xem video ngắn",
          "B. Lập thời gian biểu khoa học, tập trung học xong bài rồi mới giải trí",
          "C. Thức khuya chơi game rồi ngủ bù cả ngày hôm sau",
          "D. Để bài tập dồn đến sát giờ thi mới cuống cuồng làm"
        ],
        correctAnswer: 1,
        explanation: "Lập thời gian biểu và tập trung làm việc dứt điểm giúp sử dụng quỹ thời gian quý báu hiệu quả nhất.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 9,
    title: "Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam",
    order: 9,
    shortDesc: "Khái niệm công dân, quốc tịch và các căn cứ xác định công dân Việt Nam.",
    icon: "🇻🇳",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    bgColor: "from-red-600/10 to-yellow-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Căn cứ pháp lý xác định quốc tịch Việt Nam theo Luật Quốc tịch",
        content: "Tình huống các bạn trẻ đa quốc gia: Anh Mun sinh ra ở Singapore nhập quốc tịch Mỹ; Chị Natasha sinh ra ở Nga; Bạn Lan Anh có cha mẹ mang quốc tịch Việt Nam sinh ra ở Việt Nam; Các trường hợp trẻ em sinh ra trên lãnh thổ Việt Nam có cha mẹ không rõ quốc tịch hoặc bị bỏ rơi.",
        lessonTakeaway: "Quốc tịch là căn cứ pháp lý duy nhất để xác định một người là công dân của một nước.",
        characterOrEvent: "Căn cứ xác định quốc tịch theo Luật Quốc tịch Việt Nam 2008 (sửa đổi 2014)"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Các giấy tờ chứng minh quốc tịch & Bạn Sùng Nhi, Peter, Hoa SOS",
        content: "Hình ảnh các giấy tờ pháp lý: Giấy khai sinh, Căn cước công dân, Hộ chiếu Việt Nam. Tình huống Sùng Nhi là người dân tộc H'mông có quốc tịch Việt Nam; Peter sinh ra tại Việt Nam có cha mẹ là người không quốc tịch thường trú tại Việt Nam; Hoa bị bỏ rơi ở Việt Nam nuôi dưỡng tại làng SOS đều là công dân Việt Nam.",
        lessonTakeaway: "Mọi trẻ em sinh ra trên đất nước Việt Nam đều được pháp luật bảo vệ quyền có quốc tịch.",
        characterOrEvent: "Căn cước công dân, Hộ chiếu & Tình huống các bạn đa văn hóa"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Chuyến bay nghĩa tình đón công dân Việt Nam từ tâm dịch Covid-19",
        content: "Trước diễn biến phức tạp của dịch bệnh Covid-19 toàn cầu, Chính phủ Việt Nam đã tổ chức hàng trăm chuyến bay nhân đạo đón đồng bào, công dân Việt Nam từ khắp thế giới về nước an toàn. Điều này khẳng định trách nhiệm và sự bảo hộ thiêng liêng của Nhà nước Việt Nam đối với công dân của mình.",
        lessonTakeaway: "Nhà nước bảo hộ quyền lợi hợp pháp của công dân Việt Nam ở trong và ngoài nước.",
        characterOrEvent: "Chuyến bay giải cứu công dân Covid-19 & Điều 5, 15, 16, 17, 18 Luật Quốc tịch"
      }
    ],
    intro: {
      title: "Khởi động: Cảm xúc với bài hát 'Việt Nam ơi!'",
      scenario: "Giai điệu hào hùng: 'Việt Nam hỡi, Việt Nam ơi, tự hào hát mãi lên Việt Nam ơi!'. Mỗi khi mang trên mình tấm hộ chiếu Việt Nam hoặc đứng chào cờ Tổ quốc cờ đỏ sao vàng, mỗi người đều trào dâng lòng yêu nước.",
      question: "Theo em, căn cứ vào đâu để xác định một người là công dân của nước Cộng hòa xã hội chủ nghĩa Việt Nam?",
      suggestedThought: "Quốc tịch là mối quan hệ pháp lý thiêng liêng giữa Nhà nước và công dân."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Khái niệm công dân và quốc tịch",
          content: "- Công dân là cá nhân, con người cụ thể thuộc về một quốc gia, có năng lực pháp luật, có quyền và nghĩa vụ theo quy định của pháp luật nước đó.\n- Quốc tịch là căn cứ pháp lý để xác định công dân của một nước, thể hiện mối quan hệ gắn bó giữa Nhà nước và công dân.\n- Công dân nước CHXHCN Việt Nam là người có quốc tịch Việt Nam (Điều 17 Hiến pháp 2013).",
          example: "Các giấy tờ chứng minh: Căn cước công dân, Giấy khai sinh, Hộ chiếu Việt Nam.",
          icon: "📜"
        },
        {
          heading: "2. Các căn cứ xác định người có quốc tịch Việt Nam (Luật Quốc tịch 2008)",
          content: "1. Trẻ em sinh ra có cả cha và mẹ là công dân Việt Nam (dù sinh trong hay ngoài nước).\n2. Trẻ em sinh ra có cha hoặc mẹ là công dân Việt Nam, người kia là người nước ngoài (nếu có thỏa thuận chọn quốc tịch VN lúc khai sinh).\n3. Trẻ em sinh ra trên lãnh thổ Việt Nam mà cha mẹ không quốc tịch nhưng có nơi thường trú tại VN.\n4. Trẻ sơ sinh bị bỏ rơi, trẻ em tìm thấy trên lãnh thổ Việt Nam mà không rõ cha mẹ là ai.\n5. Người nước ngoài được nhập quốc tịch Việt Nam theo quy định.",
          example: "Bạn Sùng Nhi, bạn Hoa Làng SOS đều mang quốc tịch Việt Nam hợp pháp.",
          icon: "⚖️"
        },
        {
          heading: "3. Mối quan hệ giữa Nhà nước và công dân Việt Nam",
          content: "Công dân Việt Nam có các quyền và nghĩa vụ đối với Nhà nước; được Nhà nước bảo vệ và bảo đảm thực hiện các quyền hợp pháp; công dân ở nước ngoài được Nhà nước bảo hộ.",
          example: "Chính phủ tổ chức chuyến bay đưa công dân từ vùng dịch/vùng chiến sự về nước an toàn.",
          icon: "🇻🇳"
        }
      ]
    },
    summary: [
      "Công dân nước CHXHCN Việt Nam là người mang quốc tịch Việt Nam.",
      "Quốc tịch là căn cứ xác định công dân, thể hiện mối quan hệ hai chiều giữa Nhà nước và công dân.",
      "Giấy tờ chứng minh quốc tịch: Giấy khai sinh, Căn cước công dân, Hộ chiếu.",
      "Học sinh cần tự hào là công dân Việt Nam, chăm chỉ học tập để xây dựng và bảo vệ Tổ quốc."
    ],
    mindmap: {
      centerTitle: "Công dân nước CHXHCN Việt Nam",
      nodes: [
        {
          id: "m9-1",
          label: "Khái niệm nền tảng",
          color: "border-red-400 bg-red-50 text-red-900",
          children: [
            { id: "c9-1", label: "Công dân: Con người cụ thể mang quốc tịch" },
            { id: "c9-2", label: "Quốc tịch: Căn cứ pháp lý xác định công dân" },
            { id: "c9-3", label: "Công dân VN: Người có quốc tịch Việt Nam" }
          ]
        },
        {
          id: "m9-2",
          label: "Căn cứ xác định quốc tịch VN",
          color: "border-amber-400 bg-amber-50 text-amber-900",
          children: [
            { id: "c9-4", label: "Cha mẹ đều là công dân Việt Nam" },
            { id: "c9-5", label: "Cha hoặc mẹ là người VN có thỏa thuận văn bản" },
            { id: "c9-6", label: "Trẻ bị bỏ rơi/tìm thấy trên đất nước Việt Nam" },
            { id: "c9-7", label: "Người nước ngoài làm thủ tục nhập quốc tịch VN" }
          ]
        },
        {
          id: "m9-3",
          label: "Giấy tờ chứng minh",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c9-8", label: "Giấy khai sinh" },
            { id: "c9-9", label: "Thẻ Căn cước công dân" },
            { id: "c9-10", label: "Hộ chiếu Việt Nam" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q9-1",
        question: "Căn cứ pháp lý duy nhất để xác định một người là công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam là gì?",
        options: [
          "A. Nơi sinh sống hiện tại",
          "B. Quốc tịch Việt Nam",
          "C. Khả năng nói tiếng Việt trôi chảy",
          "D. Màu da và ngoại hình"
        ],
        correctAnswer: 1,
        explanation: "Quốc tịch là căn cứ xác định công dân của một nước theo quy định của Hiến pháp và Luật Quốc tịch.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q9-2",
        question: "Trường hợp nào sau đây trẻ em ĐƯƠNG NHIÊN có quốc tịch Việt Nam?",
        options: [
          "A. Trẻ sinh ra ở nước ngoài có cả cha và mẹ đều là công dân Việt Nam",
          "B. Trẻ có cha mẹ là người nước ngoài đi du lịch tại Việt Nam sinh con",
          "C. Trẻ sinh ra ở nước ngoài không có cha mẹ là người Việt",
          "D. Trẻ em nước ngoài đến Việt Nam học tập ngắn hạn"
        ],
        correctAnswer: 0,
        explanation: "Theo Điều 15 Luật Quốc tịch, trẻ em sinh ra trong hoặc ngoài lãnh thổ Việt Nam mà khi sinh ra có cả cha và mẹ là công dân Việt Nam thì có quốc tịch Việt Nam.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q9-3",
        question: "Giấy tờ nào dưới đây KHÔNG dùng để chứng minh quốc tịch Việt Nam?",
        options: [
          "A. Giấy khai sinh ghi quốc tịch Việt Nam",
          "B. Thẻ Căn cước công dân Việt Nam",
          "C. Hộ chiếu nước CHXHCN Việt Nam",
          "D. Thẻ mượn sách thư viện trường"
        ],
        correctAnswer: 3,
        explanation: "Thẻ thư viện chỉ là giấy tờ nội bộ trường học, không có giá trị pháp lý chứng minh quốc tịch quốc gia.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q9-4",
        question: "Trẻ sơ sinh bị bỏ rơi tại Việt Nam mà không rõ cha mẹ là ai thì có được mang quốc tịch Việt Nam không?",
        options: [
          "A. Không được mang quốc tịch nào",
          "B. Có quốc tịch Việt Nam theo quy định của pháp luật",
          "C. Bắt buộc phải chờ đến 18 tuổi mới được xét",
          "D. Mang quốc tịch nước ngoài"
        ],
        correctAnswer: 1,
        explanation: "Theo Điều 18 Luật Quốc tịch 2008, trẻ sơ sinh bị bỏ rơi, trẻ em tìm thấy trên lãnh thổ Việt Nam mà không rõ cha mẹ là ai thì có quốc tịch Việt Nam.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q9-5",
        question: "Học sinh lớp 6 là công dân Việt Nam cần làm gì để xứng đáng là người công dân tốt?",
        options: [
          "A. Chăm ngoan, học giỏi, rèn luyện đạo đức, tuân thủ pháp luật và nội quy trường học",
          "B. Chỉ cần lo cho bản thân, không cần quan tâm đến xã hội",
          "C. Vi phạm luật giao thông vì chưa đủ tuổi chịu trách nhiệm",
          "D. Không tham gia các hoạt động tập thể của địa phương"
        ],
        correctAnswer: 0,
        explanation: "Học sinh rèn luyện đạo đức, chăm chỉ học tập và tôn trọng pháp luật là đóng góp thiết thực cho đất nước.",
        sourceBook: "Tổng Hợp"
      }
    ]
  },
  {
    id: 10,
    title: "Bài 10: Quyền, nghĩa vụ cơ bản của công dân và Quyền trẻ em",
    order: 10,
    shortDesc: "Hiểu rõ các quyền Hiến định, nghĩa vụ công dân và 4 nhóm quyền cơ bản của trẻ em.",
    icon: "📜",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    bgColor: "from-indigo-500/10 to-purple-500/10",
    textbookCaseStudies: [
      {
        bookName: "Cánh Diều",
        bookColor: "bg-orange-500 text-white",
        title: "Quyền & nghĩa vụ theo Hiến pháp 2013 và 4 nhóm quyền trẻ em",
        content: "Hiến pháp 2013 quy định: Quyền bất khả xâm phạm về thân thể, danh dự, chỗ ở, thư tín (Điều 20, 21, 22); Quyền bầu cử (18 tuổi), ứng cử (21 tuổi); Quyền tự do kinh doanh, học tập. Luật Trẻ em 2016 quy định 4 nhóm quyền: Sống còn, Bảo vệ, Phát triển, Tham gia và các bổn phận của trẻ em đối với gia đình, nhà trường, xã hội.",
        lessonTakeaway: "Quyền công dân không tách rời nghĩa vụ của công dân. Trẻ em có quyền được yêu thương và có bổn phận hiếu thảo.",
        characterOrEvent: "Hiến pháp 2013 (Chương II) & 4 nhóm quyền Luật Trẻ em 2016"
      },
      {
        bookName: "Chân Trời Sáng Tạo",
        bookColor: "bg-sky-500 text-white",
        title: "Chị Thanh du học Nhật về khởi nghiệp & Làng Hòa Bình nuôi dưỡng trẻ em",
        content: "Chị Thanh du học nông nghiệp tại Nhật Bản trở về quê hương khởi nghiệp mô hình rau sạch, thực hiện quyền tự do kinh doanh và nghĩa vụ đóng thuế, bảo vệ môi trường. Làng Hòa Bình (Bệnh viện Từ Dũ) cưu mang nuôi dưỡng trẻ em nhiễm chất độc da cam, đảm bảo quyền sống còn và chăm sóc y tế tốt nhất.",
        lessonTakeaway: "Thực hiện quyền tự do phải đi đôi với trách nhiệm công dân và tinh thần sẻ chia bảo vệ trẻ em.",
        characterOrEvent: "Chị Thanh khởi nghiệp nông nghiệp sạch & Làng Hòa Bình Từ Dũ"
      },
      {
        bookName: "Kết Nối Tri Thức",
        bookColor: "bg-emerald-600 text-white",
        title: "Bức thư xin không thả bóng bay ngày khai giảng & Bổn phận 5 điều Bác Hồ dạy",
        content: "Năm học 2018-2019, một bạn học sinh lớp 6 ở Hà Nội đã dũng cảm viết thư gửi thầy Hiệu trưởng đề nghị không thả bóng bay trong lễ khai giảng để bảo vệ loài rùa biển và môi trường sinh thái. Bức thư thể hiện xuất sắc Quyền tham gia của trẻ em trong việc đóng góp ý kiến vì cộng đồng.",
        lessonTakeaway: "Trẻ em có quyền bày tỏ ý kiến, nguyện vọng và được người lớn tôn trọng, lắng nghe.",
        characterOrEvent: "Bức thư của bạn nhỏ xin dừng thả bóng bay bảo vệ môi trường"
      }
    ],
    intro: {
      title: "Khởi động: Bức thư lay động dư luận của học sinh lớp 6",
      scenario: "Bức thư gửi ban giám hiệu trường đề xuất dừng thả bóng bay cao su ngày khai giảng đã lan tỏa thông điệp bảo vệ động vật biển và rác thải nhựa khắp cả nước.",
      question: "Theo em, bạn học sinh đó đã thực hiện nhóm quyền nào của trẻ em? Học sinh lớp 6 có quyền đóng góp ý kiến cho nhà trường không?",
      suggestedThought: "Đó là quyền tham gia và quyền được sống trong môi trường trong lành được pháp luật bảo vệ."
    },
    knowledge: {
      sectionTitle: "Khám phá kiến thức trọng tâm (Chuẩn 3 bộ SGK)",
      keyPoints: [
        {
          heading: "1. Quyền và nghĩa vụ cơ bản của công dân (Hiến pháp 2013)",
          content: "- Quyền chính trị: Quyền bầu cử (từ đủ 18 tuổi), ứng cử (từ đủ 21 tuổi), tham gia quản lý nhà nước.\n- Quyền dân sự: Quyền sống, bất khả xâm phạm thân thể, danh dự, nhân phẩm, bí mật thư tín, tự do cư trú.\n- Quyền kinh tế: Tự do kinh doanh, sở hữu tài sản hợp pháp.\n- Quyền văn hóa - xã hội: Quyền học tập, nghiên cứu khoa học, chăm sóc sức khỏe.\n- Nghĩa vụ cơ bản: Trung thành với Tổ quốc, bảo vệ Tổ quốc (nghĩa vụ quân sự), tuân theo Hiến pháp và pháp luật, nộp thuế, bảo vệ môi trường.",
          example: "Chị Thanh thực hiện quyền kinh doanh và nghĩa vụ nộp thuế đầy đủ.",
          icon: "🏛️"
        },
        {
          heading: "2. Bốn nhóm quyền cơ bản của trẻ em (Luật Trẻ em 2016)",
          content: "1. Nhóm quyền Sống còn: Quyền được sống, khai sinh, chăm sóc sức khỏe, nuôi dưỡng.\n2. Nhóm quyền Bảo vệ: Được bảo vệ khỏi bạo lực, bóc lột sức lao động, xâm hại tình dục, bỏ rơi.\n3. Nhóm quyền Phát triển: Được học tập, vui chơi giải trí, phát triển năng khiếu nghệ thuật, tiếp cận thông tin.\n4. Nhóm quyền Tham gia: Được bày tỏ ý kiến, nguyện vọng về các vấn đề liên quan đến trẻ em.",
          example: "Bức thư đề xuất không thả bóng bay là biểu hiện tuyệt vời của Quyền tham gia.",
          icon: "👶"
        },
        {
          heading: "3. Bổn phận của trẻ em",
          content: "- Đối với gia đình: Kính trọng, hiếu thảo với ông bà cha mẹ, giúp đỡ việc nhà.\n- Đối với nhà trường: Tôn trọng thầy cô giáo, chăm chỉ học tập, chấp hành nội quy.\n- Đối với xã hội: Tôn trọng người lớn tuổi, yêu quê hương đất nước, bảo vệ môi trường.\n- Đối với bản thân: Sống trung thực, khiêm tốn, giữ gìn vệ sinh, không vướng vào tệ nạn xã hội.",
          example: "Thực hiện tốt 5 điều Bác Hồ dạy thiếu niên, nhi đồng.",
          icon: "⭐"
        }
      ]
    },
    summary: [
      "Quyền công dân luôn gắn liền với nghĩa vụ công dân theo Hiến pháp 2013.",
      "4 nhóm quyền cơ bản của trẻ em: Sống còn, Bảo vệ, Phát triển, Tham gia (Luật Trẻ em 2016).",
      "Gia đình, nhà trường và toàn xã hội có trách nhiệm bảo đảm cho trẻ em được hưởng trọn vẹn các quyền.",
      "Trẻ em phải thực hiện tốt bổn phận của mình đối với gia đình, nhà trường, xã hội và chính bản thân."
    ],
    mindmap: {
      centerTitle: "Quyền, nghĩa vụ công dân & Quyền trẻ em",
      nodes: [
        {
          id: "m10-1",
          label: "Hiến pháp 2013",
          color: "border-indigo-400 bg-indigo-50 text-indigo-900",
          children: [
            { id: "c10-1", label: "Quyền chính trị, dân sự, kinh tế, văn hóa" },
            { id: "c10-2", label: "Nghĩa vụ: Trung thành Tổ quốc, nộp thuế, bảo vệ môi trường" },
            { id: "c10-3", label: "Mọi người đều bình đẳng trước pháp luật" }
          ]
        },
        {
          id: "m10-2",
          label: "4 Nhóm quyền trẻ em",
          color: "border-blue-400 bg-blue-50 text-blue-900",
          children: [
            { id: "c10-4", label: "1. Quyền Sống còn (khai sinh, y tế, dinh dưỡng)" },
            { id: "c10-5", label: "2. Quyền Bảo vệ (chống bạo lực, bóc lột, xâm hại)" },
            { id: "c10-6", label: "3. Quyền Phát triển (học tập, vui chơi, nghệ thuật)" },
            { id: "c10-7", label: "4. Quyền Tham gia (bày tỏ ý kiến, đối thoại)" }
          ]
        },
        {
          id: "m10-3",
          label: "Bổn phận trẻ em",
          color: "border-emerald-400 bg-emerald-50 text-emerald-900",
          children: [
            { id: "c10-8", label: "Với gia đình: Hiếu thảo, vâng lời ông bà cha mẹ" },
            { id: "c10-9", label: "Với trường lớp: Tôn sư trọng đạo, chấp hành nội quy" },
            { id: "c10-10", label: "Với bản thân: Trung thực, chăm rèn luyện thân thể" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "q10-1",
        question: "Luật Trẻ em năm 2016 quy định quyền cơ bản của trẻ em được phân chia thành mấy nhóm quyền?",
        options: [
          "A. 2 nhóm quyền",
          "B. 3 nhóm quyền",
          "C. 4 nhóm quyền (Sống còn, Bảo vệ, Phát triển, Tham gia)",
          "D. 6 nhóm quyền"
        ],
        correctAnswer: 2,
        explanation: "Luật Trẻ em 2016 và Công ước LHQ 1989 phân chia thành 4 nhóm quyền cơ bản: Sống còn, Bảo vệ, Phát triển và Tham gia.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q10-2",
        question: "Việc một học sinh lớp 6 viết thư gửi thầy Hiệu trưởng đề xuất không thả bóng bay ngày khai giảng để bảo vệ môi trường thể hiện nhóm quyền nào?",
        options: [
          "A. Nhóm quyền Tham gia (được bày tỏ ý kiến, nguyện vọng về các vấn đề xã hội)",
          "B. Nhóm quyền Sống còn",
          "C. Quyền sở hữu tài sản",
          "D. Quyền tự do kinh doanh"
        ],
        correctAnswer: 0,
        explanation: "Bày tỏ ý kiến, đề xuất giải pháp bảo vệ môi trường với nhà trường là biểu hiện tiêu biểu của Quyền tham gia của trẻ em.",
        sourceBook: "Kết Nối Tri Thức"
      },
      {
        id: "q10-3",
        question: "Hành vi nào dưới đây là XÂM PHẠM quyền trẻ em?",
        options: [
          "A. Tổ chức tiêm chủng phòng dịch bệnh miễn phí cho trẻ em",
          "B. Bắt trẻ em nghỉ học sớm để đi bán vé số hoặc lao động nặng nhọc kiếm tiền",
          "C. Tổ chức Tết Trung thu và ngày Quốc tế Thiếu nhi 1/6 cho các cháu",
          "D. Dạy bơi miễn phí cho học sinh vùng lũ"
        ],
        correctAnswer: 1,
        explanation: "Bắt trẻ em bỏ học để lao động kiếm tiền là hành vi bóc lột sức lao động, xâm phạm nghiêm trọng quyền học tập và phát triển của trẻ em.",
        sourceBook: "Chân Trời Sáng Tạo"
      },
      {
        id: "q10-4",
        question: "Theo Hiến pháp 2013, công dân nước CHXHCN Việt Nam đủ bao nhiêu tuổi thì có quyền bầu cử Quốc hội và Hội đồng nhân dân?",
        options: [
          "A. Đủ 16 tuổi",
          "B. Đủ 18 tuổi trở lên",
          "C. Đủ 21 tuổi trở lên",
          "D. Đủ 25 tuổi"
        ],
        correctAnswer: 1,
        explanation: "Theo Điều 27 Hiến pháp 2013, công dân đủ 18 tuổi trở lên có quyền bầu cử và đủ 21 tuổi trở lên có quyền ứng cử.",
        sourceBook: "Cánh Diều"
      },
      {
        id: "q10-5",
        question: "Bổn phận của trẻ em đối với gia đình bao gồm những điều nào sau đây?",
        options: [
          "A. Kính trọng, lễ phép, hiếu thảo với ông bà cha mẹ; học tập tốt và giữ gìn nền nếp gia đình",
          "B. Đòi hỏi bố mẹ phải chu cấp mọi thứ xa xỉ theo ý muốn",
          "C. Không cần làm việc nhà vì còn nhỏ tuổi",
          "D. Tùy ý bỏ nhà đi chơi khi không vừa ý"
        ],
        correctAnswer: 0,
        explanation: "Hiếu thảo, lễ phép, vâng lời và đỡ đần cha mẹ việc nhà là bổn phận thiêng liêng của mỗi người con trong gia đình.",
        sourceBook: "Tổng Hợp"
      }
    ]
  }
];
