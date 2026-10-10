// components/MovieCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  poster: string;
  watched: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
  layout?: 'row' | 'poster';
}

function MovieCard({ movie, onSelect, layout = 'row' }: MovieCardProps) {
  const rating = Number(movie.rating).toFixed(1);

  if (layout === 'poster') {
    return (
      <Pressable style={styles.posterCard} onPress={() => onSelect(movie.id)}>
        <View style={styles.posterWrap}>
          <Image source={{ uri: movie.poster }} style={styles.posterImg} />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>⭐ {rating}</Text>
          </View>
          {movie.watched && (
            <View style={styles.watchedChip}>
              <Text style={styles.watchedChipText}>✓ Đã xem</Text>
            </View>
          )}
        </View>
        <Text style={styles.posterTitle} numberOfLines={2}>
          {movie.title}
        </Text>
      </Pressable>
    );
  }
  const displayYear = movie.year
    ? new Date(movie.year).getFullYear()
    : 'Chưa rõ';
  return (
    <Pressable style={styles.rowCard} onPress={() => onSelect(movie.id)}>
      <Image source={{ uri: movie.poster }} style={styles.rowPoster} />
      <View style={styles.rowInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.sub}>
          {movie.director} · {displayYear}
        </Text>
        <Text style={styles.sub}>⭐ {Number(movie.rating).toFixed(1)}</Text>
        <Text style={styles.sub}>
          {movie.watched ? '✅ Đã xem' : '🎬 Chưa xem'}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  // ----- dạng row -----
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rowPoster: {
    width: 70,
    height: 105,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  rowInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  sub: { fontSize: 14, color: '#555', marginTop: 2 },

  // ----- dạng poster -----
  posterCard: { width: '48%', marginBottom: 12 },
  posterWrap: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  posterImg: { width: '100%', height: '100%' },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ratingBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  watchedChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  watchedChipText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  posterTitle: { marginTop: 6, fontSize: 14, fontWeight: '600' },
});
