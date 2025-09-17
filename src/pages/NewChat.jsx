import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslator } from "../hooks/useTranslator";

export default function NewChat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const result = location.state?.result || "❌ Not Found";

  const aiAnswerText = useTranslator("AI Answer");
  const newPromptText = useTranslator("New Prompt");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + result.charAt(i));
      i++;
      if (i >= result.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-indigo-600 mb-4">
          🤖 {aiAnswerText}:
        </h2>

        <div className="bg-gray-100 rounded-xl p-4 text-left shadow-inner">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {displayedText}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
        >
          🔙 {newPromptText}
        </button>
      </motion.div>
    </div>
  );
}
