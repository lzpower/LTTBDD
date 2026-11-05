import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// BT8.5a: component sao dùng lại — chỉ hiển thị (value) hoặc bấm chọn (onChange)
export function RatingStars({ value, size = 18, onChange }: Props) {
  const rounded = Math.round(value);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text style={{ fontSize: size, color: n <= rounded ? colors.warning : colors.line }}>★</Text>
        );
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} accessibilityLabel={`${n} sao`} hitSlop={4}>
            {star}
          </Pressable>
        ) : (
          <View key={n} accessibilityLabel={`${n} sao`}>{star}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
});
