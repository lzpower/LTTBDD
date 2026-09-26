// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Minh hoạ riêng: Bài 1 (TabBar) + Bài 2 (CartScreen, đủ 3 vùng: cuộn / tổng tiền
// cố định / tab bar cố định). 3 tab còn lại (Trang chủ, Danh mục, Tài khoản) chỉ để
// TabBar có đủ 4 mục thật như đề bài — nội dung của chúng thuộc Giờ 2 và Giờ 4,
// nên ở đây chỉ để placeholder, tránh trùng lặp code với project gio2/gio4.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { CartScreen } from './screens/CartScreen';
import { CART_ITEMS, BOOKS } from './data';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CategoryChips } from './components/CategoryChips';
import { Header } from './components/Header';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('cart');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}   
            onPressCart={() => setActiveTab("cart")}
          />
        );
      case "cart":
        return <CartScreen items={CART_ITEMS} />;
      case "category":
        return <CategoryChips/>;
      case "account":
        return <Placeholder tab={activeTab} />;
      default:
        return <HomeScreen cartCount={0} onPressBook={() => {}} onPressCart={() => {}} />;
    }
  };

  // 👇 Đang xem chi tiết 1 cuốn sách -> full screen riêng, KHÔNG có Header/TabBar
  if (selectedBook) {
    return (
      <SafeAreaView style={styles.root}>
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => setCartCount((n) => n + 1)} // hoặc tăng cartCount tuỳ bạn
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        <Header/>
        {renderScreen()}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: 'Nội dung tab "Trang chủ" thuộc Giờ 4 — xem project bookstore-online-gio4.',
    category: 'Nội dung tab "Danh mục" thuộc Giờ 2 — xem project bookstore-online-gio2.',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});
