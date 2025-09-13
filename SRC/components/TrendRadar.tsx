import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { Trend } from '../types';

interface TrendRadarProps {
  trends: Trend[];
  onTrendClick: (trend: Trend) => void;
  timeRange: string;
}

export const TrendRadar: React.FC<TrendRadarProps> = ({ trends, onTrendClick, timeRange }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Emerging':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'Declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Emerging':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Declining':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-pink-500" />
          Trend Radar
        </h2>
        <p className="text-sm text-gray-600 mt-1">Top trends for {timeRange}</p>
      </div>

      <div className="p-6">
        {/* Bubble Chart Placeholder */}
        <div className="mb-6 h-64 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600 text-sm">Interactive Bubble Chart</p>
              <p className="text-gray-500 text-xs">Growth Rate vs Volume vs Engagement</p>
            </div>
          </div>
          
          {/* Simulated bubbles */}
          {trends.slice(0, 8).map((trend, index) => (
            <div
              key={trend.id}
              className="absolute rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-70 hover:opacity-90 cursor-pointer transition-all transform hover:scale-110"
              style={{
                width: `${Math.max(20, trend.engagementPerMention / 100)}px`,
                height: `${Math.max(20, trend.engagementPerMention / 100)}px`,
                left: `${(trend.growthRate + 50) * 0.8}%`,
                top: `${(100 - trend.volume / 10) * 0.8}%`,
              }}
              onClick={() => onTrendClick(trend)}
              title={`${trend.name}: ${trend.growthRate}% growth, ${trend.volume}K volume`}
            />
          ))}
        </div>

        {/* Trends Table */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Top Trends</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {trends.map((trend) => (
              <div
                key={trend.id}
                onClick={() => onTrendClick(trend)}
                className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{trend.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(trend.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(trend.status)}
                      <span>{trend.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Score</span>
                    <div className="font-semibold text-lg">{trend.score.toFixed(1)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Growth</span>
                    <div className={`font-semibold text-lg ${trend.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trend.growthRate >= 0 ? '+' : ''}{trend.growthRate.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Engagement</span>
                    <div className="font-semibold text-lg">{(trend.engagementPerMention / 1000).toFixed(1)}K</div>
                  </div>
                </div>

                {/* Mini sparkline */}
                <div className="mt-3 h-8 bg-gray-50 rounded flex items-end justify-between px-1">
                  {trend.timeSeriesData.slice(-7).map((point, index) => (
                    <div
                      key={index}
                      className="w-2 bg-gradient-to-t from-pink-400 to-purple-500 rounded-t"
                      style={{ height: `${(point.value / 100) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};