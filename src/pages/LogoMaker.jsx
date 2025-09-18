import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PreviewPanel from "./Preview";

export default function BriefBuilder() {
  const [step, setStep] = useState(() =>
    parseInt(sessionStorage.getItem("step") || "1")
  );

  const [company, setCompany] = useState(
    () => sessionStorage.getItem("company") || ""
  );
  const [project, setProject] = useState(
    () => sessionStorage.getItem("project") || ""
  );
  const [tagline, setTagline] = useState(
    () => sessionStorage.getItem("tagline") || ""
  );
  const [industry, setIndustry] = useState(
    () => sessionStorage.getItem("industry") || ""
  );
  const [logos, setLogos] = useState(
    () => sessionStorage.getItem("logos") || ""
  );

  const [fade, setFade] = useState(false);

  const [attributes, setAttributes] = useState(() => {
    try {
      const raw = sessionStorage.getItem("attributes");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      sessionStorage.removeItem("attributes");
      return [];
    }
  });

  const [feelings, setFeelings] = useState(() => {
    try {
      const raw = sessionStorage.getItem("feelings");
      if (!raw) {
        return {
          inspirational: 50,
          modern: 50,
          formal: 50,
          powerful: 50,
          stability: 50,
          belonging: 50,
        };
      }
      return JSON.parse(raw);
    } catch {
      return {
        inspirational: 50,
        modern: 50,
        formal: 50,
        powerful: 50,
        stability: 50,
        belonging: 50,
      };
    }
  });

  useEffect(() => {
    sessionStorage.setItem("attributes", JSON.stringify(attributes));
  }, [attributes]);

  useEffect(() => sessionStorage.setItem("company", company), [company]);
  useEffect(() => sessionStorage.setItem("project", project), [project]);
  useEffect(() => sessionStorage.setItem("tagline", tagline), [tagline]);
  useEffect(() => sessionStorage.setItem("industry", industry), [industry]);
  useEffect(() => sessionStorage.setItem("logos", logos), [logos]);
  useEffect(() => sessionStorage.setItem("step", step.toString()), [step]);
  useEffect(
    () => sessionStorage.setItem("feelings", JSON.stringify(feelings)),
    [feelings]
  );

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 5));
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
              step === 2 ? "max-w-xl" : step === 3 ? "max-w-2xl" : "max-w-xl"
            }`}
          >
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  1. AI prompt writing
                </h3>
                <input
                  type="text"
                  placeholder="Enter your brand name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  2. Brand Identity
                </h3>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-3"
                />
                <input
                  type="text"
                  placeholder="Enter brand tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-3"
                />
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select industry...</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-3">3. Attributes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Innovative",
                    "Minimalist",
                    "Playful",
                    "Professional",
                    "Elegant",
                    "Bold",
                    "Friendly",
                    "Luxury",
                    "Modern",
                    "Classic",
                    "Trustworthy",
                    "Adventurous",
                    "Creative",
                    "Eco-friendly",
                    "Energetic",
                    "Calm",
                    "Dynamic",
                    "Reliable",
                    "Affordable",
                    "Premium",
                    "Tech-driven",
                    "Artistic",
                    "Sophisticated",
                    "Youthful",
                  ].map((attr) => (
                    <label
                      key={attr}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={attributes.includes(attr)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAttributes([...attributes, attr]);
                          } else {
                            setAttributes(attributes.filter((a) => a !== attr));
                          }
                        }}
                      />
                      {attr}
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  4. Logos you like (worldwide)
                </h3>
                <textarea
                  placeholder="Nike, Apple, Google..."
                  value={logos}
                  onChange={(e) => setLogos(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={4}
                />
              </>
            )}

            {step === 5 && (
              <>
                <h3 className="text-lg font-semibold mb-3">5. Feelings</h3>
                {[
                  {
                    key: "inspirational",
                    left: "Inspirational",
                    right: "Comforting",
                  },
                  { key: "modern", left: "Modern", right: "Timeless" },
                  { key: "formal", left: "Formal", right: "Friendly" },
                  { key: "powerful", left: "Powerful", right: "Tender" },
                  {
                    key: "stability",
                    left: "Stability, Control",
                    right: "Risk and Mastery",
                  },
                  {
                    key: "belonging",
                    left: "Belonging & People",
                    right: "Independence & Self-Realization",
                  },
                ].map(({ key, left, right }) => (
                  <div key={key} className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{left}</span>
                      <span>{right}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={feelings[key]}
                      onChange={(e) =>
                        setFeelings({
                          ...feelings,
                          [key]: Number(e.target.value),
                        })
                      }
                      className="w-full accent-indigo-500"
                    />
                  </div>
                ))}
              </>
            )}
          </section>

          <div className="absolute bottom-0 right-0 flex gap-3 p-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Next
            </button>
          </div>
        </div>
      </aside>

      <PreviewPanel
        step={step}
        company={company}
        project={project}
        tagline={tagline}
        industry={industry}
        attributes={attributes}
        logos={logos}
        feelings={feelings}
      />
    </div>
  );
}
