import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslator } from "../hooks/useTranslator";

export default function Hero3D() {
  const navigate = useNavigate();

  const welcome = useTranslator("Xush kelibsiz");
  const builder = useTranslator("Logo yaratuvchi");
  const description = useTranslator(
    "Interaktiv vositalar va sun'iy intellekt yordamida logotipingizni bir necha qadamda yarating."
  );
  const buttonText = useTranslator("Boshlash 🚀");
  const scrollText = useTranslator("Pastga suring");

  const shapes = [
    { type: "circle", color: "bg-pink-400/30", size: "w-24 h-24", top: "20%", left: "10%" },
    { type: "circle", color: "bg-yellow-400/30", size: "w-16 h-16", top: "40%", left: "80%" },
    { type: "square", color: "bg-indigo-400/30", size: "w-20 h-20", top: "70%", left: "25%" },
    { type: "line", color: "bg-green-400/30", size: "w-1 h-32", top: "30%", left: "50%" },
    { type: "triangle", color: "border-b-[60px] border-b-purple-400/30 border-x-[30px] border-x-transparent", top: "60%", left: "70%" },
  ];

  return (
    <section className="relative h-[calc(100vh-64px)] flex justify-center items-center text-center overflow-hidden bg-gray-900">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size || ""} ${shape.color} ${
            shape.type === "circle" ? "rounded-full" : shape.type === "square" ? "" : ""
          }`}
          style={{ top: shape.top, left: shape.left }}
          initial={{ y: 0, opacity: 0.5, rotate: 0 }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "triangle" && <div className={shape.size}></div>}
        </motion.div>
      ))}

      <div className="relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {welcome}{" "}
          <motion.span
            className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {builder}
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {description}
        </motion.p>

        <motion.button
          onClick={() => navigate("/logo-maker")}
          className="mt-10 px-12 py-4 bg-white cursor-pointer text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition text-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-8 text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="block text-sm">{scrollText}</span>
        <motion.div
          className="mx-auto mt-2 w-2 h-2 rounded-full bg-white/80"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
