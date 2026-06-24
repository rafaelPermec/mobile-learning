import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { TypeBadge } from "../components/TypeBadge";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MovesList">;
  route: RouteProp<RootStackParamList, "MovesList">;
};

interface MoveEntry {
  move: { name: string; url: string };
}

interface MoveDetail {
  id: number;
  name: string;
  type: { name: string };
  damage_class: { name: string };
  power: number | null;
  accuracy: number | null;
  pp: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  physical: "#C92112",
  special:  "#4C6AB8",
  status:   "#8C888C",
};

const CATEGORY_LABELS: Record<string, string> = {
  physical: "Físico",
  special:  "Especial",
  status:   "Status",
};

export function MovesListScreen({ navigation, route }: Props) {
  const { pokemon } = route.params;
  const [moves, setMoves] = useState<MoveDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Limit to first 12 moves to avoid too many requests
        const moveEntries: MoveEntry[] = pokemon.moves.slice(0, 12);
        const details = await Promise.all(
          moveEntries.map((m) => fetch(m.move.url).then(r => r.json()))
        );
        setMoves(details);
      } catch (err) {
        console.error("Erro ao buscar movimentos:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pokemon]);

  const renderItem = ({ item }: { item: MoveDetail }) => {
    const catKey = item.damage_class.name;
    const catColor = CATEGORY_COLORS[catKey] ?? "#888";
    const catLabel = CATEGORY_LABELS[catKey] ?? catKey;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("MoveDetail", { move: item })}
        activeOpacity={0.8}
      >
        <View style={styles.cardMain}>
          <View style={styles.badges}>
            <TypeBadge type={item.type.name} />
            <View style={[styles.catBadge, { backgroundColor: `${catColor}22` }]}>
              <Text style={[styles.catLabel, { color: catColor }]}>{catLabel}</Text>
            </View>
          </View>
          <Text style={styles.moveName}>{capitalize(item.name.replace(/-/g, " "))}</Text>
        </View>
        <View style={styles.stats}>
          <Stat label="Power" value={item.power ?? "—"} />
          <Stat label="Acc" value={item.accuracy ? `${item.accuracy}%` : "—"} />
          <Stat label="PP" value={item.pp} />
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.pokemonHero}>
          <View style={styles.heroImage}>
            <Image
              source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
              style={styles.sprite}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.heroNumber}>#{String(pokemon.id).padStart(3, "0")}</Text>
            <Text style={styles.heroName}>{capitalize(pokemon.name)}</Text>
            <View style={styles.types}>
              {pokemon.types.map((t: { type: { name: string } }) => (
                <View key={t.type.name} style={styles.typeChip}>
                  <Text style={styles.typeChipText}>{t.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Quick stats */}
      <View style={styles.quickStats}>
        <QuickStat label="Movimentos" value={moves.length} />
        <View style={styles.divider} />
        <QuickStat label="Ofensivos" value={moves.filter(m => m.damage_class.name !== "status").length} />
        <View style={styles.divider} />
        <QuickStat label="Status" value={moves.filter(m => m.damage_class.name === "status").length} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color="#cc0000" />
          <Text style={styles.loaderText}>Carregando movimentos...</Text>
        </View>
      ) : (
        <FlatList
          data={moves}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function QuickStat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.quickStat}>
      <Text style={styles.quickStatValue}>{value}</Text>
      <Text style={styles.quickStatLabel}>{label}</Text>
    </View>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  loaderText: { color: "#888", fontSize: 13 },
  header: { backgroundColor: "#cc0000", paddingHorizontal: 16, paddingBottom: 16 },
  pokemonHero: { flexDirection: "row", alignItems: "center", gap: 16 },
  heroImage: {
    width: 80, height: 80,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sprite: { width: 68, height: 68 },
  heroNumber: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  heroName: { color: "#fff", fontSize: 24, fontWeight: "800" },
  types: { flexDirection: "row", gap: 6, marginTop: 4 },
  typeChip: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  typeChipText: { color: "#fff", fontSize: 11, fontWeight: "600", textTransform: "capitalize" },
  quickStats: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 10,
  },
  quickStat: { flex: 1, alignItems: "center" },
  quickStatValue: { fontSize: 18, fontWeight: "800", color: "#1a1a2e" },
  quickStatLabel: { fontSize: 11, color: "#aaa", marginTop: 2 },
  divider: { width: 1, backgroundColor: "#f0f0f0" },
  list: { padding: 12, gap: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardMain: { flex: 1 },
  badges: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  catLabel: { fontSize: 10, fontWeight: "700" },
  moveName: { fontSize: 14, fontWeight: "700", color: "#1a1a2e" },
  stats: { flexDirection: "row", gap: 12 },
  stat: { alignItems: "center" },
  statLabel: { fontSize: 10, color: "#bbb" },
  statValue: { fontSize: 12, fontWeight: "700", color: "#333" },
  chevron: { fontSize: 20, color: "#ccc" },
});
