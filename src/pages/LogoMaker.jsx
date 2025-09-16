import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PreviewPanel from "./Preview";

export default function BriefBuilder() {
  const [step, setStep] = useState(
    () => parseInt(localStorage.getItem("step")) || 1
  );
  const [company, setCompany] = useState(
    () => localStorage.getItem("company") || ""
  );
  const [project, setProject] = useState(
    () => localStorage.getItem("project") || ""
  );
  const [competitor1, setCompetitor1] = useState(
    () => localStorage.getItem("competitor1") || ""
  );
  const [competitor2, setCompetitor2] = useState(
    () => localStorage.getItem("competitor2") || ""
  );
  const [fade, setFade] = useState(false);

  useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);
  useEffect(() => {
    localStorage.setItem("project", project);
  }, [project]);
  useEffect(() => {
    localStorage.setItem("competitor1", competitor1);
  }, [competitor1]);
  useEffect(() => {
    localStorage.setItem("competitor2", competitor2);
  }, [competitor2]);
  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 3));
      setFade(false);
    }, 500);
  };

  const handleBack = () => {
    setFade(true);
    setTimeout(() => {
      setStep((prev) => Math.max(prev - 1, 1));
      setFade(false);
    }, 500);
  };

  return (
    <div className="flex h-screen relative">
      <aside className="w-160 bg-white shadow-lg p-6 flex flex-col relative">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent hover:opacity-90 transition"
        >
          🎨 LogoMaker
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 relative">
          <section
            className={`bg-gray-50 p-6 rounded-lg shadow-md w-full transition-opacity duration-500 ${
              fade ? "opacity-0" : "opacity-100"
            } ${
              step === 2 ? "max-w-xl" : step === 3 ? "max-w-2xl" : "max-w-md"
            }`}
          >
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  1. Название компании / Проекта
                </h3>
                <input
                  type="text"
                  placeholder="Введите название вашего бренда"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {company && (
                  <p className="mt-2 text-sm text-gray-600 font-light">
                    Привет, {company}! Давайте создадим ваш идеальный логотип.
                  </p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-3">2. О компании</h3>
                <p className="text-sm font-light leading-normal mb-2">
                  Для чего существует ваш бренд? Что он стремится достичь в
                  мире?
                </p>
                <input
                  type="text"
                  placeholder="Наша миссия - ...."
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-3">3. Конкуренты</h3>
                <p className="text-sm font-light leading-normal mb-2">
                  Укажите 2-3 конкурентов, чтобы найти вашу уникальную нишу.
                </p>
                <input
                  type="text"
                  placeholder="Конкурент 1"
                  value={competitor1}
                  onChange={(e) => setCompetitor1(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  placeholder="Конкурент 2"
                  value={competitor2}
                  onChange={(e) => setCompetitor2(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          </section>

          <div className="absolute bottom-0 right-0 flex gap-3 p-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Next
            </button>
          </div>
        </div>
      </aside>

      <PreviewPanel
        company={company}
        project={project}
        competitor1={competitor1}
        competitor2={competitor2}
      />
    </div>
  );
}
