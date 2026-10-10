// App.tsx — STARTER
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  Switch,
  Alert,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState, useMemo } from 'react';
import MovieCard, { Movie } from './components/MovieCard';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// TODO: dán URL API của BẠN (tạo trên mockapi.io) vào đây.
export const API_URL = 'https://6aca1eee3115bcc9582066ed.mockapi.io/movie';

// Hàm gọi API (GET) — GIỮ NGUYÊN, không xoá.
export async function fetchMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Gọi API thất bại: ' + res.status);
  }
  return res.json();
}
export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // tải lần đầu / bấm Thử lại
  const [refreshing, setRefreshing] = useState(false); // kéo để làm mới
  const [error, setError] = useState(false);
  const [posterMode, setPosterMode] = useState(false);
  const [onlyUnwatched, setOnlyUnwatched] = useState(false);

  // Hàm tải dữ liệu dùng chung, không đụng tới posterMode / onlyUnwatched
  const fetchData = useCallback(async () => {
    try {
      setError(false);
      const data = await fetchMovies();
      setMovies(data);
    } catch (e) {
      setError(true);
    }
  }, []);

  // Tải lần đầu và nút "Thử lại"
  const load = useCallback(async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  }, [fetchData]);

  // Kéo xuống để làm mới: luôn tắt vòng xoay, kể cả khi lỗi
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSelect = useCallback(
    (id: string) => {
      const m = movies.find((x) => String(x.id) === String(id));
      if (!m) return;
      const message = 'Đạo diễn: ' + m.director;
      if (Platform.OS === 'web') {
        window.alert(m.title + '\n' + message);
      } else {
        Alert.alert(m.title, message);
      }
    },
    [movies]
  );

  const filteredMovies = useMemo(
    () => (onlyUnwatched ? movies.filter((m) => !m.watched) : movies),
    [movies, onlyUnwatched]
  );

  let body;
  if (loading) {
    body = <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  } else if (error) {
    body = (
      <View style={styles.center}>
        <Text style={styles.error}>Không tải được danh sách phim.</Text>
        <Button title="Thử lại" onPress={load} />
      </View>
    );
  } else {
    body = (
      <FlatList
        key={posterMode ? 'poster' : 'row'}
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        numColumns={posterMode ? 2 : 1}
        columnWrapperStyle={posterMode ? styles.columnWrap : undefined}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Không có phim nào để hiển thị.</Text>
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onSelect={handleSelect}
            layout={posterMode ? 'poster' : 'row'}
          />
        )}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Movie Watchlist</Text>

        <View style={styles.switchRow}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Dạng poster</Text>
            <Switch value={posterMode} onValueChange={setPosterMode} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Chưa xem</Text>
            <Switch value={onlyUnwatched} onValueChange={setOnlyUnwatched} />
          </View>
        </View>
        {body}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f6' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  switchLabel: { fontSize: 16 },
  list: { padding: 16, flexGrow: 1 },
  center: { alignItems: 'center', marginTop: 40 },
  error: { color: 'red', marginBottom: 12, fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#666', fontSize: 16 },
  columnWrap: { justifyContent: 'space-between' },
});
