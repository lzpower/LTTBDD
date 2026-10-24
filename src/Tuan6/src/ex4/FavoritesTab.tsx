import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8
  const { ids } = useFavorites();
  const list = PHONES.filter((p) => ids.includes(p.id));

  if (list.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: colors.muted, fontSize: 16 },
});
