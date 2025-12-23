import { AlertTriangle, X } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorDisplay({ message, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="w-full animate-fadeIn">
      <div className="relative flex items-start gap-4 p-4 rounded-xl bg-rose-50 border border-rose-200 shadow-sm backdrop-blur-sm">
        
        {/* Warning Icon */}
        <div className="flex-shrink-0 p-2 bg-rose-100 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
        </div>

        {/* Content */}
        <div className="flex-1 pt-1">
          <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-1">
            System Alert
          </h3>
          <p className="text-sm font-medium text-rose-700 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}