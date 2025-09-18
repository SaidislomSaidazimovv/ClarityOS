// export default function PreviewPanel({
//   step,
//   company,
//   project,
//   tagline,
//   industry,
//   attributes,
//   logos,
//   feelings,
// }) {
//   const step1Increment = 11;
//   const step2Increment = 11;
//   const taglineIncrement = 3;
//   const industryIncrement = 3;
//   const attributesIncrement = 5;
//   const logosIncrement = 5;
//   const feelingsIncrement = 5;

//   let completionPercent = 0;
//   let archetypePercent = 0;

//   if (company && company.trim() !== "") completionPercent += step1Increment;
//   if (project && project.trim() !== "") completionPercent += step2Increment;
//   if (tagline && tagline.trim() !== "") completionPercent += taglineIncrement;

//   if (industry && industry.trim() !== "") archetypePercent += industryIncrement;
//   if (attributes.length > 0)
//     archetypePercent += attributes.length * attributesIncrement;
//   if (logos && logos.trim() !== "") archetypePercent += logosIncrement;
//   if (feelings) archetypePercent += feelingsIncrement;

//   const logosList = logos
//     ? logos.split(",").map((logo) => logo.trim()).filter(Boolean)
//     : [];

//   return (
//     <main className="flex-1 h-screen flex items-center justify-center bg-gray-100 text-gray-900">
//       <section className="p-8 rounded-lg shadow-xl bg-white w-full max-w-3xl">
//         <h3 className="text-lg font-bold mb-4">Confidence indicators</h3>

//         <p className="mb-2 text-gray-600">Completion of the Brief</p>
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//           <div
//             className="bg-green-400 h-2 rounded-full transition-all duration-500"
//             style={{ width: `${completionPercent}%` }}
//           ></div>
//         </div>

//         <p className="mb-2 text-gray-600">Archetype Matching</p>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             className="bg-blue-700 h-2 rounded-full transition-all duration-500"
//             style={{ width: `${archetypePercent}%` }}
//           ></div>
//         </div>

//         {attributes.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold text-sm mb-2">Selected Attributes:</h4>
//             <div className="flex flex-wrap gap-2">
//               {attributes.map((attr) => (
//                 <span
//                   key={attr}
//                   className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full"
//                 >
//                   {attr}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {logosList.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold text-sm mb-2">Logos you admire:</h4>
//             <div className="flex flex-wrap gap-2">
//               {logosList.map((logo) => (
//                 <span
//                   key={logo}
//                   className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
//                 >
//                   {logo}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {step === 5 && feelings && (
//           <div className="mt-6">
//             <h4 className="font-semibold text-sm mb-3">Brand Feelings:</h4>
//             <div className="space-y-3">
//               {Object.entries(feelings).map(([key, value]) => (
//                 <div key={key}>
//                   <div className="flex justify-between text-xs mb-1">
//                     <span className="text-gray-600">{key}</span>
//                     <span className="text-gray-600">{value}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 h-2 rounded-full">
//                     <div
//                       className="h-2 rounded-full bg-pink-500"
//                       style={{ width: `${value}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }


export default function PreviewPanel({
  step,
  company,
  project,
  tagline,
  industry,
  attributes,
  logos,
  feelings,
}) {
  const step1Increment = 11;
  const step2Increment = 11;
  const taglineIncrement = 3;
  const industryIncrement = 3;
  const attributesIncrement = 5;
  const logosIncrement = 5;
  const feelingsIncrement = 5;

  let completionPercent = 0;
  let archetypePercent = 0;

  if (company && company.trim() !== "") completionPercent += step1Increment;
  if (project && project.trim() !== "") completionPercent += step2Increment;
  if (tagline && tagline.trim() !== "") completionPercent += taglineIncrement;

  if (industry && industry.trim() !== "") archetypePercent += industryIncrement;
  if (attributes.length > 0)
    archetypePercent += attributes.length * attributesIncrement;
  if (logos && logos.trim() !== "") archetypePercent += logosIncrement;
  // if (step === 5 && feelings) archetypePercent += feelingsIncrement;

  const logosList = logos
    ? logos.split(",").map((logo) => logo.trim()).filter(Boolean)
    : [];

  return (
    <main className="flex-1 h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <section className="p-8 rounded-lg shadow-xl bg-white w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-4">Confidence indicators</h3>

        <p className="mb-2 text-gray-600">Completion of the Brief</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          ></div>
        </div>

        <p className="mb-2 text-gray-600">Archetype Matching</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-700 h-2 rounded-full transition-all duration-500"
            style={{ width: `${archetypePercent}%` }}
          ></div>
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

        {step === 5 && feelings && (
          <div className="mt-6">
            <h4 className="font-semibold text-sm mb-3">Brand Feelings:</h4>
            <div className="space-y-3">
              {Object.entries(feelings).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
