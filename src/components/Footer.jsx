import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useTranslator } from "../hooks/useTranslator";

export default function Footer() {
  const homeText = useTranslator("Home");
  const aboutText = useTranslator("About");
  const servicesText = useTranslator("Services");
  const contactText = useTranslator("Contact");
  const rightsText = useTranslator("All rights reserved.");

  const links = [homeText, aboutText, servicesText, contactText];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-white mt-32 relative overflow-hidden"
    >
      <div className="container bg-gray-900 mx-auto text-center space-y-8 px-6 py-10 relative z-10">
        <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          LogoMaker
        </h2>

        <ul className="flex justify-center gap-10 text-base font-medium">
          {links.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, color: "#FFD700" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              {link}
            </motion.li>
          ))}
        </ul>

        <div className="flex justify-center gap-8">
          {[Facebook, Twitter, Instagram].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="hover:text-yellow-300 transition"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>

        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} LogoMaker. {rightsText}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-300/20 rounded-full blur-3xl"
      />
    </motion.footer>
  );
}
