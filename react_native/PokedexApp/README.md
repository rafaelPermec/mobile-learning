# PokedexApp (React Native)

Aplicativo mobile em React Native que consome a [PokeAPI](https://pokeapi.co/) para listar Pokemons, exibir movimentos de cada Pokemon e detalhar estatisticas de cada golpe.

## Objetivo do Projeto

Entregar um app mobile funcional com navegação em pilha, consumo de API REST e interface amigavel para consulta de dados da franquia Pokemon.

## Tecnologias Utilizadas

- React Native 0.86
- React 19
- TypeScript
- React Navigation (Native Stack)
- PokeAPI (https://pokeapi.co/)

## Funcionalidades Implementadas

1. Listagem de Pokemons com paginacao incremental (scroll infinito).
2. Busca por nome na lista carregada.
3. Exibicao de arte oficial, numero e tipos de cada Pokemon.
4. Navegacao para tela de movimentos do Pokemon selecionado.
5. Exibicao dos movimentos com tipo, categoria (Fisico, Especial, Status) e atributos (Power, Accuracy e PP).
6. Tela de detalhes de movimento com descricao, efeito e barras visuais de estatisticas.

## Fluxo de Navegacao

```text
PokemonList -> MovesList -> MoveDetail
```

- `PokemonList`: lista principal de Pokemons e busca.
- `MovesList`: mostra os movimentos do Pokemon selecionado.
- `MoveDetail`: apresenta detalhes completos de um movimento.

## Estrutura do Projeto

```text
PokedexApp/
├── App.tsx
├── __tests__/
│   └── App.test.tsx
├── android/
├── ios/
├── src/
│   ├── components/
│   │   └── TypeBadge.tsx
│   └── screens/
│       ├── PokemonListScreen.tsx
│       ├── MovesListScreen.tsx
│       └── MoveDetailsScreen.tsx
├── package.json
└── README.md
```

## Como Executar Localmente

### Pre-requisitos

- Node.js >= 22.11.0
- Ambiente React Native configurado (Android Studio e/ou Xcode)
- Java SDK (para Android)
- Ruby + Bundler + CocoaPods (para iOS)

### 1. Instalar dependencias

Com pnpm (recomendado neste projeto):

```bash
pnpm install
```

Alternativa com npm:

```bash
npm install
```

### 2. Iniciar Metro

```bash
pnpm start
```

### 3. Executar no Android

Em outro terminal, com emulador/dispositivo ativo:

```bash
pnpm android
```

### 4. Executar no iOS (macOS)

Instale as dependencias nativas do iOS:

```bash
bundle install
cd ios && bundle exec pod install
```

Depois execute:

```bash
pnpm ios
```

## Scripts Disponiveis

- `pnpm start`: inicia o Metro bundler.
- `pnpm android`: build e execucao no Android.
- `pnpm ios`: build e execucao no iOS.
- `pnpm test`: executa os testes com Jest.
- `pnpm prettier`: formata o codigo com Prettier.

## Fonte de Dados

Este app utiliza exclusivamente dados publicos da PokeAPI:

- Lista de Pokemon: `https://pokeapi.co/api/v2/pokemon`
- Detalhes de Pokemon e movimentos: endpoints retornados pela propria API
