
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { EmptyState } from "../components/EmptyState";

import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";

import { useCart } from "../store/hooks";
import { useDebounce } from "../hooks/useDebounce";

import {
  filterBooks,
  PriceRange,
} from "../utils/filters";

import { Book, Category } from "../types";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function HomeScreen({
  navigation,
  route,
}: TabScreenProps<"Home">) {

  // BT7.3d: Redux giỏ hàng
  const { totalQuantity } = useCart();

  // BT7.5b: Dữ liệu API
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  // Tìm kiếm và lọc
  const [searchOpen, setSearchOpen] =
    useState(false);

  const [keyword, setKeyword] = useState("");

  const [categoryId, setCategoryId] =
    useState<number | null>(null);

  const [priceRange, setPriceRange] =
    useState<PriceRange>(null);
  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">("asc");
  // BT7.7a: Debounce 400ms
  const debouncedKeyword = useDebounce(
    keyword,
    400
  );

  // BT7.5b: Gọi hai API song song
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [bookData, categoryData] =
        await Promise.all([
          getBooks(),
          getCategories(),
        ]);

      setBooks(bookData);
      setCategories(categoryData);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ===========================================
  // BT7.8b: Nhận categoryId từ tab Danh mục
  // ===========================================
  useEffect(() => {
    const id = route.params?.categoryId;

    if (id !== undefined) {
      // Chọn danh mục được truyền sang
      setCategoryId(id);

      // Xóa tham số để tránh áp dụng lại
      navigation.setParams({
        categoryId: undefined,
      });
    }
  }, [route.params?.categoryId, navigation]);

  // BT7.7c + BT7.8a: Lọc kết hợp

  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });

    return [...filtered].sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price
    );
  }, [
    books,
    debouncedKeyword,
    categoryId,
    priceRange,
    sortOrder,
  ]);


  // Xóa toàn bộ điều kiện lọc
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  // Chỉ hiện nút xóa khi có bộ lọc
  const hasFilter =
    keyword.trim() !== "" ||
    categoryId !== null ||
    priceRange !== null;

  return (
    <View style={styles.container}>

      <Header
        title="📚 BookStore"
        onSearchPress={() =>
          setSearchOpen((prev) => !prev)
        }
      />

      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}

      {/* BT7.5: API loading/error */}
      {loading ? (
        <LoadingView
          label="Đang tải sách…"
        />
      ) : error ? (
        <ErrorView
          message={error}
          onRetry={load}
        />
      ) : (
        <BookGrid
          data={visibleBooks}

          // BT7.2: Điều hướng chi tiết sách
          onPressBook={(book) =>
            navigation.navigate("BookDetail", {
              bookId: book.id,
            })
          }

          // BT7.7d: Không có kết quả
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }

          ListHeaderComponent={
            <View>
              {/* Chip danh mục */}
              <CategoryChips
                categories={categories}
                selectedId={categoryId}
                onSelect={setCategoryId}
              />

              {/* Thử thách BT7.C2 */}
              <PriceFilter
                value={priceRange}
                onChange={setPriceRange}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  padding: 12,
                }}
              >
                <Pressable
                  onPress={() => setSortOrder("asc")}
                >
                  <Text
                    style={{
                      color:
                        sortOrder === "asc"
                          ? colors.indigo
                          : colors.text,
                      fontWeight: "700",
                    }}
                  >
                    Giá tăng dần
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSortOrder("desc")}
                >
                  <Text
                    style={{
                      color:
                        sortOrder === "desc"
                          ? colors.indigo
                          : colors.text,
                      fontWeight: "700",
                    }}
                  >
                    Giá giảm dần
                  </Text>
                </Pressable>
              </View>

              {/* BT7.7e: Nút xóa bộ lọc */}
              {hasFilter && (
                <Pressable
                  style={styles.clearButton}
                  onPress={clearFilters}
                >
                  <Text
                    style={styles.clearButtonText}
                  >
                    ✕ Xóa bộ lọc
                  </Text>
                </Pressable>
              )}
            </View>
          }
        />
      )}

      {/* BT7.3d: Giỏ nổi */}
      <FloatingCartButton
        count={totalQuantity}
        onPress={() =>
          navigation.navigate("Cart")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  clearButton: {
    alignSelf: "flex-start",
    marginVertical: 8,
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E8E9FF",
  },

  clearButtonText: {
    color: colors.indigo,
    fontSize: 14,
    fontWeight: "700",
  },
});
