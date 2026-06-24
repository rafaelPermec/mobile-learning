import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  fire:     { bg: "#FF9741", text: "#fff" },
  water:    { bg: "#3692DC", text: "#fff" },
  grass:    { bg: "#38BF4B", text: "#fff" },
  electric: { bg: "#FBD100", text: "#1a1a2e" },
  psychic:  { bg: "#FF6675", text: "#fff" },
  ice:      { bg: "#70CBD4", text: "#1a1a2e" },
  dragon:   { bg: "#5060E1", text: "#fff" },
  dark:     { bg: "#5A5465", text: "#fff" },
  fairy:    { bg: "#FB89EB", text: "#1a1a2e" },
  fighting: { bg: "#D56723", text: "#fff" },
  poison:   { bg: "#A040A0", text: "#fff" },
  ground:   { bg: "#E0C068", text: "#1a1a2e" },
  flying:   { bg: "#3DC7EF", text: "#1a1a2e" },
  bug:      { bg: "#A8B820", text: "#fff" },
  rock:     { bg: "#B8A038", text: "#fff" },
  ghost:    { bg: "#705898", text: "#fff" },
  steel:    { bg: "#B8B8D0", text: "#1a1a2e" },
  normal:   { bg: "#A8A878", text: "#fff" },
};

interface Props {
  type: string;
}

export function TypeBadge({ type }: Props) {
  const colors = TYPE_COLORS[type.toLowerCase()] ?? { bg: "#A8A878", text: "#fff" };

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.label, { color: colors.text }]}>
        {type.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginRight: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
