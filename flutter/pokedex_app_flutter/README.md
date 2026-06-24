# pokedex_app_flutter (SPA com mocks - Flutter)

## Descrição

A pasta `lib` contém todo o código-fonte Dart da aplicação Pokédex Flutter. Esta aplicação exibe informações detalhadas sobre movimentos Pokémon através de uma interface visualmente atraente.

## Estrutura de Arquivos

### `main.dart`
Arquivo principal da aplicação que contém:
- **PokedexApp**: Widget raiz da aplicação que configura o tema e a navegação inicial
  - Tema Material com cores personalizadas (vermelho Pokédex #E3350D)
  - AppBar customizada
  - Fundo cinza (#F5F5F5) para melhor contraste
  
- **MoveDetailScreen**: Tela de detalhes de movimentos Pokémon
  - Exibe informações sobre movimentos específicos
  - Implementação mock (sem navegação real)
  - Layout scrollável para acomodar múltiplas informações

## Configuração da Aplicação

### Tema
- **Cor Principal**: `#E3350D` (Vermelho Pokédex)
- **Cor de Fundo**: `#F5F5F5` (Cinza claro)
- **Texto Escuro**: `#333333`
- **Modo Debug**: Desabilitado

### Tipografia
- Ícones e textos em branco na AppBar
- Fontes em peso bold para títulos

## Funcionalidades Atuais

- ✅ Exibição de detalhes de movimentos Pokémon
- ✅ Interface Material Design
- ✅ Layout responsivo com SingleChildScrollView
- ✅ AppBar com botão de voltar (mock)

## Recursos Úteis

- [Flutter Documentation](https://flutter.dev/docs)
- [Material Design](https://material.io)
- [Dart Language](https://dart.dev)
