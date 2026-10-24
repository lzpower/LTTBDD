import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import { useFavorites } from "./FavoritesContext";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  const { has } = useFavorites();
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
      {has(phone.id) && <Text style={styles.heart}>♥</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 10,
  },
  thumb: { width: 40, height: 60, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text },
  price: { fontSize: 14, color: colors.muted, marginTop: 4 },
  heart: { fontSize: 20, color: colors.red },
});
