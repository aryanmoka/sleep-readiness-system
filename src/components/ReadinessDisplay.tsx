import { TrainingOutput } from '../types';
import { Activity, AlertCircle, CheckCircle, TrendingUp, Power, Brain } from 'lucide-react';

interface ReadinessDisplayProps {
  result: TrainingOutput;
}

const categoryConfig = {
  ready: {
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    fill: 'bg-emerald-500',
    icon: CheckCircle,
    gradient: 'from-emerald-500 to-teal-500'
  },
  caution: {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    fill: 'bg-amber-500',
    icon: AlertCircle,
    gradient: 'from-amber-500 to-orange-500'
  },
  rest: {
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    fill: 'bg-rose-500',
    icon: Activity,
    gradient: 'from-rose-500 to-red-600'
  }
};

export default function ReadinessDisplay({ result }: ReadinessDisplayProps) {
  const config = categoryConfig[result.recommendation_category];
  const Icon = config.icon;
  
  // Create 20 segments for the "VU Meter" look
  const totalSegments = 20;
  const activeSegments = Math.round((result.readiness_score / 10) * totalSegments);

  return (
    <div className="w-full animate-fadeIn space-y-8">
      
      {/* 1. Main Score Card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-xl">
        {/* Background Decorative Blob */}
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl -mr-16 -mt-16`} />
        
        <div className="relative p-8 text-center z-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
            Calculated Readiness Index
          </h2>

          {/* Big Score Display */}
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className={`text-7xl sm:text-8xl font-black tracking-tighter ${config.color}`}>
              {result.readiness_score.toFixed(1)}
            </span>
            <span className="text-xl font-bold text-gray-300">/10</span>
          </div>

          {/* The "VU Meter" Segmented Bar */}
          <div className="max-w-xs mx-auto mb-8">
            <div className="flex justify-between gap-1 h-3 mb-2">
              {[...Array(totalSegments)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-500 ease-out ${
                    i < activeSegments 
                      ? config.fill 
                      : 'bg-gray-100'
                  }`}
                  style={{
                    opacity: i < activeSegments ? 1 : 0.5,
                    transform: i < activeSegments ? 'scaleY(1)' : 'scaleY(0.8)'
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Fatigued</span>
              <span>Optimal</span>
            </div>
          </div>

          {/* Verdict Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${config.border} ${config.bg}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
            <span className={`text-sm font-bold uppercase tracking-wide ${config.color}`}>
              {result.recommendation}
            </span>
          </div>
        </div>
      </div>

      {/* 2. The Analysis / Context Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Interpretation Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">Coach's Analysis</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {result.interpretation}
          </p>
        </div>

        {/* Model Factors (Static visual to reinforce the science) */}
        <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-bold text-gray-900">Model Factors</h3>
          </div>
          <div className="space-y-3">
            {/* Visualizing the weights of your regression model */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Sleep Impact</span>
              <span className="font-mono text-emerald-600 font-bold">+0.75 weight</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]"></div>
            </div>
            
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">Fatigue Penalty</span>
              <span className="font-mono text-rose-500 font-bold">-0.44 weight</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-rose-500 h-1.5 rounded-full w-[44%]"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}