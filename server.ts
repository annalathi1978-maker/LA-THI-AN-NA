import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI assistant endpoint
  app.post("/api/gemini/ask", async (req, res) => {
    try {
      const { lessonTitle, question, context } = req.body;

      if (!question) {
        return res.status(400).json({ error: "Thiếu câu hỏi từ học sinh" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback intelligent response if API key is not yet configured
        return res.json({
          reply: `[Góc Trợ lý GDCD 6]: Chào em! Về nội dung "${lessonTitle || 'bài học'}", lời khuyên dành cho em là: hãy luôn ghi nhớ bài học đạo đức cốt lõi, liên hệ vào những việc làm nhỏ mỗi ngày như giúp đỡ bạn bè, hiếu thảo với cha mẹ và tôn trọng sự thật nhé! Em hãy tiếp tục khám phá các câu hỏi luyện tập và tình huống nhé. ✨`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemPrompt = `Bạn là Trợ lý Giáo dục Công dân lớp 6 ("Hành Trang Công Dân 6") đầy nhiệt huyết, thân thiện, dễ hiểu, chuyên môn cao, dành cho học sinh THCS (11-12 tuổi) tại Việt Nam.
Nhiệm vụ của bạn chỉ tập trung vào:
1. Giải thích các khái niệm GDCD lớp 6 ngắn gọn, dễ nhớ, gần gũi.
2. Đưa ra ví dụ thực tế trong đời sống học sinh (ở nhà, ở trường, trên mạng xã hội).
3. Đặt câu hỏi gợi mở để học sinh tự suy nghĩ và rút ra bài học.
4. Giải thích nếu học sinh chưa hiểu một câu hỏi hoặc tình huống.
LƯU Ý:
- Giọng điệu ấm áp, khen ngợi, khuyến khích (xưng 'Thầy/Cô Trợ lý' hoặc 'Anh/Chị Trợ lý GDCD' và gọi học sinh là 'em').
- Dùng tiếng Việt trong sáng, câu từ ngắn gọn, thêm vài emoji sinh động (🌱, 💡, ⭐, 📚).
- Không trả lời nội dung ngoài phạm vi đạo đức, pháp luật, kỹ năng sống lớp 6.`;

      const userPrompt = `Bài học: ${lessonTitle || 'Môn GDCD 6'}
Bối cảnh kiến thức bài: ${context || ''}
Câu hỏi của học sinh lớp 6: "${question}"

Hãy trả lời thật súc tích, dễ hiểu (dưới 200 từ), có ví dụ thực tế và lời khuyên tích cực.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Em hãy nhớ vận dụng kiến thức bài học vào thực tế hàng ngày nhé!";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "Không thể kết nối với AI trợ lý lúc này. Hãy thử lại sau nhé!",
        reply: "Rất tiếc trợ lý đang bận một chút. Em có thể đọc phần Ghi nhớ và Sơ đồ kiến thức của bài để tìm câu trả lời nhé!"
      });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Hành Trang Công Dân 6" });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hành Trang Công Dân 6 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
