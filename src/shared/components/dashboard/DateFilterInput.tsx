interface DateFilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const defaultInputClasses =
  "w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";

export default function DateFilterInput({
  label,
  value,
  onChange,
  className = defaultInputClasses,
}: DateFilterInputProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
}
