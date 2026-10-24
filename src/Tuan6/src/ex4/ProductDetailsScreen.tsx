import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params; // TODO 4
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  // TODO 6 + 7
  return (
    <View style={styles.root}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      <Text style={styles.muted}>
        Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
      </Text>

      <Pressable
        style={[styles.btn, saved && styles.btnOn]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.btnText, saved && { color: "#fff" }]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 16, alignItems: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 180, height: 260, marginVertical: 12 },
  name: { fontSize: 18, fontWeight: "700", color: colors.text, textAlign: "center", marginBottom: 8 },
  price: { fontSize: 22, fontWeight: "800", color: colors.red, marginVertical: 8 },
  muted: { color: colors.muted, fontSize: 15 },
  bold: { fontWeight: "700", color: colors.text },
  btn: {
    marginTop: 24,
    alignSelf: "stretch",
    height: 48,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  btnOn: { backgroundColor: colors.red },
  btnText: { color: colors.red, fontWeight: "700", fontSize: 16 },
});
