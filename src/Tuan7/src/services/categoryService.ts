import { api } from "../api/client";
import { Category } from "../types";

// BT7.6a: Lấy danh sách danh mục từ API
export async function getCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>("/categories");

  return res.data;
}
