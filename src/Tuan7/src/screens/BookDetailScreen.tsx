
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";

import {
  useCart,
  useWishlist,
} from "../store/hooks";

import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function BookDetailScreen({
  route,
}: RootScreenProps<"BookDetail">) {

  // BT7.2: Nhận mã sách
  const { bookId } = route.params;

  // BT7.3: Giỏ hàng Redux
  const { add } = useCart();

  // BT7.C1: Wishlist Redux
  const { isFavorite, toggle } = useWishlist();

  // Kiểm tra sách có được yêu thích hay không
  const favorite = isFavorite(bookId);

  // BT7.5: State dữ liệu API
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  // BT7.5: Lấy chi tiết sách
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setBook(null);

    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  // Đang tải
  if (loading) {
    return (
      <LoadingView label="Đang tải chi tiết sách…" />
    );
  }

  // Có lỗi
  if (error || !book) {
    return (
      <ErrorView
        message={error ?? "Không tìm thấy sách."}
        onRetry={load}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Bìa sách */}
      <View
        style={[
          styles.cover,
          { backgroundColor: book.color },
        ]}
      >
        <Text style={styles.emoji}>
          {book.emoji}
        </Text>

        {/* BT7.C1: Nút yêu thích */}
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggle(book.id)}
          accessibilityRole="button"
          accessibilityLabel={
            favorite
              ? "Bỏ yêu thích"
              : "Thêm vào yêu thích"
          }
        >
          <Text
            style={[
              styles.heart,
              favorite && styles.heartActive,
            ]}
          >
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      {/* Thông tin sách */}
      <Text style={styles.title}>
        {book.title}
      </Text>

      <Text style={styles.author}>
        {book.author}
      </Text>

      <Text style={styles.price}>
        {formatPrice(book.price)}
      </Text>

      <Text style={styles.stock}>
        Còn {book.stock} cuốn
      </Text>

      <Text style={styles.desc}>
        {book.description}
      </Text>

      {/* BT7.C1: Trạng thái yêu thích */}
      {favorite && (
        <Text style={styles.favoriteStatus}>
          ♥ Đã thêm vào danh sách yêu thích
        </Text>
      )}

      {/* BT7.3: Thêm vào giỏ */}
      <Pressable
        style={[
          styles.btn,
          book.stock <= 0 && styles.btnDisabled,
        ]}
        disabled={book.stock <= 0}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.btnText}>
          {book.stock > 0
            ? "Thêm vào giỏ"
            : "Hết hàng"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 16,
    gap: 8,
  },

  cover: {
    height: 220,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  emoji: {
    fontSize: 90,
  },

  // Nút trái tim góc phải bìa sách
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  heart: {
    fontSize: 34,
    color: "#777777",
  },

  heartActive: {
    color: "#E53935",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginTop: 8,
  },

  author: {
    color: colors.muted,
    fontSize: 15,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.indigo,
  },

  stock: {
    color: colors.muted,
  },

  desc: {
    color: colors.text,
    lineHeight: 22,
    marginTop: 4,
  },

  favoriteStatus: {
    color: "#E53935",
    fontWeight: "700",
    marginTop: 8,
  },

  btn: {
    backgroundColor: colors.indigo,
    padding: 14,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: 12,
  },

  btnDisabled: {
    opacity: 0.4,
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
