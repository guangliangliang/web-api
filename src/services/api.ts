import type { ApiCategory, ApiItem, ApiDetail } from "../types";
import { request } from "./http";

// 获取分类列表
export async function getCategories(): Promise<ApiCategory[]> {
  return request<ApiCategory[]>("/api/categories");
}

// 获取API列表
export async function getApis(category?: string): Promise<ApiItem[]> {
  if (category && category !== "all") {
    return request<ApiItem[]>(`/api/apis/by-category/${category}`);
  } else {
    return request<ApiItem[]>("/api/apis/all");
  }
}

// 获取API详情
export async function getApiDetail(id: string): Promise<ApiDetail> {
  return request<ApiDetail>(`/api/apis/${id}`);
}

// 测试API
export async function testApi(id: string, data?: any): Promise<any> {
  // 按照Swagger文档要求的格式发送数据
  const requestData = {
    headers: {},
    body: data || {},
    params: data || {},
  };

  return request<any>(`/api/apis/debug/${id}`, {
    method: "POST",
    data: requestData,
  });
}

// 天气查询
export async function getWeather(city: string): Promise<any> {
  return request<any>(`/api/tools/life/weather?city=${city}`);
}
