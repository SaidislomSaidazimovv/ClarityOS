import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [briefs, setBriefs] = useState([]);

  useEffect(() => {
    const admin = localStorage.getItem("currentAdmin");
    if (!admin) {
      alert("Faqat admin kirishi mumkin ❌");
      navigate("/login");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("briefs") || "[]");
    setBriefs(saved);
  }, [navigate]);

  const handleDelete = (index) => {
    const updated = briefs.filter((_, i) => i !== index);
    localStorage.setItem("briefs", JSON.stringify(updated));
    setBriefs(updated);
  };

  return (
    <div className="container mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {briefs.length === 0 ? (
        <p className="text-gray-600">Hali hech qanday faoliyat yo‘q.</p>
      ) : (
        <ul className="space-y-6">
          {briefs.map((b, i) => (
            <li
              key={i}
              className="p-6 border rounded-lg shadow bg-white text-gray-800"
            >
              <h3 className="font-bold text-lg mb-2">🏢 {b.company}</h3>
              <p>👤 User: {b.user}</p>
              <p>💡 Slogan: {b.slogan}</p>

              <div className="mt-2">
                <p className="font-medium">🎨 Colors:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.isArray(b.colors) &&
                    b.colors.map((c, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border shadow"
                        style={{ backgroundColor: c }}
                        title={c}
                      ></div>
                    ))}
                  {b.customColor && (
                    <div
                      className="w-8 h-8 rounded-full border shadow"
                      style={{ backgroundColor: b.customColor }}
                      title={b.customColor}
                    ></div>
                  )}
                  {b.customCode && (
                    <span className="px-2 py-1 text-sm border rounded bg-gray-100">
                      {b.customCode}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2">✨ Style: {b.style}</p>
              <p>📝 Description: {b.description}</p>

              {b.file?.data && (
                <div className="mt-4">
                  <p>
                    <strong>📂 File:</strong> {b.file.name}
                  </p>
                  {b.file.data.startsWith("data:image") && (
                    <img
                      src={b.file.data}
                      alt="preview"
                      className="mt-2 max-h-40 rounded-lg border"
                    />
                  )}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>⏰ Time: {b.time || "Noma’lum"}</p>
                <p>📍 Location: {b.location || "Noma’lum"}</p>
                <p>🔢 Usage Count: {b.usageCount || 1}</p>
                <p>📌 Status: {b.status || "Draft"}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDelete(i)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
