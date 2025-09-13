import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, Filter } from 'lucide-react';
import { Comment } from '../types';

interface CommentSenseProps {
  comments: Comment[];
  highQualityOnly: boolean;
  onToggleQuality: (value: boolean) => void;
}

export const CommentSense: React.FC<CommentSenseProps> = ({ 
  comments, 
  highQualityOnly, 
  onToggleQuality 
}) => {
  const sentimentCounts = comments.reduce((acc, comment) => {
    acc[comment.sentiment] = (acc[comment.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalComments = comments.length;
  const qualityComments = comments.filter(c => c.qualityScore > 0.7).length;
  const qualityRatio = totalComments > 0 ? (qualityComments / totalComments) * 100 : 0;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-600';
      case 'Negative':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <ThumbsUp className="h-4 w-4" />;
      case 'Negative':
        return <ThumbsDown className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
          CommentSense
        </h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-600">AI-powered comment analysis</p>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={highQualityOnly}
              onChange={(e) => onToggleQuality(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-xs text-gray-600">High-quality only</span>
          </label>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sentiment Distribution */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Sentiment Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(sentimentCounts).map(([sentiment, count]) => {
              const percentage = totalComments > 0 ? (count / totalComments) * 100 : 0;
              return (
                <div key={sentiment} className="text-center">
                  <div className={`flex items-center justify-center space-x-1 ${getSentimentColor(sentiment)} mb-1`}>
                    {getSentimentIcon(sentiment)}
                    <span className="text-sm font-medium">{sentiment}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{percentage.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">{count} comments</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Ratio Gauge */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quality Ratio</h3>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#qualityGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(qualityRatio / 100) * 351.86} 351.86`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{qualityRatio.toFixed(0)}%</div>
                <div className="text-xs text-gray-500">Quality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Recent Comments</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {comments.slice(0, 10).map((comment) => (
              <div key={comment.id} className="p-3 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-800 mb-2">{comment.text}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className={`flex items-center space-x-1 ${getSentimentColor(comment.sentiment)}`}>
                      {getSentimentIcon(comment.sentiment)}
                      <span>{comment.sentiment}</span>
                    </span>
                    <span className="text-gray-500">
                      Quality: {(comment.qualityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {comment.spamProbability > 0.5 && (
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                    )}
                    <span className="text-gray-500">{comment.platform}</span>
                  </div>
                </div>

                {/* Keywords */}
                {comment.keywords.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {comment.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};