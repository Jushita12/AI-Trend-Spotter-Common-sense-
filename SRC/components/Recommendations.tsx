import React from 'react';
import { Lightbulb, Download, Target, Users, TrendingUp, Zap } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationsProps {
  recommendations: Recommendation[];
  onExport: (type: 'csv' | 'pdf') => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations, onExport }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'Audience':
        return <Users className="h-4 w-4" />;
      case 'Content':
        return <Target className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            AI Recommendations
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onExport('csv')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => onExport('pdf')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>PDF Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(rec.category)}
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{rec.category}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(rec.impact)}`}>
                  {rec.impact}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Confidence</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-900">{rec.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
          <h3 className="font-semibold text-gray-900 mb-2">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">🔥 Trending:</span>
              <span className="font-medium text-gray-900 ml-1">#glowyskin surging +285% among Gen Z</span>
            </div>
            <div>
              <span className="text-gray-600">📈 Growing:</span>
              <span className="font-medium text-gray-900 ml-1">Clean beauty content +156% engagement</span>
            </div>
            <div>
              <span className="text-gray-600">⚠️ Declining:</span>
              <span className="font-medium text-gray-900 ml-1">#skinbarrier plateauing across platforms</span>
            </div>
            <div>
              <span className="text-gray-600">💡 Opportunity:</span>
              <span className="font-medium text-gray-900 ml-1">Sustainable packaging content underexplored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};