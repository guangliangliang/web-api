import type { ApiCategory, ApiItem, ApiDetail } from "../types";
import * as apiService from "../services/api";

// 导出函数来获取数据
export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const response = await apiService.getCategories();
    // 直接使用响应数据，因为request函数已经返回了data.data
    const categories = response;
    // 确保 categories 是数组
    const categoriesArray = Array.isArray(categories) ? categories : [];
    // 添加"全部接口"选项
    return [
      {
        id: "all",
        name: "全部接口",
        icon: "Folder",
        count: categoriesArray.reduce((sum, cat) => sum + (cat.count || 0), 0),
      },
      ...categoriesArray,
    ];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // 返回默认数据作为 fallback
    return [{ id: "all", name: "全部接口", icon: "Folder", count: 0 }];
  }
}

// 根据API名称或路径获取合适的图标
type IconMap = Record<string, string>;

const iconMap: IconMap = {
  // 通用图标
  default: "Api",
  // 生活查询
  weather: "Sunny",
  life: "Sunny",
  // 识别服务
  ocr: "Reading",
  recognition: "Reading",
  // 实用工具
  qrcode: "Picture",
  qr: "Picture",
  password: "Lock",
  uuid: "Key",
  color: "Palette",
  time: "Clock",
  unit: "Calculator",
  human: "User",
  joke: "ChatLineRound",
  // 邮件查询
  email: "Message",
  mail: "Message",
};

function getApiIcon(api: any): string | null {
  const name = api.name?.toLowerCase() || "";
  const path = api.path?.toLowerCase() || "";

  // 检查名称或路径中是否包含图标映射的关键词
  for (const [key, icon] of Object.entries(iconMap)) {
    if (key !== "default" && (name.includes(key) || path.includes(key))) {
      return icon;
    }
  }

  // 无匹配图标，返回null，后续会使用首字
  return null;
}

export async function fetchApis(category?: string): Promise<ApiItem[]> {
  try {
    const response = await apiService.getApis(category);
    // 直接使用响应数据，因为request函数已经返回了data.data
    const data = response;
    // 确保 data 是数组
    if (Array.isArray(data)) {
      // 为每个API添加图标和首字字段
      return data.map((api) => {
        const icon = getApiIcon(api);
        // 提取首字
        const firstChar = api.name?.charAt(0) || "?";
        return {
          ...api,
          icon: icon,
          firstChar: firstChar,
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch APIs:", error);
    return [];
  }
}

export async function fetchApiDetail(id: string): Promise<ApiDetail | null> {
  try {
    const response = await apiService.getApiDetail(id);
    // 直接使用响应数据，因为request函数已经返回了data.data
    const data = response;

    if (!data) return null;

    // 处理新的数据格式
    const icon = getApiIcon(data);
    // 提取首字
    const firstChar = data.name?.charAt(0) || "?";

    const apiDetail: ApiDetail = {
      ...data,
      // 解析request_params为数组
      params: data.request_params ? JSON.parse(data.request_params) : [],
      // 兼容旧格式字段
      url: data.target_url,
      requestExample: `{\n  ${
        data.request_params
          ? JSON.parse(data.request_params)
              .map(
                (param: any) =>
                  `"${param.name}": "${param.example || param.name}"`,
              )
              .join(",\n  ")
          : ""
      }\n}`,
      responseExample: data.response_example,
      // 添加图标字段
      icon: icon,
      // 添加首字字段
      firstChar: firstChar,
    };

    return apiDetail;
  } catch (error) {
    console.error("Failed to fetch API detail:", error);
    return null;
  }
}

// 导出测试API的函数
export async function testApi(id: string, data?: any): Promise<any> {
  try {
    const response = await apiService.testApi(id, data);
    // 从响应中提取data字段
    return response;
  } catch (error) {
    console.error("Failed to test API:", error);
    throw error;
  }
}

// 导出天气查询函数
export async function fetchWeather(city: string): Promise<any> {
  try {
    const response = await apiService.getWeather(city);
    // 直接返回响应数据，因为request函数已经返回了data.data
    return response;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    throw error;
  }
}
