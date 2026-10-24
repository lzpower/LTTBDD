import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}

// TODO 1
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const q = keyword.trim().toLowerCase();
  const results = PHONES.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {results.length === 0 ? (
        <Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text>{item.name.split(" - ")[0]}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// TODO 2
function ProfileTab() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>N</Text>
      </View>
      <Text style={s.name}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 3
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24, fontSize: 15 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "700" },
  name: { fontSize: 24, fontWeight: "800", color: colors.text },
  muted: { fontSize: 15, color: colors.muted, marginTop: 4 },
});
