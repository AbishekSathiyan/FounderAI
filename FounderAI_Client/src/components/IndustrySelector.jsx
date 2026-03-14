import React from "react";

export default function IndustrySelector({ value, onChange }) {
  const industries = ["Tech", "Fintech", "Healthtech", "E-commerce", "Gaming"];

  return (
    <select
      className="w-full p-3 border rounded-lg mb-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Choose Industry</option>
      {industries.map((industry) => (
        <option key={industry} value={industry}>
          {industry}
        </option>
      ))}
    </select>
  );
}