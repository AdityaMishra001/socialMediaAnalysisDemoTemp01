export type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed';
export type UrgencyType = 'low' | 'medium' | 'high' | 'critical';
export type PriorityType = 'low' | 'medium' | 'high';
export type EffortType = 'low' | 'medium' | 'high';

export interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
  mixed: number;
}

export interface EmotionBreakdown {
  frustration: number;
  delight: number;
  confusion: number;
  excitement: number;
  disappointment: number;
  satisfaction: number;
}

export interface ThemeItem {
  theme: string;
  count: number;
  sentiment: SentimentType;
  urgency: UrgencyType;
  representative_quotes: string[];
}

export interface AspectSentiment {
  aspect: string;
  sentiment: SentimentType;
  score: number;
  supporting_examples: string[];
}

export interface Recommendation {
  title: string;
  priority: PriorityType;
  rationale: string;
  expected_impact: string;
  effort: EffortType;
  category: string;
}

export interface AnalysisResult {
  overall_sentiment: SentimentType;
  sentiment_distribution: SentimentDistribution;
  emotion_breakdown: EmotionBreakdown;
  executive_summary: string;
  key_themes: ThemeItem[];
  aspect_sentiments: AspectSentiment[];
  common_complaints: string[];
  recurring_questions: string[];
  suggestions: string[];
  feature_requests: string[];
  recommendations: Recommendation[];
  total_items_analyzed: number;
  confidence_score: number;
  is_simulated?: boolean;
}

export interface AnalysisResponse {
  id: string;
  feedback_source: string;
  analysis_goal: string;
  language: string;
  item_count: number;
  raw_sample?: string;
  status: string;
  result: AnalysisResult;
  error_message?: string;
  created_at?: string;
}

export const FEEDBACK_SOURCES = [
  { value: 'instagram', label: 'Instagram Comments', icon: 'Instagram' },
  { value: 'youtube', label: 'YouTube Video Comments', icon: 'Youtube' },
  { value: 'tiktok', label: 'TikTok Comments', icon: 'Video' },
  { value: 'product_reviews', label: 'Product Reviews (Amazon/Shopify)', icon: 'ShoppingBag' },
  { value: 'app_store', label: 'App Store / Play Store Reviews', icon: 'Smartphone' },
  { value: 'customer_support', label: 'Customer Support Tickets', icon: 'Headphones' },
  { value: 'student_feedback', label: 'Student Course Evaluations', icon: 'GraduationCap' },
  { value: 'employee_survey', label: 'Employee Pulse Surveys', icon: 'Users' },
  { value: 'nps_survey', label: 'NPS & Customer Surveys', icon: 'BarChart' },
  { value: 'community', label: 'Community / Reddit Discussions', icon: 'MessageSquare' },
  { value: 'general', label: 'General / Mixed Feedback', icon: 'Layers' },
];

export const ANALYSIS_GOALS = [
  { value: 'improve_content', label: 'Improve Content & Engagement', desc: 'Find what hooks viewers and what topics to produce next' },
  { value: 'improve_product', label: 'Improve Product Quality & Fix Bugs', desc: 'Pinpoint friction points, bugs, and usability flaws' },
  { value: 'customer_satisfaction', label: 'Boost Customer Satisfaction & CSAT', desc: 'Identify delight drivers and eliminate support bottlenecks' },
  { value: 'reduce_churn', label: 'Reduce Churn & Retain Users', desc: 'Spot red flags, subscription cancellations, and frustrations' },
  { value: 'improve_teaching', label: 'Enhance Teaching & Course Value', desc: 'Clarify difficult concepts and improve student engagement' },
  { value: 'general', label: 'General Comprehensive Insights', desc: 'High-level synthesis across all aspects' },
];
