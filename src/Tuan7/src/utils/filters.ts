
import { Book } from "../types";

// Bỏ dấu tiếng Việt và không phân biệt hoa thường
export const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

// Các khoảng giá
export type PriceRange =
  | "lt100"
  | "100to300"
  | "gt300"
  | null;

export const PRICE_RANGES: {
  key: Exclude<PriceRange, null>;
  label: string;
}[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

// BT7.C2: Kiểm tra giá sách thuộc khoảng nào
const inRange = (
  price: number,
  range: PriceRange
): boolean => {
  switch (range) {
    case "lt100":
      return price < 100000;

    case "100to300":
      return price >= 100000 && price <= 300000;

    case "gt300":
      return price > 300000;

    default:
      return true;
  }
};

// Các điều kiện lọc
export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// BT7.7 + BT7.8 + BT7.C2
// Lọc kết hợp từ khóa, danh mục và giá
export function filterBooks(
  books: Book[],
  f: BookFilter
): Book[] {
  const keyword = normalize(f.keyword);

  return books.filter((book) => {
    // 1. Lọc theo từ khóa
    const matchKeyword =
      keyword === "" ||
      normalize(book.title).includes(keyword) ||
      normalize(book.author).includes(keyword);

    // 2. Lọc theo danh mục
    const matchCategory =
      f.categoryId === null ||
      book.categoryId === f.categoryId;

    // 3. Lọc theo khoảng giá
    const matchPrice = inRange(
      book.price,
      f.priceRange
    );

    // Phải thỏa mãn cả 3 điều kiện
    return (
      matchKeyword &&
      matchCategory &&
      matchPrice
    );
  });
}
