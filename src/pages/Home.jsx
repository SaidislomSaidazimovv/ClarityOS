import Hero3D from "../components/Hero3d";
import { motion } from "framer-motion";
import { Sparkles, Zap, Eye } from "lucide-react";
import { useTranslator } from "../hooks/useTranslator";
import { useState } from "react";
import axios from "axios";
import TextGenerator from "../components/TextGenerator";

export default function Home() {
  const whyChooseUs = useTranslator("Why Choose Us?");
  const whyDesc = useTranslator(
    "Our platform helps you bring your creative ideas to life with easy-to-use tools, AI-powered suggestions, and real-time previews."
  );

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/api/generate", {
        prompt,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("❌ Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
      title: useTranslator("AI Suggestions"),
      desc: useTranslator(
        "Smart recommendations that instantly adapt to your vision."
      ),
      color: "from-indigo-500/10 to-purple-500/10",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-400" />,
      title: useTranslator("Fast & Easy"),
      desc: useTranslator(
        "Build your logo in minutes with our smooth workflow."
      ),
      color: "from-yellow-400/10 to-orange-400/10",
    },
    {
      icon: <Eye className="w-12 h-12 text-pink-500" />,
      title: useTranslator("Live Preview"),
      desc: useTranslator(
        "See changes in real time with interactive preview."
      ),
      color: "from-pink-500/10 to-purple-500/10",
    },
  ];

  return (
    <main>
      <Hero3D />

      <TextGenerator />

      <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6 
             bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
             bg-clip-text text-transparent leading-[1.2] pb-1"
          >
            {whyChooseUs}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
          >
            {whyDesc}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                }}
                className={`rounded-2xl bg-gradient-to-br ${card.color} p-8 shadow-lg backdrop-blur-sm cursor-pointer transition`}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="mb-6 flex justify-center"
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>
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
    </main>
  );
}
