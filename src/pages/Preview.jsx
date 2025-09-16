export default function PreviewPanel({
  company,
  project,
  competitor1,
  competitor2,
}) {
  const step1Increment = 11;
  const step2Increment = 11;
  const step3Increment = 2;

  let completionPercent = 0;

  if (company && company.trim() !== "") completionPercent += step1Increment;
  if (project && project.trim() !== "") completionPercent += step2Increment;
  if (competitor1 && competitor1.trim() !== "")
    completionPercent += step3Increment;
  if (competitor2 && competitor2.trim() !== "")
    completionPercent += step3Increment;

  return (
    <main className="flex-1 h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <section className="p-8 rounded-lg shadow-xl bg-white w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-4">Индикаторы уверенности</h3>

        <p className="mb-2 text-gray-600">Завершение брифа</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          ></div>
        </div>

        <p className="mb-2 text-gray-600">Соответствие архетипу</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: "0%" }}
          ></div>
        </div>
      </section>
    </main>
  );
}
