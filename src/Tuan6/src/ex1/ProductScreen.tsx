import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.help}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút chọn màu */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút CHỌN MUA sát đáy */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 12 },
  image: { width: "70%", height: "100%" },
  info: { paddingBottom: 12 },
  name: { fontSize: 15, color: colors.text, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  review: { marginLeft: 12, fontSize: 13, color: colors.muted },
  price: { fontSize: 18, fontWeight: "700", color: colors.text },
  oldPrice: {
    marginLeft: 20,
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: { fontSize: 12, fontWeight: "700", color: colors.red },
  help: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  helpText: { fontSize: 11, color: colors.muted },
  chooseBtn: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  chooseText: { fontSize: 14, fontWeight: "600", color: colors.text },
  chevron: { position: "absolute", right: 12, fontSize: 18, color: colors.muted },
  buyBtn: {
    height: 48,
    backgroundColor: colors.red,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buyText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
