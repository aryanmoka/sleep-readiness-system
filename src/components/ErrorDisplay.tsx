import { XCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorDisplay({ message, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-fadeIn">
      <div className="flex items-start gap-3">
        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-1">
            Error
          </h3>
          <p className="text-sm text-red-700">
            {message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
          aria-label="Dismiss error"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
