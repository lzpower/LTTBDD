import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { FavoritesProvider } from "./FavoritesContext";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { ProductsTab } from "./ProductsTab";
import type { RootStackParamList, TabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// TODO 1
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.red }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{
          title: "Sản phẩm",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "phone-portrait" : "phone-portrait-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// TODO 2
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ title: "Cửa hàng" }} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
