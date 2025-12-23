import { useState } from 'react';
import { Loader2, BarChart3, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputSlider from './components/InputSlider';
import ReadinessDisplay from './components/ReadinessDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { inputConfigs } from './config/inputConfig';
import { predictReadiness } from './services/api';
import { TrainingInput, TrainingOutput } from './types';

function App() {
  // State Management
  const [inputs, setInputs] = useState<TrainingInput>({
    sleep_quality: 3,
    fatigue_level: 5,
    stress_level: 3,
    caffeine_intake: 1,
  });

  const [result, setResult] = useState<TrainingOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleInputChange = (key: keyof TrainingInput, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    // Clear error when user fixes input, but keep result visible until recalculation
    if (error) setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    // Artificial delay (optional) to make the "calculation" feel heavier/more serious
    // await new Promise(r => setTimeout(r, 600)); 

    try {
      const prediction = await predictReadiness(inputs);
      setResult(prediction);
      
      // On mobile, smooth scroll to results
      if (window.innerWidth < 1024) {
        document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Data Entry (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">1</span>
                  Input Daily Metrics
                </h2>
                <p className="text-sm text-gray-500 mt-1 ml-8">
                  Adjust sliders to match your current physiological state.
                </p>
              </div>

              <div className="p-6 space-y-8">
                {inputConfigs.map((config) => (
                  <InputSlider
                    key={config.key}
                    config={config}
                    value={inputs[config.key]}
                    onChange={(value) => handleInputChange(config.key, value)}
                  />
                ))}
              </div>

              {/* Action Bar */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="group relative w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Model...</span>
                    </>
                  ) : (
                    <>
                      <span>Calculate Readiness Score</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scientific Note / Context */}
            <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">
                Research Context
              </h3>
              <p className="text-sm text-blue-900/70 leading-relaxed">
                Inputs are weighted based on a multivariate regression analysis of 150 amateur powerlifters. 
                Sleep quality demonstrates the highest correlation (r=0.73) with perceived readiness.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Results (Span 5) - Sticky on Desktop */}
          <div id="results-panel" className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Error State */}
            {error && (
              <ErrorDisplay
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {/* Result State */}
            {result ? (
              <ReadinessDisplay result={result} />
            ) : (
              /* Empty State Placeholder */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                  The system is standing by. Complete the metrics on the left to generate your training recommendation.
                </p>
                
                {/* Visual Fake Data Lines */}
                <div className="mt-8 w-full max-w-[200px] space-y-2 opacity-30">
                  <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-[80%] mx-auto"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-[60%] mx-auto"></div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;