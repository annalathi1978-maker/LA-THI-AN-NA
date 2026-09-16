// Đáp án chuẩn dành riêng cho Giáo viên & Hệ thống chấm điểm tự động
// Môn: Giáo dục Công dân 6 - Bài 1: Tự hào về truyền thống gia đình, dòng họ

export interface Lesson1AnswerKey {
  q1: {
    correctIds: string[]; // Các truyền thống tốt đẹp
    wrongIds: string[]; // Các hành vi không phải truyền thống tốt đẹp
    keywordHint: string;
  };
  q2: {
    correctOption: string; // "B"
    correctIndex: number; // 1
    evidenceKeywords: string[];
    explanation: string;
  };
  q3: {
    pairs: Record<string, string>; // { "1": "b", "2": "c", "3": "a", "4": "d" }
    explanation: string;
  };
  q4: {
    blanks: string[]; // ["tự hào", "truyền thống", "kinh nghiệm", "sức mạnh"] hoặc ["tự hào", "truyền thống", "sức mạnh", "kinh nghiệm"]
    explanation: string;
  };
  q5: {
    correctAnswer: boolean; // false ("Sai")
    explanation: string;
    keywords: string[];
  };
  q6: {
    correctOption: string; // "C"
    correctIndex: number; // 2
    explanation: string;
  };
  q7: {
    shouldDo: number[]; // [1, 2, 4, 6]
    shouldNotDo: number[]; // [3, 5]
    explanation: string;
  };
  q8: {
    correctOption: string; // "C"
    correctIndex: number; // 2
    mustTopStudentAnswer: boolean; // false ("Không nhất thiết phải đứng đầu lớp")
    explanation: string;
  };
  q9: {
    agree: boolean; // false ("Không đồng ý")
    explanation: string;
    keywords: string[];
  };
  q10: {
    suggestedKeywords: string[];
    minKeywordsCount: number;
    sentenceGuidance: string;
  };
  mindmap: {
    branch1: string[];
    branch2: string[];
    branch3: string[];
  };
  teacherNote: string;
}

