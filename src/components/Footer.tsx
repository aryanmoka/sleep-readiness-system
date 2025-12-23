import { Github, Linkedin, Database, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Section: The "Engine" (Formula) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Regression Model Logic
            </h3>
          </div>
          
          {/* The Formula - Styled like a code snippet */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm overflow-x-auto">
            <code className="text-sm font-mono text-gray-700 whitespace-nowrap">
              <span className="text-gray-400">Readiness = </span>
              <span className="font-bold text-blue-600">5.65</span>
              <span className="mx-1 text-gray-400">+</span>
              ( <span className="font-bold text-blue-600">0.75</span> × Sleep )
              <span className="mx-1 text-gray-400">-</span>
              ( <span className="font-bold text-red-500">0.44</span> × Fatigue )
              <span className="mx-1 text-gray-400">-</span>
              ( <span className="font-bold text-red-500">0.17</span> × Stress )
              <span className="mx-1 text-gray-400">+</span>
              ( <span className="font-bold text-emerald-600">0.13</span> × Caffeine )
            </code>
          </div>

          <div className="flex gap-4 mt-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              R² = 0.65 (High Correlation)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              n = 150 Participants
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 w-full mb-8" />

        {/* Bottom Section: Links & Disclaimer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Credits */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-900">
              MSc Research Project
            </p>
            <p className="text-sm text-gray-500">
              Data Science & Artificial Intelligence
            </p>
          </div>

          {/* Social / Repo Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/aryanmoka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aryanmokashi49" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            {/* If you have a PDF link for your paper, add it here later */}
            <a 
              href="#" 
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-gray-300 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              Read Paper
            </a>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 max-w-lg mx-auto leading-relaxed">
            * This tool is a decision-support system based on statistical analysis of amateur powerlifters. 
            It is not medical advice. Always listen to your body and consult a coach for professional programming.
          </p>
        </div>

      </div>
    </footer>
  );
}