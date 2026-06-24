import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { TypeBadge } from "../components/TypeBadge";

type Props = {
  route: RouteProp<RootStackParamList, "MoveDetail">;
};

const CATEGORY_COLORS: Record<string, string> = {
  physical: "#C92112",
  special:  "#4C6AB8",
  status:   "#8C888C",
};

const CATEGORY_ICONS: Record<string, string> = {
  physical: "⚡",
  special:  "🎯",
  status:   "🛡️",
};

const CATEGORY_LABELS: Record<string, string> = {
  physical: "Físico",
  special:  "Especial",
  status:   "Status",
};

export function MoveDetailScreen({ route }: Props) {
  const { move } = route.params;
  const catKey = move.damage_class.name;
  const catColor = CATEGORY_COLORS[catKey] ?? "#888";
  const catIcon = CATEGORY_ICONS[catKey] ?? "⚡";
  const catLabel = CATEGORY_LABELS[catKey] ?? catKey;

  const description = move.flavor_text_entries
    ?.find((e: { language: { name: string }; flavor_text: string }) => e.language.name === "en")
    ?.flavor_text?.replace(/\n|\f/g, " ") ?? "No description available.";

  const effect = move.effect_entries
    ?.find((e: { language: { name: string }; effect: string }) => e.language.name === "en")
    ?.effect?.replace(/\$effect_chance/g, String(move.effect_chance ?? "")) ?? "No effect data.";

  const stats = [
    { label: "Poder", value: move.power, max: 150, color: "#cc0000" },
    { label: "Precisão", value: move.accuracy, max: 100, color: "#3b4cca" },
    { label: "PP", value: move.pp, max: 40, color: "#e6a817" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 28 }}>{catIcon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.moveName}>{capitalize(move.name.replace(/-/g, " "))}</Text>
          <Text style={styles.moveShortDesc} numberOfLines={2}>{description}</Text>
          <View style={styles.badges}>
            <TypeBadge type={move.type.name} />
            <View style={[styles.catBadge, { backgroundColor: "rgba(255,255,255,0.25)" }]}>
              <Text style={styles.catBadgeText}>{catLabel}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Quick stats */}
        <View style={styles.quickStats}>
          {[
            { label: "Poder",    value: move.power    ?? "—" },
            { label: "Precisão", value: move.accuracy ? `${move.accuracy}%` : "—" },
            { label: "PP",       value: move.pp },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <View style={styles.vDivider} />}
              <View style={styles.quickStat}>
                <Text style={styles.quickStatValue}>{s.value}</Text>
                <Text style={styles.quickStatLabel}>{s.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Stat bars */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Estatísticas</Text>
          {stats.map(({ label, value, max, color }) => (
            <View key={label} style={styles.barRow}>
              <View style={styles.barMeta}>
                <Text style={styles.barLabel}>{label}</Text>
                <Text style={styles.barValue}>{value ?? "—"}</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: value != null ? `${Math.min(100, (value / max) * 100)}%` : "0%",
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📖 Descrição</Text>
          <Text style={styles.cardBody}>{description}</Text>
        </View>

        {/* Effect */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Efeito</Text>
          <Text style={styles.cardBody}>{effect}</Text>
          <View style={styles.metaRow}>
            <View>
              <Text style={styles.metaLabel}>Geração introduzida</Text>
              <Text style={styles.metaValue}>{capitalize(move.generation?.name?.replace(/-/g, " ") ?? "—")}</Text>
            </View>
            <View style={styles.vDivider} />
            <View>
              <Text style={styles.metaLabel}>Tipo de Contest</Text>
              <Text style={styles.metaValue}>{capitalize(move.contest_type?.name ?? "—")}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#cc0000",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    padding: 16,
  },
  iconCircle: {
    width: 64, height: 64,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  moveName: { color: "#fff", fontSize: 22, fontWeight: "800" },
  moveShortDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },
  badges: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 6 },
  catBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  catBadgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  scroll: { padding: 12, gap: 12 },
  quickStats: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStat: { flex: 1, alignItems: "center" },
  quickStatValue: { fontSize: 22, fontWeight: "800", color: "#1a1a2e" },
  quickStatLabel: { fontSize: 11, color: "#aaa", marginTop: 2 },
  vDivider: { width: 1, backgroundColor: "#f0f0f0", marginVertical: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: "800", color: "#1a1a2e" },
  cardBody: { fontSize: 13, color: "#555", lineHeight: 20 },
  barRow: { gap: 6 },
  barMeta: { flexDirection: "row", justifyContent: "space-between" },
  barLabel: { fontSize: 12, color: "#999" },
  barValue: { fontSize: 12, fontWeight: "700", color: "#333" },
  barTrack: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 999 },
  metaRow: { flexDirection: "row", gap: 20, marginTop: 4 },
  metaLabel: { fontSize: 11, color: "#aaa" },
  metaValue: { fontSize: 13, fontWeight: "700", color: "#333", marginTop: 2 },
});
