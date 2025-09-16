import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cabinet() {
  const navigate = useNavigate();
  const [approvedBriefs, setApprovedBriefs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
      return;
    }

    const briefs = JSON.parse(localStorage.getItem("briefs") || "[]");
    const filtered = briefs.filter(
      (b) => b.user === user.email && b.status === "Approved"
    );
    setApprovedBriefs(filtered);
  }, [navigate]);

  return (
    <div className="container mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-6">My Approved Logos</h2>
      {approvedBriefs.length === 0 ? (
        <p className="text-gray-600">
          Sizda hali tasdiqlangan zakazlar yo‘q ❌. Iltimos admin tasdiqlashini kuting.
        </p>
      ) : (
        <ul className="space-y-4">
          {approvedBriefs.map((b, i) => (
            <li
              key={i}
              className="p-4 border rounded-lg shadow bg-white/5 text-gray-800"
            >
              <h3 className="font-bold text-lg">🏢 {b.company}</h3>
              <p>💡 Slogan: {b.slogan}</p>
              <p>🎨 Colors: {b.colors}</p>
              <p>✨ Style: {b.style}</p>
              <p>📝 Description: {b.description}</p>
              <p className="text-green-600 font-semibold mt-2">
                ✅ Approved by Admin
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
