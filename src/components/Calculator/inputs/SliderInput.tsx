import Tooltip from '../../UI/Tooltip';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  tooltip?: string;
  formatDisplay?: (value: number) => string;
  onChange: (value: number) => void;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  tooltip,
  onChange,
}: SliderInputProps) {
  const handleInputChange = (inputValue: string) => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= min) {
      // Allow values above max for manual input, only enforce minimum
      onChange(numValue);
    }
  };

  const labelContent = (
    <label className="text-gray-700 dark:text-gray-300 font-medium">{label}</label>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        {tooltip ? <Tooltip content={tooltip}>{labelContent}</Tooltip> : labelContent}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={min}
            step={step}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-32 px-3 py-1 text-right text-lg font-semibold text-indigo-600 dark:text-indigo-400 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={`Minimum: ${min.toLocaleString('sv-SE')} ${unit}. Slider max: ${max.toLocaleString('sv-SE')} ${unit}`}
          />
          <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>
          {min.toLocaleString('sv-SE')} {unit}
        </span>
        <span>
          {max.toLocaleString('sv-SE')} {unit}
        </span>
      </div>
    </div>
  );
}
