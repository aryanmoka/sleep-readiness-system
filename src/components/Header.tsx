import { Dumbbell, Activity, FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Logo & Title Section */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              {/* Main Icon */}
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 transform group-hover:scale-105 transition-transform duration-200">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              {/* Secondary Icon (The "Science" part) - Absolute positioned badge */}
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-gray-100">
                <div className="bg-emerald-500 rounded-full p-1">
                  <Activity className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  TRAINING READINESS
                </h1>
                {/* Research Badge */}
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                  Model v1.0 (N=150)
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">
                Performance Recovery Assessment
              </p>
            </div>
          </div>

          {/* Action / Context Section */}
          <div className="flex items-center gap-3 pl-12 sm:pl-0">
            {/* Mobile Badge (visible only on small screens) */}
            <span className="sm:hidden inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
              Validated Model
            </span>

            {/* Methodology Link - Great for Portfolio Showcasing */}
            <button 
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Regression Model"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Methodology</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}