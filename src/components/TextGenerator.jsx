import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/generate", {
        prompt,
      });

      const data = res.data;
      const finalText =
        data?.result ?? data?.text ?? data?.message ?? String(data);

      navigate("/new-chat", { state: { result: finalText } });
    } catch (error) {
      console.error("Generate error:", error);
      navigate("/new-chat", { state: { result: "❌ Xatolik yuz berdi" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto text-center relative z-10 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-8 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent leading-[1.2]"
        >
          AI Text Generator
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100"
        >
          <textarea
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-4 text-gray-700"
            rows={5}
            placeholder="O‘zingizning promptingizni yozing..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
          >
            {loading ? "⏳ Generating..." : "✨ Generate Text"}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/20 blur-3xl rounded-full"
      />
    </section>
  );
}
