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

  const [fade, setFade] = useState(false);

  const [attributes, setAttributes] = useState(() => {
    try {
      const raw = sessionStorage.getItem("attributes");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Failed to parse attributes from sessionStorage:", err);
      sessionStorage.removeItem("attributes");
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("attributes", JSON.stringify(attributes));
    } catch (err) {
      console.error("Failed to save attributes to sessionStorage:", err);
    }
  }, [attributes]);

  useEffect(() => sessionStorage.setItem("company", company), [company]);
  useEffect(() => sessionStorage.setItem("project", project), [project]);
  useEffect(() => sessionStorage.setItem("tagline", tagline), [tagline]);
  useEffect(() => sessionStorage.setItem("industry", industry), [industry]);
  useEffect(() => sessionStorage.setItem("step", step.toString()), [step]);

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
                  1. AI prompt writing
                </h3>
                <p className="text-sm font-light leading-normal mb-2">
                  Hints that include: Mission, target audience, auditorium,
                  contestants,
                </p>
                <input
                  type="text"
                  placeholder="Enter your brand name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {company && (
                  <p className="mt-2 text-sm text-gray-600 font-light">
                    Hello, {company}! Let’s create your perfect logo.
                  </p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  2. Brand Identity
                </h3>

                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block text-sm font-medium mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="Enter brand tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select industry...</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="luxury">Luxury</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="other">Other...</option>
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-3">3. Attributes</h3>
                <p className="text-sm font-light leading-normal mb-2">
                  Select the attributes that best describe your brand.
                </p>

                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
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
                        className="rounded text-indigo-500 focus:ring-indigo-500"
                      />
                      {attr}
                    </label>
                  ))}
                </div>
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
        tagline={tagline}
        industry={industry}
        attributes={attributes}
      />
    </div>
  );
}
