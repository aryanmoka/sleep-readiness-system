import { Dumbbell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Training Readiness System
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Sleep-Based Recovery Assessment for Amateur Powerlifters
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
