import { useState } from "react";

export default function ValveControl() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-semibold">Valve Control</h3>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-2 rounded-lg font-semibold ${
          isOpen ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isOpen ? "Valve Open" : "Valve Closed"}
      </button>
    </div>
  );
}