export const LESSON_1_OFFICIAL_ANSWER_KEY: Lesson1AnswerKey = {
  q1: {
    correctIds: ['hieu_hoc', 'hieu_thao', 'can_cu', 'yeu_thuong', 'giu_nghe', 'yeu_nuoc'],
    wrongIds: ['khoe_khoang', 'coi_thuong'],
    keywordHint: "Hiếu học, hiếu thảo, cần cù lao động, yêu thương con người, giữ nghề truyền thống, yêu nước."
  },
  q2: {
    correctOption: "B",
    correctIndex: 1,
    evidenceKeywords: ["quan tâm việc học", "tới trường", "thành tích cao", "học tập", "đóng góp"],
    explanation: "Dòng họ Đặng ở Sơn La có truyền thống Hiếu học. Chi tiết chứng minh: Luôn quan tâm việc học của con em, trẻ em đến tuổi đều được tới trường, nhiều người đạt thành tích cao trong học tập và trưởng thành đóng góp cho quê hương."
  },
  q3: {
    pairs: {
      "1": "b", // 1. Tự hào về truyền thống -> b. Thể hiện sự trân trọng, biết ơn
      "2": "c", // 2. Noi gương người thân -> c. Có thêm động lực vượt khó
      "3": "a", // 3. Giữ gìn nền nếp tốt đẹp -> a. Gia đình thêm đoàn kết, đầm ấm
      "4": "d"  // 4. Tiếp nối truyền thống -> d. Làm phong phú truyền thống, bản sắc
    },
    explanation: "Nối đúng chuẩn: 1–b; 2–c; 3–a; 4–d."
  },
  q4: {
    blanks: ["tự hào", "truyền thống", "kinh nghiệm", "sức mạnh"],
    explanation: "Hiểu biết và TỰ HÀO về TRUYỀN THỐNG gia đình, dòng họ giúp chúng ta có thêm KINH NGHIỆM và SỨC MẠNH trong cuộc sống."
  },
  q5: {
    correctAnswer: false, // Sai
    explanation: "Sai. Truyền thống tốt đẹp đáng tự hào xuất phát từ đạo đức, nhân cách, sự cần cù, hiếu học, yêu thương... chứ hoàn toàn không phụ thuộc vào việc gia đình giàu hay nghèo.",
    keywords: ["đạo đức", "không phụ thuộc", "giàu", "nghèo", "giá trị", "phẩm chất", "hiếu học", "yêu thương", "cần cù"]
  },
  q6: {
    correctOption: "C",
    correctIndex: 2,
    explanation: "Đáp án C: Bạn Mai tự giác học tập, khắc phục môn còn yếu và giúp em nhỏ cùng học. Phát huy truyền thống phải bằng hành động cụ thể, nỗ lực của bản thân chứ không phải chỉ khoe khoang hay nói suông."
  },
  q7: {
    shouldDo: [1, 2, 4, 6],
    shouldNotDo: [3, 5],
    explanation: "NÊN: 1 (Hỏi ông bà), 2 (Cố gắng học tập), 4 (Học hỏi kinh nghiệm tốt từ cha mẹ), 6 (Giới thiệu nét đẹp gia đình). KHÔNG NÊN: 3 (Chê nghề truyền thống là quê), 5 (Chỉ khoe thành tích nhưng bản thân không cố gắng)."
  },
  q8: {
    correctOption: "C",
    correctIndex: 2,
    mustTopStudentAnswer: false,
    explanation: "Đáp án C: Tìm nguyên nhân mình học chưa tốt, lập kế hoạch và cố gắng tiến bộ. Không nhất thiết phải luôn đứng đầu lớp, điều quan trọng nhất là tinh thần ham học, ý chí vươn lên và ngày càng tiến bộ hơn chính mình hôm qua."
  },
  q9: {
    agree: false,
    explanation: "Không đồng ý với Lan. Lời nói chỉ là tự hào ban đầu, muốn phát huy truyền thống cần có hành động thực tế như: học hỏi công thức làm bánh, phụ giúp cha mẹ lúc rảnh rỗi, tìm cách giới thiệu quảng bá bánh sạch ngon đến bạn bè.",
    keywords: ["hành động", "học hỏi", "phụ giúp", "làm bánh", "quảng bá", "giới thiệu", "thực tế", "không chỉ nói"]
  },
  q10: {
    suggestedKeywords: ["hiếu học", "hiếu thảo", "truyền thống", "tự hào", "kinh nghiệm", "sức mạnh", "giữ gìn", "cần cù"],
    minKeywordsCount: 3,
    sentenceGuidance: "Học sinh dùng từ 3 từ khóa trở lên viết câu hoàn chỉnh về ý thức tự hào và phát huy truyền thống gia đình."
  },
  mindmap: {
    branch1: ["Yêu nước", "Cần cù", "Yêu thương", "Hiếu học", "Hiếu thảo", "Nghề truyền thống"],
    branch2: ["Kinh nghiệm", "Sức mạnh", "Đoàn kết", "Bản sắc"],
    branch3: ["Tìm hiểu", "Tự hào", "Giữ gìn", "Phát huy"]
  },
  teacherNote: "Phiếu bài tập được cấu trúc theo 5 chặng phát triển năng lực: Nhận biết (Chặng 1) → Thông hiểu (Chặng 2) → Bẫy tư duy (Chặng 3) → Xử lý tình huống (Chặng 4) → Vận dụng sáng tạo (Chặng 5). Máy tự động chấm điểm và khóa bài sau khi nộp."
};

