import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonListScreen } from "./src/screens/PokemonListScreen";
import { MovesListScreen } from "./src/screens/MovesListScreen";
import { MoveDetailScreen } from "./src/screens/MoveDetailsScreen";

// Rotas: pilhas de navegação
export type RootStackParamList = {
  PokemonList: undefined;
  MovesList: { pokemon: any };
  MoveDetail: { move: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerStyle: { backgroundColor: "#cc0000" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "800" },
          headerBackTitle: "Voltar",
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={({ route }) => ({
          title: `Lista de Pokemons`,
          headerShown: true,
        })}
        />
        <Stack.Screen
          name="MovesList"
          component={MovesListScreen}
          options={({ route }) => ({
            title: `Movimentos de ${capitalize((route.params as any).pokemon.name)}`,
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="MoveDetail"
          component={MoveDetailScreen}
          options={({ route }) => ({
            title: capitalize((route.params as any).move.name.replace(/-/g, " ")),
            headerShown: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
