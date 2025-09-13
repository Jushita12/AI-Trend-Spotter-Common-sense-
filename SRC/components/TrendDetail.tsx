import React from 'react';
import { LineChart, Users, Hash, MessageCircle } from 'lucide-react';
import { Trend } from '../types';

interface TrendDetailProps {
  trend: Trend | null;
  timeRange: string;
}

export const TrendDetail: React.FC<TrendDetailProps> = ({ trend, timeRange }) => {
  if (!trend) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-blue-500" />
            Trend Detail
          </h2>
        </div>
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <LineChart className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Select a trend to view details</p>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...trend.timeSeriesData.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
          {trend.name}
        </h2>
        <p className="text-sm text-gray-600 mt-1">Detailed analysis for {timeRange}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Time Series Chart */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Trend Evolution & Forecast</h3>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 relative p-4">
            <svg className="w-full h-full">
              {/* Historical data */}
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                points={trend.timeSeriesData.map((point, index) => 
                  `${(index / (trend.timeSeriesData.length - 1)) * 70}%,${100 - (point.value / maxValue) * 80}%`
                ).join(' ')}
              />
              
              {/* Forecast data */}
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray="5,5"
                points={trend.forecast.map((point, index) => 
                  `${70 + (index / (trend.forecast.length - 1)) * 25}%,${100 - (point.value / maxValue) * 80}%`
                ).join(' ')}
              />
            </svg>
            <div className="absolute bottom-2 left-4 text-xs text-gray-600">
              <span className="inline-block w-3 h-0.5 bg-blue-500 mr-1"></span>
              Historical
              <span className="inline-block w-3 h-0.5 bg-purple-500 border-dashed ml-3 mr-1"></span>
              Forecast
            </div>
          </div>
        </div>

        {/* Word Cloud */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Hash className="h-4 w-4 mr-1" />
            Top Hashtags
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-2">
            {trend.hashtags.map((hashtag, index) => (
              <span
                key={hashtag}
                className="px-3 py-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full text-sm font-medium"
                style={{ 
                  fontSize: `${Math.max(0.7, 1.2 - index * 0.1)}rem`,
                  opacity: Math.max(0.6, 1 - index * 0.15)
                }}
              >
                #{hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* Audience Segmentation */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Audience Segmentation
          </h3>
          <div className="space-y-3">
            {Object.entries(trend.audience).map(([segment, percentage]) => (
              <div key={segment} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">{segment === 'genZ' ? 'Gen Z' : segment}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-10">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Posts */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            Sample Posts
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {trend.samplePosts.map((post) => (
              <div key={post.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-800 mb-2">{post.text}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="font-medium">{post.platform}</span>
                  <span>{post.engagement.toLocaleString()} engagements</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};