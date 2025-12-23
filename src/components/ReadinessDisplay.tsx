import { TrainingOutput } from '../types';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface ReadinessDisplayProps {
  result: TrainingOutput;
}

const categoryConfig = {
  ready: {
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600'
  },
  caution: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: AlertCircle,
    iconColor: 'text-yellow-600'
  },
  rest: {
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: Activity,
    iconColor: 'text-red-600'
  }
};

export default function ReadinessDisplay({ result }: ReadinessDisplayProps) {
  const config = categoryConfig[result.recommendation_category];
  const Icon = config.icon;
  const percentage = Math.min(Math.max((result.readiness_score / 10) * 100, 0), 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          Your Readiness Score
        </h2>
        <div className="text-6xl font-bold text-gray-800">
          {result.readiness_score.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">out of 10</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Low Readiness</span>
          <span>High Readiness</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full ${config.color} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className={`rounded-lg border-2 ${config.borderColor} ${config.bgColor} p-6 space-y-4`}>
        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
          <div>
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Recommendation
            </h3>
            <p className={`text-2xl font-bold ${config.textColor}`}>
              {result.recommendation}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {result.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}
