
import { api } from "../api/client";
import { Book } from "../types";

export interface BookQuery {
  categoryId?: number;
  q?: string;
}

// BT7.5a: Lấy danh sách sách
export async function getBooks(
  params?: BookQuery
): Promise<Book[]> {
  const res = await api.get<Book[]>("/books", {
    params,
  });

  return res.data;
}

// BT7.5a: Lấy chi tiết một cuốn sách
export async function getBookById(
  id: number
): Promise<Book> {
  const res = await api.get<Book>(
    `/books/${id}`
  );

  return res.data;
}
