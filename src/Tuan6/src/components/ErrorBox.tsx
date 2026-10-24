import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Có lỗi xảy ra</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: { fontSize: 20, fontWeight: "700", color: colors.red, marginBottom: 8 },
  message: { fontSize: 15, color: colors.text, textAlign: "center", marginBottom: 20 },
  btn: { backgroundColor: colors.blue, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
