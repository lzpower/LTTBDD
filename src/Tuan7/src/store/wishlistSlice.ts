
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
}

const initialState: WishlistState = {
  ids: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // BT7.C1: Thêm hoặc xóa sách yêu thích
    toggleWishlist(state, action: PayloadAction<number>) {
      const bookId = action.payload;

      const index = state.ids.indexOf(bookId);

      if (index !== -1) {
        // Sách đã yêu thích -> bỏ yêu thích
        state.ids.splice(index, 1);
      } else {
        // Sách chưa yêu thích -> thêm vào
        state.ids.push(bookId);
      }
    },

    // Giữ lại reducer có sẵn trong Starter
    hydrateWishlist(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
  },
});

export const {
  toggleWishlist,
  hydrateWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
