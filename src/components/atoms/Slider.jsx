import { useId } from "react";

const Slider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  label,
  unit = "",
  className = "",
  disabled = false,
}) => {
  const id = useId();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <div className="flex justify-between mb-2 text-sm text-gray-700">
          <span>{label}</span>
          <span className="font-semibold text-blue-600">
            {value} {unit}
          </span>
        </div>
      )}

      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-blue-600 transition-all duration-200 ${
              disabled ? "bg-gray-400" : ""
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Range input */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-20
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            disabled:cursor-not-allowed
          `}
          style={{ "--progress": `${percentage}%` }}
        />

        {/* Custom Thumb */}
        <div
          className={`
            absolute w-4 h-4 bg-white border-2 rounded-full shadow
            ${disabled ? "border-gray-400" : "border-blue-600"}
            transform -translate-x-1/2 transition-transform duration-200
            pointer-events-none
          `}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;
