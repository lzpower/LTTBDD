
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const clamp = (q: number, stock: number) =>
  Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sách vào giỏ
    addItem(
      state,
      action: PayloadAction<Omit<CartItem, "quantity">>
    ) {
      const book = action.payload;

      const existingItem = state.items.find(
        (item) => item.bookId === book.bookId
      );

      if (existingItem) {
        existingItem.quantity = clamp(
          existingItem.quantity + 1,
          existingItem.stock
        );
      } else if (book.stock > 0) {
        state.items.push({
          ...book,
          quantity: 1,
        });
      }
    },

    // Xóa một sách khỏi giỏ
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload
      );
    },

    // Thay đổi số lượng
    setQuantity(
      state,
      action: PayloadAction<{
        bookId: number;
        quantity: number;
      }>
    ) {
      const item = state.items.find(
        (i) => i.bookId === action.payload.bookId
      );

      if (item) {
        item.quantity = clamp(
          action.payload.quantity,
          item.stock
        );
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
    },

    // Giữ nguyên chức năng có sẵn
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  setQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
