import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputSlider from './components/InputSlider';
import ReadinessDisplay from './components/ReadinessDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { inputConfigs } from './config/inputConfig';
import { predictReadiness } from './services/api';
import { TrainingInput, TrainingOutput } from './types';

function App() {
  const [inputs, setInputs] = useState<TrainingInput>({
    sleep_quality: 3,
    fatigue_level: 5,
    stress_level: 3,
    caffeine_intake: 1,
  });

  const [result, setResult] = useState<TrainingOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: keyof TrainingInput, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    try {
      const prediction = await predictReadiness(inputs);
      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Input Your Metrics
                </h2>
                <p className="text-sm text-gray-600">
                  Adjust the sliders to reflect your current state
                </p>
              </div>

              <div className="space-y-6">
                {inputConfigs.map((config) => (
                  <InputSlider
                    key={config.key}
                    config={config}
                    value={inputs[config.key]}
                    onChange={(value) => handleInputChange(config.key, value)}
                  />
                ))}
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Readiness'
                )}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                About This System
              </h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                This system uses a statistically validated linear regression model
                derived from research on the relationship between sleep quality,
                fatigue, stress, and training readiness in amateur powerlifters.
                The recommendations are evidence-based and designed to optimize
                training outcomes while minimizing injury risk.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <ErrorDisplay
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {result ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <ReadinessDisplay result={result} />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-400 space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8" />
                  </div>
                  <p className="text-sm">
                    Enter your metrics and click "Calculate Readiness"
                    <br />
                    to receive your personalized recommendation
                  </p>
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
