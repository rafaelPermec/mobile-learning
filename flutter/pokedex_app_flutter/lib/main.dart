import 'package:flutter/material.dart';

void main() {
  runApp(const PokedexApp());
}

class PokedexApp extends StatelessWidget {
  const PokedexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pokédex - Detalhes do Movimento',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFF5F5F5),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFFE3350D),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      home: const MoveDetailScreen(),
    );
  }
}

class MoveDetailScreen extends StatelessWidget {
  const MoveDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Thunderbolt', style: TextStyle(fontWeight: FontWeight.bold)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {}, // Mock estático, sem navegação real
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header do Movimento
            const Text(
              'Thunderbolt',
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF333333)),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                _buildBadge('Electric', const Color(0xFFF8D030)),
                const SizedBox(width: 8),
                _buildBadge('Special', const Color(0xFF6890F0)),
              ],
            ),
            const SizedBox(height: 24),

            // Card de Estatísticas
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildStatCol('Power', '90'),
                    _buildStatCol('Accuracy', '100'),
                    _buildStatCol('PP', '15'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Barras de Progresso Visuais
            const Text('Estatísticas', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            _buildStatBar('Poder', 90, 150, Colors.red),
            const SizedBox(height: 12),
            _buildStatBar('Precisão', 100, 100, Colors.blue),
            const SizedBox(height: 12),
            _buildStatBar('PP', 15, 40, Colors.grey),
            const SizedBox(height: 24),

            // Seção de Descrição
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: const Padding(
                padding: EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.description, color: Colors.redAccent, size: 20),
                        SizedBox(width: 8),
                        Text('Descrição', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.redAccent)),
                      ],
                    ),
                    SizedBox(height: 12),
                    Text(
                      'A strong electric blast crashes down on the target. This may also leave the target with paralysis.',
                      style: TextStyle(fontSize: 14, color: Color(0xFF555555), height: 1.5),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Seção de Detalhes Adicionais
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    _buildDetailRow('Prioridade', '0'),
                    const Divider(),
                    _buildDetailRow('Geração', '1'),
                    const Divider(),
                    _buildDetailRow('Alvo', 'Selected-pokemon'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Widgets auxiliares para manter o código limpo
  Widget _buildBadge(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(16)),
      child: Text(text, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildStatCol(String label, String value) {
    return Column(
      children: [
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildStatBar(String label, int value, int max, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 14, color: Colors.grey)),
            Text(value.toString(), style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 6),
        LinearProgressIndicator(
          value: value / max,
          backgroundColor: Colors.grey[300],
          color: color,
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
      ],
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, color: Colors.grey)),
          Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}