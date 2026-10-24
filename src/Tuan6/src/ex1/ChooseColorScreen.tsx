import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  const onDone = () => {
    // Từ React Navigation 7, navigate() không còn tự "quay lại" màn đã có trong stack
    // (nó sẽ push thêm màn mới). popTo() quay về Product và gộp params vào màn đó.
    navigation.popTo("Product", { color: picked });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.small, styles.bold]}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG */}
        <Pressable style={styles.doneBtn} onPress={onDone}>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  thumb: { width: 85, height: 105 },
  headerText: { flex: 1, marginLeft: 12 },
  small: { fontSize: 14, color: colors.text, marginBottom: 4 },
  bold: { fontWeight: "700" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 20, alignItems: "center" },
  hint: { fontSize: 16, color: colors.text, alignSelf: "flex-start", marginBottom: 16 },
  swatches: { alignItems: "center", gap: 16, marginBottom: 24 },
  swatch: { width: 85, height: 80, borderWidth: 2, borderColor: "transparent" },
  swatchOn: { borderColor: colors.navy, borderWidth: 4 },
  doneBtn: {
    alignSelf: "stretch",
    height: 48,
    backgroundColor: colors.blue,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  doneText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
