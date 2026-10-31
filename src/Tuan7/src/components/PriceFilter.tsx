
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import {
  PriceRange,
  PRICE_RANGES,
} from "../utils/filters";

import { colors, radius } from "../theme";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// BT7.C2: Ba nút lọc khoảng giá
export function PriceFilter({
  value,
  onChange,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;

        return (
          <Pressable
            key={range.key}
            style={[
              styles.chip,
              active && styles.chipActive,
            ]}
            onPress={() =>
              onChange(active ? null : range.key)
            }
          >
            <Text
              style={[
                styles.text,
                active && styles.textActive,
              ]}
            >
              {range.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
  },

  chipActive: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },

  text: {
    color: colors.text,
    fontWeight: "600",
  },

  textActive: {
    color: "#fff",
    fontWeight: "700",
  },
});
