import { useEffect, useState } from "react";
import { translations } from "../translations";

export function useTranslator(text) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ru");
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const t = translations[text]?.[lang] || text;
    setTranslated(t);

    const listener = () => {
      const newLang = localStorage.getItem("lang") || "ru";
      setLang(newLang);
    };

    window.addEventListener("langChange", listener);
    return () => window.removeEventListener("langChange", listener);
  }, [lang, text]);

  return translated;
}
