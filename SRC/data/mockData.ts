
import { Trend, Comment, Recommendation } from '../types';

export const mockTrends: Trend[] = [
  {
    id: '1',
    name: 'Glow Skin',
    score: 92.5,
    growthRate: 285.3,
    engagementPerMention: 4200,
    volume: 1850,
    status: 'Emerging',
    platform: 'Instagram',
    hashtags: ['glowyskin', 'skincare', 'glowing', 'healthyskin', 'skincareroutine'],
    audience: { genZ: 68, millennials: 22, genX: 8, boomers: 2 },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(20, 60 + Math.random() * 40 + i * 1.2)
    })),
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 85 + Math.random() * 15 + i * 2
    })),
    samplePosts: [
      {
        id: 'p1',
        text: 'My morning skincare routine for that natural glow ✨ #glowyskin #skincare',
        engagement: 15420,
        platform: 'Instagram'
      },
      {
        id: 'p2',
        text: 'This vitamin C serum changed my life! Perfect for glowing skin 🌟',
        engagement: 8765,
        platform: 'TikTok'
      }
    ]
  },
  {
    id: '2',
    name: 'Clean Beauty',
    score: 88.2,
    growthRate: 156.7,
    engagementPerMention: 3800,
    volume: 2200,
    status: 'Emerging',
    platform: 'YouTube',
    hashtags: ['cleanbeauty', 'nontoxic', 'natural', 'organic', 'sustainable'],
    audience: { genZ: 45, millennials: 38, genX: 15, boomers: 2 },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(15, 50 + Math.random() * 35 + i * 0.8)
    })),
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 78 + Math.random() * 12 + i * 1.5
    })),
    samplePosts: [
      {
        id: 'p3',
        text: 'Why I switched to clean beauty products and never looked back 🌱',
        engagement: 12350,
        platform: 'YouTube'
      }
    ]
  },
  {
    id: '3',
    name: 'Skin Barrier',
    score: 65.8,
    growthRate: -12.4,
    engagementPerMention: 2100,
    volume: 1650,
    status: 'Declining',
    platform: 'TikTok',
    hashtags: ['skinbarrier', 'ceramides', 'skinrepair', 'moisture', 'sensitive'],
    audience: { genZ: 52, millennials: 31, genX: 14, boomers: 3 },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(10, 70 - i * 0.5 + Math.random() * 15)
    })),
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 65 - i * 2 + Math.random() * 8
    })),
    samplePosts: [
      {
        id: 'p4',
        text: 'How to repair your skin barrier after over-exfoliation 💜',
        engagement: 6890,
        platform: 'TikTok'
      }
    ]
  },
  {
    id: '4',
    name: 'Glass Skin',
    score: 79.1,
    growthRate: 98.2,
    engagementPerMention: 5100,
    volume: 1420,
    status: 'Emerging',
    platform: 'Instagram',
    hashtags: ['glassskin', 'korean', 'skincare', 'dewy', 'flawless'],
    audience: { genZ: 72, millennials: 20, genX: 6, boomers: 2 },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(25, 45 + Math.random() * 30 + i * 1.1)
    })),
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 75 + Math.random() * 10 + i * 1.8
    })),
    samplePosts: [
      {
        id: 'p5',
        text: 'Achieving that Korean glass skin look with these 7 steps ✨',
        engagement: 18920,
        platform: 'Instagram'
      }
    ]
  },
  {
    id: '5',
    name: 'Retinol Alternative',
    score: 83.6,
    growthRate: 74.5,
    engagementPerMention: 3200,
    volume: 980,
    status: 'Stable',
    platform: 'YouTube',
    hashtags: ['retinol', 'bakuchiol', 'antiaging', 'gentle', 'sensitive'],
    audience: { genZ: 25, millennials: 48, genX: 23, boomers: 4 },
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(30, 55 + Math.random() * 25 + Math.sin(i * 0.3) * 10)
    })),
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 80 + Math.random() * 8 + i * 0.5
    })),
    samplePosts: [
      {
        id: 'p6',
        text: 'Gentle retinol alternatives that actually work for sensitive skin',
        engagement: 9150,
        platform: 'YouTube'
      }
    ]
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    text: 'This skincare routine completely transformed my skin! I\'ve been struggling with dullness for years.',
    sentiment: 'Positive',
    qualityScore: 0.92,
    spamProbability: 0.05,
    platform: 'Instagram',
    keywords: ['skincare', 'transformed', 'dullness'],
    engagement: 45,
    timestamp: '2025-01-20T10:30:00Z'
  },
  {
    id: 'c2',
    text: 'Anyone else obsessed with glass skin trends? The K-beauty routine is life-changing 💕',
    sentiment: 'Positive',
    qualityScore: 0.85,
    spamProbability: 0.12,
    platform: 'TikTok',
    keywords: ['glass skin', 'K-beauty', 'routine'],
    engagement: 128,
    timestamp: '2025-01-20T09:15:00Z'
  },
  {
    id: 'c3',
    text: 'Honestly disappointed with this product. Didn\'t see any results after 6 weeks of use.',
    sentiment: 'Negative',
    qualityScore: 0.78,
    spamProbability: 0.08,
    platform: 'YouTube',
    keywords: ['disappointed', 'results', 'weeks'],
    engagement: 23,
    timestamp: '2025-01-20T08:45:00Z'
  },
  {
    id: 'c4',
    text: 'Check out my discount code SAVE50 for amazing skincare products! Link in bio!',
    sentiment: 'Neutral',
    qualityScore: 0.15,
    spamProbability: 0.89,
    platform: 'Instagram',
    keywords: ['discount', 'code', 'link'],
    engagement: 3,
    timestamp: '2025-01-20T11:20:00Z'
  },
  {
    id: 'c5',
    text: 'The retinol alternatives mentioned in this video are game-changers for sensitive skin types.',
    sentiment: 'Positive',
    qualityScore: 0.88,
    spamProbability: 0.06,
    platform: 'YouTube',
    keywords: ['retinol', 'alternatives', 'sensitive skin'],
    engagement: 67,
    timestamp: '2025-01-20T07:30:00Z'
  },
  {
    id: 'c6',
    text: 'Love how this brand focuses on clean ingredients. Finally found my holy grail serum!',
    sentiment: 'Positive',
    qualityScore: 0.81,
    spamProbability: 0.11,
    platform: 'Instagram',
    keywords: ['clean ingredients', 'holy grail', 'serum'],
    engagement: 89,
    timestamp: '2025-01-20T06:45:00Z'
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'r1',
    title: '#GlowySkin Surge',
    description: 'Capitalize on the 285% growth in glow skin content among Gen Z. Focus on dewy, natural looks.',
    impact: 'High',
    category: 'Trend',
    confidence: 94
  },
  {
    id: 'r2',
    title: 'Clean Beauty Expansion',
    description: 'Millennials showing strong interest in non-toxic formulations. Consider product line extension.',
    impact: 'High',
    category: 'Strategy',
    confidence: 87
  },
  {
    id: 'r3',
    title: 'YouTube Strategy',
    description: 'Long-form educational content about retinol alternatives performing exceptionally well.',
    impact: 'Medium',
    category: 'Content',
    confidence: 82
  },
  {
    id: 'r4',
    title: 'Gen Z Engagement',
    description: 'TikTok content with skincare routines generating 3x higher engagement than product showcases.',
    impact: 'High',
    category: 'Audience',
    confidence: 91
  },
  {
    id: 'r5',
    title: 'Sustainable Packaging',
    description: 'Growing demand for eco-friendly packaging mentioned in 45% of clean beauty discussions.',
    impact: 'Medium',
    category: 'Strategy',
    confidence: 76
  }
];
