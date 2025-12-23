import { InputConfig } from '../types';

interface InputSliderProps {
  config: InputConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function InputSlider({ config, value, onChange }: InputSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-semibold text-gray-700">
          {config.label}
        </label>
        <span className="text-lg font-bold text-blue-600">
          {value}{config.unit}
        </span>
      </div>

      <input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />

      <p className="text-xs text-gray-500 leading-tight">
        {config.description}
      </p>
    </div>
  );
}