export function gradeLesson1Submission(studentAnswers: any): {
  totalScore: number; // 0 - 10
  qScores: Record<string, { score: number; max: number; feedback: string }>;
  isPassed: boolean;
  honorTitle: string;
} {
  const qScores: Record<string, { score: number; max: number; feedback: string }> = {};

  // Câu 1: Săn tìm truyền thống (1.0 điểm)
  const q1Selected: string[] = studentAnswers.q1Selected || [];
  const correctCount = q1Selected.filter(id => LESSON_1_OFFICIAL_ANSWER_KEY.q1.correctIds.includes(id)).length;
  const wrongCount = q1Selected.filter(id => LESSON_1_OFFICIAL_ANSWER_KEY.q1.wrongIds.includes(id)).length;
  let q1Score = Math.max(0, (correctCount / LESSON_1_OFFICIAL_ANSWER_KEY.q1.correctIds.length) - (wrongCount * 0.3));
  q1Score = Math.round(q1Score * 10) / 10;
  qScores['q1'] = {
    score: q1Score,
    max: 1.0,
    feedback: wrongCount === 0 && correctCount >= 5 
      ? 'Chính xác! Em đã nhận diện rất tốt các truyền thống gia đình, dòng họ tốt đẹp.' 
      : 'Em cần chú ý: Khoe khoang giàu có hoặc coi thường người khác không phải là truyền thống tốt đẹp.'
  };

  // Câu 2: Dòng họ Đặng (1.0 điểm: 0.5 trắc nghiệm + 0.5 chi tiết)
  let q2Score = 0;
  if (studentAnswers.q2Choice === 'B') q2Score += 0.5;
  const q2Detail = (studentAnswers.q2Detail || '').toLowerCase();
  const hasKeyword = LESSON_1_OFFICIAL_ANSWER_KEY.q2.evidenceKeywords.some(k => q2Detail.includes(k));
  if (hasKeyword || q2Detail.length >= 15) q2Score += 0.5;
  qScores['q2'] = {
    score: q2Score,
    max: 1.0,
    feedback: q2Score === 1.0 
      ? 'Rất tốt! Dòng họ Đặng nổi bật với truyền thống hiếu học và được chứng minh bằng việc chăm lo con em đến trường.'
      : 'Đáp án đúng là B (Hiếu học) và chi tiết trẻ em được đến trường, nhiều người thành đạt.'
  };

  // Câu 3: Nối cột (1.0 điểm: mỗi cặp 0.25)
  const q3Pairs = studentAnswers.q3Pairs || {};
  let q3Score = 0;
  Object.entries(LESSON_1_OFFICIAL_ANSWER_KEY.q3.pairs).forEach(([left, right]) => {
    if (q3Pairs[left] === right) q3Score += 0.25;
  });
  qScores['q3'] = {
    score: q3Score,
    max: 1.0,
    feedback: q3Score === 1.0 
      ? 'Hoàn hảo! Em đã ghép nối chính xác các giá trị ý nghĩa của truyền thống.' 
      : 'Đáp án chuẩn: 1–b; 2–c; 3–a; 4–d.'
  };

  // Câu 4: Điền từ công thức trí nhớ (1.0 điểm)
  const q4Blanks: string[] = studentAnswers.q4Blanks || [];
  let q4Score = 0;
  const b1 = (q4Blanks[0] || '').toLowerCase().trim();
  const b2 = (q4Blanks[1] || '').toLowerCase().trim();
  const b3 = (q4Blanks[2] || '').toLowerCase().trim();
  const b4 = (q4Blanks[3] || '').toLowerCase().trim();

  if (b1.includes('tự hào')) q4Score += 0.25;
  if (b2.includes('truyền thống')) q4Score += 0.25;
  if (b3.includes('kinh nghiệm') || b3.includes('sức mạnh')) q4Score += 0.25;
  if (b4.includes('sức mạnh') || b4.includes('kinh nghiệm')) q4Score += 0.25;
  qScores['q4'] = {
    score: q4Score,
    max: 1.0,
    feedback: q4Score >= 0.75 
      ? 'Chính xác! Công thức: Tự hào - Truyền thống - Kinh nghiệm - Sức mạnh.' 
      : 'Gợi ý: Hiểu biết và TỰ HÀO về TRUYỀN THỐNG gia đình giúp ta có thêm KINH NGHIỆM và SỨC MẠNH.'
  };

  // Câu 5: Đúng/Sai và giải thích (1.0 điểm: 0.5 đúng sai + 0.5 giải thích)
  let q5Score = 0;
  if (studentAnswers.q5Choice === 'sai') q5Score += 0.5;
  const q5Reason = (studentAnswers.q5Reason || '').toLowerCase();
  if (q5Reason.length >= 10) q5Score += 0.5;
  qScores['q5'] = {
    score: q5Score,
    max: 1.0,
    feedback: studentAnswers.q5Choice === 'sai' 
      ? 'Đúng đắn! Sự tự hào bắt nguồn từ giá trị đạo đức và nỗ lực chứ không phụ thuộc vào tiền tài.' 
      : 'Nhận định của bạn Minh là Sai vì truyền thống tốt đẹp không đo bằng sự giàu có.'
  };

  // Câu 6: Phát huy truyền thống (1.0 điểm)
  let q6Score = 0;
  if (studentAnswers.q6Choice === 'C') q6Score += 0.7;
  if ((studentAnswers.q6Reason || '').trim().length >= 8) q6Score += 0.3;
  qScores['q6'] = {
    score: Math.min(1.0, q6Score),
    max: 1.0,
    feedback: studentAnswers.q6Choice === 'C' 
      ? 'Chính xác! Bạn Mai tự giác học tập và giúp đỡ em nhỏ là hành động thiết thực nhất.' 
      : 'Đáp án đúng là C. Mai hành động thực tế bằng việc học tập chăm chỉ.'
  };

  // Câu 7: Phân loại Nên / Không nên (1.0 điểm: 6 items)
  const q7Should: number[] = studentAnswers.q7Should || [];
  const q7ShouldNot: number[] = studentAnswers.q7ShouldNot || [];
  let q7Score = 0;
  [1, 2, 4, 6].forEach(n => { if (q7Should.includes(n)) q7Score += 0.15; });
  [3, 5].forEach(n => { if (q7ShouldNot.includes(n)) q7Score += 0.2; });
  q7Score = Math.min(1.0, Math.round(q7Score * 10) / 10);
  qScores['q7'] = {
    score: q7Score,
    max: 1.0,
    feedback: q7Score >= 0.9 
      ? 'Phân loại rất chuẩn xác các việc NÊN và KHÔNG NÊN làm!' 
      : 'NÊN: 1, 2, 4, 6. KHÔNG NÊN: 3, 5.'
  };

  // Câu 8: Nếu là Bình (1.0 điểm)
  let q8Score = 0;
  if (studentAnswers.q8Choice === 'C') q8Score += 0.6;
  if ((studentAnswers.q8Reason || '').trim().length >= 8) q8Score += 0.4;
  qScores['q8'] = {
    score: Math.min(1.0, q8Score),
    max: 1.0,
    feedback: studentAnswers.q8Choice === 'C' 
      ? 'Lựa chọn C rất trưởng thành và tích cực: Tìm nguyên nhân và cố gắng vươn lên!' 
      : 'Đáp án là C: Bình cần tìm nguyên nhân và cố gắng thay vì nản lòng hay ghen tị.'
  };

  // Câu 9: Tình huống Lan (1.0 điểm)
  let q9Score = 0;
  if (studentAnswers.q9Agree === 'no') q9Score += 0.4;
  if ((studentAnswers.q9Reason || '').trim().length >= 8) q9Score += 0.3;
  if ((studentAnswers.q9Actions || '').trim().length >= 8) q9Score += 0.3;
  qScores['q9'] = {
    score: Math.min(1.0, q9Score),
    max: 1.0,
    feedback: studentAnswers.q9Agree === 'no' 
      ? 'Rất xuất sắc! Truyền thống cần được tiếp nối bằng việc làm cụ thể của chính mình.' 
      : 'Cần phân biệt giữa nói suông và bắt tay vào học nghề, gìn giữ tinh hoa của gia đình.'
  };

  // Câu 10 & Vận dụng Bản đồ / Tấm vé (1.0 điểm)
  let q10Score = 0;
  if ((studentAnswers.q10Keywords || []).length >= 3) q10Score += 0.4;
  if ((studentAnswers.q10Sentence || '').trim().length >= 10) q10Score += 0.3;
  if ((studentAnswers.ticketPride || '').trim().length >= 5) q10Score += 0.3;
  qScores['q10'] = {
    score: Math.min(1.0, q10Score),
    max: 1.0,
    feedback: q10Score >= 0.7 
      ? 'Tuyệt vời! Em đã hoàn thành trọn vẹn bản đồ bài học và lời cam kết hành động.' 
      : 'Em đã có cố gắng ghi nhớ từ khóa và đưa ra suy nghĩ chân thành.'
  };

  // Tổng điểm trên thang 10
  const totalScore = Math.round(
    Object.values(qScores).reduce((sum, item) => sum + item.score, 0) * 10
  ) / 10;

  let honorTitle = '⭐ CHIẾN BINH TẬP SỰ';
  if (totalScore >= 9.0) honorTitle = '🏆 NGƯỜI GIỮ LỬA GIA ĐÌNH XUẤT SẮC';
  else if (totalScore >= 8.0) honorTitle = '🏅 NGƯỜI TIẾP NỐI TRUYỀN THỐNG';
  else if (totalScore >= 6.5) honorTitle = '🌟 ĐẠI SỨ GIA ĐÌNH CHĂM NGOAN';

  return {
    totalScore,
    qScores,
    isPassed: totalScore >= 5.0,
    honorTitle
  };
}
