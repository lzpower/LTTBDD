// GIỜ 1 — Nền tảng Flexbox & Layout đơn giản
// Minh hoạ riêng: Bài 1 (Header) + Bài 2 (BookRowCard) + Thử thách giờ 1
// (Header cố định trên cùng + danh sách Book Card xếp chồng theo cột bên dưới).
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { BookRowCard } from './components/BookRowCard';
import { BOOKS } from './data';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handlePressBook = (book: any) => {
    setCartCount((count) => count + 1);

    Alert.alert(
      'Đã thêm vào giỏ hàng',
      `${book.title} đã được thêm vào giỏ hàng.`
    );
  };

  const handlePressCart = () => {
    Alert.alert(
      'Giỏ hàng',
      `Bạn đang có ${cartCount} sản phẩm trong giỏ hàng.`
    );
  };

  return (
    
    <View style={styles.screen}>
      <Header />
      {/* flex:1 cho vùng nội dung -> chiếm hết phần còn lại của màn hình sau Header,
          đúng yêu cầu "Thử thách giờ 1". */}
      <ScrollView contentContainerStyle={styles.list}>
        {/* {BOOKS.map((book) => (
          <BookRowCard key={book.id} book={book} />
          
        ))} */}
        <Text >Danh mục</Text>

<CategoryChips />
{/* style={styles.sectionTitle} */}
<Text >Sách nổi bật</Text>

<BookGrid
  books={BOOKS}
  onPressBook={handlePressBook}
/>

      </ScrollView>

       <FloatingCartButton
        count={cartCount}
        onPress={handlePressCart}
      />
      <StatusBar style="auto" />
    </View>
  );
      }

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 12, gap: 10 },
});
