export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface ApiItem {
  id: number | string;
  name: string;
  description: string;
  method: "GET" | "POST";
  path: string;
  target_url: string;
  is_free: number;
  view_count: number;
  category_id: number;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
  };
  // 兼容旧格式
  isFree?: boolean;
  views?: number;
  rating?: number;
  score?: number;
  icon?: string | null;
  firstChar?: string;
  category_name?: string;
}

export interface ApiParam {
  name: string;
  required: boolean;
  type: string;
  description: string;
  example?: string;
}

export interface ApiDetail {
  id: number | string;
  name: string;
  description: string;
  method: "GET" | "POST";
  path: string;
  target_url: string;
  is_free: number;
  request_params: string;
  response_example: string;
  doc_content: string;
  view_count: number;
  category_id: number;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
  };
  // 兼容旧格式
  url?: string;
  params?: ApiParam[];
  requestExample?: string;
  responseExample?: string;
  icon?: string | null;
  firstChar?: string;
}
