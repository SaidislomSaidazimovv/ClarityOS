import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text";

    res.json({ result: text });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
