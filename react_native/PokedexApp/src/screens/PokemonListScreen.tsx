import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { TypeBadge } from "../components/TypeBadge";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "PokemonList">;
};

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: Array<{ type: { name: string } }>;
}

export function PokemonListScreen({ navigation }: Props) {
  const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const fetchPokemon = useCallback(async (currentOffset: number, reset = false) => {
    try {
      const listRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${currentOffset}`
      );
      const listData = await listRes.json();

      const details: PokemonDetail[] = await Promise.all(
        listData.results.map((p: PokemonListItem) => fetch(p.url).then(r => r.json()))
      );

      setAllPokemon(prev => reset ? details : [...prev, ...details]);
      setOffset(currentOffset + LIMIT);
    } catch (err) {
      console.error("Erro ao buscar Pokémon:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon(0, true);
  }, [fetchPokemon]);

  const filtered = allPokemon.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    if (loadingMore || loading) return;
    setLoadingMore(true);
    fetchPokemon(offset);
  };

  const renderItem = ({ item }: { item: PokemonDetail }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MovesList", { pokemon: item })}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.sprites.other["official-artwork"].front_default }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{capitalize(item.name)}</Text>
          <Text style={styles.number}>#{String(item.id).padStart(3, "0")}</Text>
        </View>
        <View style={styles.types}>
          {item.types.map(t => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#cc0000" />
        <Text style={styles.loaderText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Pokédex</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            clearButtonMode="while-editing"
          />
        </View>
        <Text style={styles.count}>{filtered.length} Pokémon encontrados</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={search ? undefined : handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color="#cc0000" style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  loaderText: { color: "#888", fontSize: 14 },
  appBar: {
    backgroundColor: "#cc0000",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  appBarTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: "#1a1a2e" },
  count: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 6 },
  list: { padding: 12, gap: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 68,
    height: 68,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sprite: { width: 56, height: 56 },
  info: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  name: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  number: { fontSize: 12, color: "#aaa", fontWeight: "600" },
  types: { flexDirection: "row" },
  chevron: { fontSize: 22, color: "#ccc" },
});
