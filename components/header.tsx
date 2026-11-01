import { FONTS, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  streak: number;
  wordsDiscoveredCount: number;
};

export default function Header({ streak, wordsDiscoveredCount }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.primary }]}>ETYMO</Text>
      <View style={styles.stats}>
        <View
          style={[
            styles.stat,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={[styles.statText, { color: colors.primary }]}>
            {streak}
          </Text>
        </View>

        <View
          style={[
            styles.stat,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={styles.statEmoji}>📖</Text>
          <Text style={[styles.statText, { color: colors.primary }]}>
            {wordsDiscoveredCount}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  logo: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
  },
  stats: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  statEmoji: {
    fontSize: 14,
  },
  statText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
  },
});
