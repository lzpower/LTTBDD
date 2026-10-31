
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header } from "../components/Header";
import { useAuth } from "../store/hooks";
import { colors, radius } from "../theme";

export function AccountScreen() {
  const {
    user,
    isLoggedIn,
    signIn,
    signOut,
  } = useAuth();

  // BT7.4d: Đăng nhập thử bằng tài khoản giả
  const handleSignIn = () => {
    signIn(
      {
        id: 1,
        name: "Học viên Demo",
        email: "demo@bookstore.vn",
      },
      "fake-token"
    );
  };

  // BT7.4d: Đăng xuất
  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Header title="👤 Tài khoản" />

      {/* BT7.4c: Giao diện đã đăng nhập */}
      {isLoggedIn && user ? (
        <View style={styles.box}>
          <Text style={styles.avatar}>🙂</Text>

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.email}>
            {user.email}
          </Text>

          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={handleSignOut}
          >
            <Text style={styles.btnOutlineText}>
              Đăng xuất
            </Text>
          </Pressable>
        </View>
      ) : (
        /* BT7.4c: Giao diện chưa đăng nhập */
        <View style={styles.box}>
          <Text style={styles.avatar}>🔒</Text>

          <Text style={styles.name}>
            Bạn chưa đăng nhập
          </Text>

          <Pressable
            style={styles.btn}
            onPress={handleSignIn}
          >
            <Text style={styles.btnText}>
              Đăng nhập thử (dữ liệu giả)
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  box: {
    alignItems: "center",
    padding: 24,
    gap: 8,
  },

  avatar: {
    fontSize: 64,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  email: {
    color: colors.muted,
  },

  btn: {
    backgroundColor: colors.indigo,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    marginTop: 12,
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
  },

  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.indigo,
  },

  btnOutlineText: {
    color: colors.indigo,
    fontWeight: "800",
  },
});
