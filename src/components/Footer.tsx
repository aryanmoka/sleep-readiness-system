export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            MSc Research Project: Sleep-Based Training Readiness System
          </p>
          <p className="text-xs text-gray-500">
            Model based on empirically validated linear regression analysis
          </p>
          <p className="text-xs text-gray-400">
            Formula: Readiness = 5.65 + (0.75 × Sleep) − (0.44 × Fatigue) − (0.17 × Stress) + (0.13 × Caffeine)
          </p>
        </div>
      </div>
    </footer>
  );
}
