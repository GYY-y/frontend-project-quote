// API 客户端
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Quote {
  id: number;
  content: string;
  content_en?: string;
  source: string;
  original_url?: string;
  author?: string;
  category?: string;
  created_at: string;
}

export interface TodayQuote extends Quote {
  is_today: boolean;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface QuotesListResponse {
  quotes: Quote[];
  pagination: PaginationInfo;
  query?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API 请求工具函数
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// API 方法
export const api = {
  // 获取今日金句
  async getTodayQuote(): Promise<TodayQuote> {
    return apiRequest<TodayQuote>('/api/today');
  },

  // 获取历史金句
  async getHistoryQuotes(page = 1, limit = 10): Promise<QuotesListResponse> {
    return apiRequest<QuotesListResponse>(`/api/history?page=${page}&limit=${limit}`);
  },

  // 搜索金句
  async searchQuotes(query: string, page = 1, limit = 10): Promise<QuotesListResponse> {
    return apiRequest<QuotesListResponse>(`/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  },

  // 按分类获取金句
  async getQuotesByCategory(category: string, page = 1, limit = 10): Promise<QuotesListResponse> {
    return apiRequest<QuotesListResponse>(`/api/category?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`);
  },

  // 获取统计信息
  async getStats(): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/stats');
  },

  // 触发爬取
  async triggerCrawl(source: string): Promise<ApiResponse> {
    return apiRequest<ApiResponse>(`/api/crawl/${source}`, {
      method: 'POST',
    });
  },

  // 获取爬取状态
  async getCrawlStatus(): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/crawl/status');
  },

  // 健康检查
  async healthCheck(): Promise<{ status: string; timestamp: string; version: string }> {
    return apiRequest('/api/health');
  },
};
