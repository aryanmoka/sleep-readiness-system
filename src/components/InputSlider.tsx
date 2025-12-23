import { InputConfig } from '../types';

interface InputSliderProps {
  config: InputConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function InputSlider({ config, value, onChange }: InputSliderProps) {
  // Calculate percentage for the slider fill effect
  const percentage = ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      {/* Header: Label and Value */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            {config.label}
          </label>
          <p className="text-xs text-gray-500 font-medium">
            {config.description}
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-blue-600 tabular-nums tracking-tight">
            {value}
          </span>
          {config.unit && (
            <span className="text-xs font-bold text-gray-400 uppercase">
              {config.unit}
            </span>
          )}
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-6 flex items-center">
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Dynamic Fill Bar */}
          <div 
            className="h-full bg-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* The Actual Input (Invisible but functional) */}
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Thumb (Visual only - positioned by left %) */}
        <div 
          className="absolute h-5 w-5 bg-white border-2 border-blue-600 rounded-full shadow-md pointer-events-none transition-all duration-150 ease-out"
          style={{ 
            left: `calc(${percentage}% - 10px)` // -10px centers the 20px thumb
          }}
        />
      </div>

      {/* Scale Context (Min/Max Labels) */}
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[10px] font-bold text-gray-400">{config.min}</span>
        <span className="text-[10px] font-bold text-gray-400">{config.max}</span>
      </div>
    </div>
  );
}