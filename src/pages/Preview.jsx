import { useMemo } from "react";

export default function PreviewPanel({
  step,
  company,
  project,
  tagline,
  industry,
  attributes = [],
  logos = "",
  feelings = null,
  styleLogos = [],
  colors = {},
}) {
  const step1Increment = 11;
  const step2Increment = 11;
  const taglineIncrement = 3;
  const industryIncrement = 3;
  const attributesIncrement = 5;
  const logosIncrement = 5;

  let completionPercent = 0;
  if (company && company.trim() !== "") completionPercent += step1Increment;
  if (project && project.trim() !== "") completionPercent += step2Increment;
  if (tagline && tagline.trim() !== "") completionPercent += taglineIncrement;

  let archetypePercent = 0;
  if (industry && industry.trim() !== "") archetypePercent += industryIncrement;
  if (attributes.length > 0)
    archetypePercent += attributes.length * attributesIncrement;
  if (logos && logos.trim() !== "") archetypePercent += logosIncrement;

  const feelingsActive =
    feelings && Object.values(feelings).some((v) => Number(v) !== 50);
  const feelingsPercent = feelingsActive
    ? Object.values(feelings).reduce(
        (acc, v) => acc + Math.abs(Number(v) - 50) / 10,
        0
      )
    : 0;

  archetypePercent += feelingsPercent;

  const logosList = useMemo(() => {
    if (!logos) return [];
    return logos
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [logos]);

  const styleLogosList = useMemo(() => {
    if (!styleLogos) return [];
    if (Array.isArray(styleLogos)) return styleLogos;
    if (typeof styleLogos === "string") {
      try {
        const parsed = JSON.parse(styleLogos);
        return Array.isArray(parsed)
          ? parsed
          : styleLogos
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
      } catch {
        return styleLogos
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
    return [];
  }, [styleLogos]);

  const shapeEffects = {
    circle: { completion: 8, archetype: 20 },
    triangle: { completion: 5, archetype: -3 },
    eye: { completion: 6, archetype: -6 },
    square: { completion: 7, archetype: 12 },
    curve: { completion: 4, archetype: -8 },
    diamond: { completion: 10, archetype: 18 },
  };

  styleLogosList.forEach((s) => {
    const eff = shapeEffects[s];
    if (eff) {
      completionPercent += eff.completion;
      archetypePercent += eff.archetype;
    }
  });

  if (colors && Object.keys(colors).length > 0) {
    const colorCount = Object.keys(colors).length;
    completionPercent += 20;
    let archetypeBase = 100;
    if (colorCount > 1) {
      archetypeBase -= (colorCount - 1) * 15;
    }
    archetypePercent += Math.max(archetypeBase, 0);
  }

  const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));

  const shapeLabels = {
    circle: "⭕",
    triangle: "▲",
    eye: "👁",
    square: "■",
    curve: "〰️",
    diamond: "◆",
  };

  return (
    <main className="flex-1 h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <section className="p-8 rounded-lg shadow-xl bg-white w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-4">Confidence indicators</h3>

        <p className="mb-2 text-gray-600">Completion of the Brief</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${clamp(completionPercent)}%` }}
          />
        </div>

        <p className="mb-2 text-gray-600">Archetype Matching</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${clamp(archetypePercent)}%` }}
          />
        </div>

        {attributes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Selected Attributes:</h4>
            <div className="flex flex-wrap gap-2">
              {attributes.map((attr) => (
                <span
                  key={attr}
                  className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>
        )}

        {logosList.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Logos you admire:</h4>
            <div className="flex flex-wrap gap-2">
              {logosList.map((logo) => (
                <span
                  key={logo}
                  className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 6 && styleLogosList.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">
              Style logos selected:
            </h4>
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {styleLogosList.map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-center border rounded-md p-3 bg-pink-50 text-pink-700"
                >
                  <span className="text-2xl">{shapeLabels[s] ?? s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && feelings && (
          <div className="mt-6">
            <h4 className="font-semibold text-sm mb-3">Brand Feelings:</h4>
            <div className="space-y-3">
              {Object.entries(feelings).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize text-gray-600">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-gray-600">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && colors && Object.keys(colors).length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-sm mb-3">Selected Colors:</h4>

            <div className="flex gap-3 mb-2">
              {Object.entries(colors).map(([name, hex]) => (
                <div
                  key={name}
                  className="w-10 h-10 rounded-full border shadow"
                  style={{ backgroundColor: hex }}
                  title={`${name}: ${hex}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
