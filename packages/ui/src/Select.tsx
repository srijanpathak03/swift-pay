"use client";

export const Select = ({
  options,
  onSelect,
  label,
}: {
  options: { key: string; value: string }[];
  onSelect: (value: string) => void;
  label?: string;
}) => {
  return (
    <div className="pt-2">
      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="bg-dark-200 border border-dark-300 text-slate-100 text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-full p-2.5 transition-all duration-200"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
