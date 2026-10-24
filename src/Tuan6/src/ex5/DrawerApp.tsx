import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): đưa notify / dark lên Context
interface SettingsCtx {
  notify: boolean;
  setNotify: (v: boolean) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}
const SettingsContext = createContext<SettingsCtx | null>(null);
function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsContext.Provider");
  return ctx;
}

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

function HomeScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.centerDark]}>
      <Text style={[s.big, dark && s.textDark]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.centerDark]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, dark && s.textDark]}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const t = [s.label, dark && s.textDark];
  return (
    <View style={[s.settings, dark && s.centerDark]}>
      <View style={s.settingRow}>
        <Text style={t}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.settingRow}>
        <Text style={t}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, dark && s.textDark]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// TODO 2
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  centerDark: { backgroundColor: "#121212" },
  textDark: { color: "#f2f2f2" },
  big: { fontSize: 24, fontWeight: "800", color: colors.text },
  muted: { fontSize: 15, color: colors.muted, marginTop: 4 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "700" },
  settings: { flex: 1, backgroundColor: "#fff", padding: 24 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  label: { fontSize: 17, color: colors.text },
  status: { marginTop: 24, fontSize: 15, color: colors.text },
});
