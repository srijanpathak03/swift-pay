"use client";

export const Textinput = ({
  placeholder,
  onChange,
  label,
  type = "text",
}: {
  placeholder?: string;
  onChange: (value: string) => void;
  label: string;
  type?: string;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        className="bg-dark-200 border border-dark-300 text-slate-100 text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-full p-2.5 placeholder-slate-500 transition-all duration-200"
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
