import { useTheme } from "@/context/theme-context";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabName = "game" | "library" | "graph" | "profile";

type Props = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
};

export default function BottomNav({ activeTab, onTabPress }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.nav,
        { backgroundColor: colors.surface, borderTopColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress("game")}
      >
        <Image
          source={require("@/assets/images/home.png")}
          style={[styles.navIcon, activeTab === "game" && styles.activeIcon]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.navLabel,
            { color: colors.textTertiary },
            activeTab === "game" && { color: colors.primary },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress("library")}
      >
        <Image
          source={require("@/assets/images/book.png")}
          style={[styles.navIcon, activeTab === "library" && styles.activeIcon]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.navLabel,
            { color: colors.textTertiary },
            activeTab === "library" && { color: colors.primary },
          ]}
        >
          Biblioteca
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress("graph")}
      >
        <Image
          source={require("@/assets/images/map.png")}
          style={[styles.navIcon, activeTab === "graph" && styles.activeIcon]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.navLabel,
            { color: colors.textTertiary },
            activeTab === "graph" && { color: colors.primary },
          ]}
        >
          Mappa
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress("profile")}
      >
        <Image
          source={require("@/assets/images/profile.png")}
          style={[styles.navIcon, activeTab === "profile" && styles.activeIcon]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.navLabel,
            { color: colors.textTertiary },
            activeTab === "profile" && { color: colors.primary },
          ]}
        >
          Profilo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    height: 80,
    borderTopWidth: 1,
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
});
