const Toggle = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  const handleChange = (e) => {
    // Pass the checked value directly, not the event
    onChange(e.target.checked);
  };
  return (
    <label
      className={`
        inline-flex items-center gap-2 cursor-pointer select-none
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
      />

      {/* Slider */}
      <span
        className={`
          relative w-12 h-7 flex items-center bg-gray-300 rounded-full p-1 transition-colors
          peer-checked:bg-blue-600
          peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-blue-500
          ${disabled ? "bg-gray-400" : ""}
        `}
      >
        <span
          className={`
            w-5 h-5 bg-white rounded-full shadow-md transform transition-transform
            peer-checked:translate-x-5
          `}
        />
      </span>

      {/* Optional label */}
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default Toggle;
