import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PHONES } from "./src/data/phones";
import { useState } from 'react';
import { colors } from './src/theme';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';

export default function App() {

  return (

      <SafeAreaProvider>
        {/* <SelectPhoneApp phone={PHONES[0]} /> */}
        {/* <SelectPhoneApi/> */}
        {/* <BottomTabApp /> */}
        {/* <StackTabApp /> */}
        <DrawerApp />
      </SafeAreaProvider>
    );

}

// type Lab = "menu" | "ex1" | "ex2" | "ex3" | "ex4" | "ex5";

// const ITEMS: { key: Exclude<Lab, "menu">; title: string; sub: string }[] = [
//   { key: "ex1", title: "Bài 1 — Select Phone", sub: "Stack + truyền params (dữ liệu mẫu)" },
//   { key: "ex2", title: "Bài 2 — Gắn API", sub: "fetch + loading / lỗi / thử lại" },
//   { key: "ex3", title: "Bài 3 — Bottom Tab", sub: "Home / Search / Profile" },
//   { key: "ex4", title: "Bài 4 — Stack + Tab + Params", sub: "Products / Favorites / ProductDetails" },
//   { key: "ex5", title: "Bài 5 — Drawer", sub: "Home / Profile / Settings" },
// ];

// export default function App() {
//   const [lab, setLab] = useState<Lab>("menu");

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle="dark-content" />
//       {lab === "menu" ? (
//         <SafeAreaView style={styles.menu}>
//           <Text style={styles.heading}>Lab 06 — Navigation</Text>
//           {ITEMS.map((it) => (
//             <Pressable key={it.key} style={styles.item} onPress={() => setLab(it.key)}>
//               <Text style={styles.itemTitle}>{it.title}</Text>
//               <Text style={styles.itemSub}>{it.sub}</Text>
//             </Pressable>
//           ))}
//         </SafeAreaView>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <View style={{ flex: 1 }}>
//             {lab === "ex1" && <SelectPhoneApp phone={PHONES[0]} />}
//             {lab === "ex2" && <SelectPhoneApi />}
//             {lab === "ex3" && <BottomTabApp />}
//             {lab === "ex4" && <StackTabApp />}
//             {lab === "ex5" && <DrawerApp />}
//           </View>
//           <SafeAreaView edges={["bottom"]} style={styles.backBar}>
//             <Pressable onPress={() => setLab("menu")} style={styles.backBtn}>
//               <Text style={styles.backText}>← Về menu</Text>
//             </Pressable>
//           </SafeAreaView>
//         </View>
//       )}
//     </SafeAreaProvider>
//   );
// }

const styles = StyleSheet.create({
  menu: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  heading: { fontSize: 24, fontWeight: "800", color: colors.navy, marginVertical: 16 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  itemTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  itemSub: { fontSize: 13, color: colors.muted, marginTop: 4 },
  backBar: { backgroundColor: colors.navy },
  backBtn: { paddingVertical: 8, alignItems: "center" },
  backText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});

