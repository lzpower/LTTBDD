# TRẢ LỜI CÂU HỎI BỔ SUNG — BUỔI 7

## Câu 1. Cấu trúc điều hướng

`BookDetail` được đặt trong Native Stack vì đây là màn hình chi tiết được mở từ Home, không phải một mục điều hướng chính. Khi mở `BookDetail`, màn hình sẽ che Bottom Tab Bar và tự động có nút quay lại màn hình trước. Nếu đặt `BookDetail` trong Bottom Tab, thanh tab vẫn hiển thị và màn hình Chi tiết sẽ trở thành một tab riêng, không phù hợp với luồng điều hướng của ứng dụng BookStore.

## Câu 2. Redux Toolkit

Redux Toolkit sử dụng Immer, cho phép viết code như đang thay đổi state trực tiếp nhưng thực tế Immer tạo ra state mới bất biến. Nếu bỏ `useMemo` trong `useCart`, kết quả tổng số lượng và tổng tiền vẫn chính xác. Tuy nhiên, phép tính `reduce()` sẽ chạy lại mỗi khi component render, kể cả khi danh sách giỏ không đổi, làm giảm hiệu suất nếu dữ liệu lớn.

## Câu 3. Promise.all

Khi dùng `Promise.all()`, nếu `getCategories()` lỗi thì cả Promise bị reject và Home hiển thị `ErrorView` dù `getBooks()` thành công. Có thể dùng `Promise.allSettled()` để xử lý riêng từng kết quả, cho phép Home vẫn hiển thị danh sách sách nếu API danh mục lỗi. Đánh đổi là giao diện có thể thiếu danh mục và phải bổ sung xử lý dữ liệu không đầy đủ cũng như thông báo lỗi phù hợp.

Ví dụ:

```tsx
const [booksResult, categoriesResult] = await Promise.allSettled([
  getBooks(),
  getCategories(),
]);

if (booksResult.status === "fulfilled") {
  setBooks(booksResult.value);
} else {
  throw booksResult.reason;
}

if (categoriesResult.status === "fulfilled") {
  setCategories(categoriesResult.value);
} else {
  setCategories([]);
}
```

## Câu 4. Debounce

Không nên đặt `setTimeout` trực tiếp trong `onChangeText` vì mỗi lần gõ ký tự lại tạo một timer mới, khiến nhiều lần lọc có thể chạy liên tiếp. Hook `useDebounce` quản lý timer qua `useEffect` và chỉ cập nhật sau 400 ms ngừng nhập. Hàm cleanup `clearTimeout` hủy timer cũ khi từ khóa thay đổi hoặc component unmount, tránh cập nhật dư thừa và kết quả sai thời điểm.

## Câu 5. Sắp xếp theo giá

Dùng một state `sortOrder` để lưu cách sắp xếp tăng dần hoặc giảm dần. Trong `useMemo`, lọc sách rồi gọi `sort()` trên bản sao mảng để không sửa dữ liệu gốc. Khi đổi lựa chọn, `visibleBooks` sẽ được tính lại và hiển thị thứ tự mới.

Thêm state vào `HomeScreen.tsx`:

```tsx
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
```

Thay `visibleBooks`:

```tsx
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword,
    categoryId,
    priceRange,
  });
  return [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```

Thêm hai nút chọn trong `ListHeaderComponent` của `BookGrid`, dưới `PriceFilter`:

```tsx
<View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
  <Pressable onPress={() => setSortOrder("asc")}>
    <Text style={{ color: sortOrder === "asc" ? colors.indigo : colors.text }}>
      Giá tăng dần
    </Text>
  </Pressable>
  <Pressable onPress={() => setSortOrder("desc")}>
    <Text style={{ color: sortOrder === "desc" ? colors.indigo : colors.text }}>
      Giá giảm dần
    </Text>
  </Pressable>
</View>
```

**Ảnh minh chứng:** Chèn ảnh chụp màn hình Home sau khi chọn Giá tăng dần và Giá giảm dần vào đây trước khi nộp bài.
