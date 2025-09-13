import React, { useRef } from 'react';
import { Search, Upload, Filter, Calendar, Globe, MessageSquare } from 'lucide-react';
import { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onCsvUpload: (file: File) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, onCsvUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onCsvUpload(file);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-sm z-10 pt-20">
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </div>

        {/* Time Range Selector */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Calendar className="h-4 w-4" />
            <span>Time Range</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['7d', '14d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => onFilterChange({ timeRange: range as any })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.timeRange === range
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selector */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <MessageSquare className="h-4 w-4" />
            <span>Platform</span>
          </label>
          <select
            value={filters.platform}
            onChange={(e) => onFilterChange({ platform: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="All">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Globe className="h-4 w-4" />
            <span>Language</span>
          </label>
          <select
            value={filters.language}
            onChange={(e) => onFilterChange({ language: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>

        {/* Search Bar */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Search className="h-4 w-4" />
            <span>Search Hashtags/Keywords</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="e.g., #glowyskin, skincare..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* CSV Upload */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Upload className="h-4 w-4" />
            <span>Upload Dataset</span>
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors text-gray-600 hover:text-pink-600"
          >
            <Upload className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm">Upload CSV File</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Data Source Info */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Instagram Posts:</span>
              <span className="font-medium">1.2M</span>
            </div>
            <div className="flex justify-between">
              <span>YouTube Videos:</span>
              <span className="font-medium">845K</span>
            </div>
            <div className="flex justify-between">
              <span>TikTok Videos:</span>
              <span className="font-medium">2.1M</span>
            </div>
            <div className="flex justify-between">
              <span>Comments Analyzed:</span>
              <span className="font-medium">15.3M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};