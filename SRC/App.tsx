import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TrendRadar } from './components/TrendRadar';
import { TrendDetail } from './components/TrendDetail';
import { CommentSense } from './components/CommentSense';
import { Recommendations } from './components/Recommendations';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { FilterState, Trend, Comment, Recommendation } from './types';

const defaultFilters: FilterState = {
  timeRange: '7d',
  platform: 'All',
  language: 'All',
  searchQuery: '',
  highQualityOnly: false,
};

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  // File upload handler (CSV or Excel)
  const handleCsvUpload = (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
          setLastRefresh(new Date());
        },
      });
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setCsvData(jsonData);
        setLastRefresh(new Date());
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Filter data based on sidebar filters
  const filteredTrends = csvData.filter((row) => {
    // Example filtering logic, adjust as per your CSV columns
    const matchesPlatform = filters.platform === 'All' || row.platform === filters.platform;
    const matchesLanguage = filters.language === 'All' || row.language === filters.language;
    const matchesSearch = !filters.searchQuery || (row.hashtags && row.hashtags.includes(filters.searchQuery));
    return matchesPlatform && matchesLanguage && matchesSearch;
  });

  // Filter comments for CommentSense
  const filteredComments = csvData.filter((row) => {
    if (!row.comment_text) return false;
    if (filters.highQualityOnly) return row.qualityScore > 0.7;
    return true;
  });

  // Recommendations logic (example)
  const recommendations: Recommendation[] = csvData.slice(0, 5).map((row, idx) => ({
    id: String(idx),
    title: row.recommendation_title || 'Insight',
    description: row.recommendation || 'No description',
    impact: row.impact || 'Medium',
    category: row.category || 'Trend',
    confidence: row.confidence || 0.8,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header lastRefresh={lastRefresh} />
      <div className="flex">
        <Sidebar
          filters={filters}
          onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
          onCsvUpload={handleCsvUpload}
        />
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-8 pt-24">
          {/* Column A: Trend Radar */}
          <section className="flex-1 min-w-[350px]">
            <TrendRadar
              trends={filteredTrends}
              onTrendClick={setSelectedTrend}
              timeRange={filters.timeRange}
            />
          </section>
          {/* Column B: Trend Detail */}
          <section className="flex-1 min-w-[350px]">
            <TrendDetail trend={selectedTrend} timeRange={filters.timeRange} />
          </section>
          {/* Column C: CommentSense */}
          <section className="flex-1 min-w-[350px]">
            <CommentSense comments={filteredComments} filters={filters} />
          </section>
        </main>
      </div>
      {/* Bottom Panel: Recommendations */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default App;
