import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

const CRYPTO_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
  { symbol: 'SOL', name: 'Solana', color: '#9945FF' },
];

const WIDGET_STYLES = [
  { id: 1, name: 'Minimal', bg: '#1a1a2e', text: '#ffffff' },
  { id: 2, name: 'Card', bg: '#16213e', text: '#e94560' },
  { id: 3, name: 'Glass', bg: 'rgba(255,255,255,0.1)', text: '#00ff88' },
];

export default function App() {
  const [prices, setPrices] = useState({ BTC: 71146, ETH: 2202, SOL: 142 });
  const [refreshing, setRefreshing] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(WIDGET_STYLES[0]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPrices({ BTC: 71146 + Math.random() * 1000, ETH: 2202 + Math.random() * 100, SOL: 142 + Math.random() * 10 });
      setRefreshing(false);
    }, 1000);
  };

  const formatPrice = (price) => `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={[styles.container, { backgroundColor: selectedWidget.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00ff88" />}>
        
        <Text style={styles.title}>📊 Crypto Widget</Text>
        
        {/* Crypto List */}
        {CRYPTO_DATA.map((crypto) => (
          <View key={crypto.symbol} style={[styles.cryptoCard, { borderColor: crypto.color }]}>
            <View style={styles.cryptoLeft}>
              <Text style={[styles.cryptoSymbol, { color: crypto.color }]}>{crypto.symbol}</Text>
              <Text style={styles.cryptoName}>{crypto.name}</Text>
            </View>
            <Text style={[styles.cryptoPrice, { color: selectedWidget.text }]}>
              {formatPrice(prices[crypto.symbol])}
            </Text>
          </View>
        ))}

        {/* Widget Style Selector */}
        <Text style={styles.sectionTitle}>🎨 Widget Style</Text>
        <View style={styles.widgetSelector}>
          {WIDGET_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[styles.widgetOption, selectedWidget.id === style.id && styles.widgetOptionSelected]}
              onPress={() => setSelectedWidget(style)}
            >
              <Text style={styles.widgetOptionText}>{style.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meta Input */}
        <View style={styles.metaSection}>
          <Text style={styles.sectionTitle}>🎯 Tu Meta</Text>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Meta financiera</Text>
            <Text style={styles.metaValue}>$10,000</Text>
            <Text style={styles.metaLabel}>Fecha objetivo</Text>
            <Text style={styles.metaValue}>Dic 31, 2026</Text>
            <View style={styles.divider} />
            <Text style={styles.kpiLabel}>Necesitas ganar:</Text>
            <Text style={styles.kpiValue}>$27.40 / día</Text>
          </View>
        </View>

        <StatusBar style="light" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#888', marginTop: 30, marginBottom: 15 },
  cryptoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1 },
  cryptoLeft: { flex: 1 },
  cryptoSymbol: { fontSize: 24, fontWeight: 'bold' },
  cryptoName: { fontSize: 14, color: '#888', marginTop: 4 },
  cryptoPrice: { fontSize: 22, fontWeight: '700' },
  widgetSelector: { flexDirection: 'row', gap: 10 },
  widgetOption: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center' },
  widgetOptionSelected: { backgroundColor: '#00ff88' },
  widgetOptionText: { color: '#fff', fontWeight: '600' },
  metaSection: { marginTop: 20 },
  metaCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24 },
  metaLabel: { fontSize: 14, color: '#888' },
  metaValue: { fontSize: 32, fontWeight: 'bold', color: '#00ff88', marginBottom: 16 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
  kpiLabel: { fontSize: 14, color: '#888' },
  kpiValue: { fontSize: 24, fontWeight: '700', color: '#e94560', marginTop: 4 },
});
