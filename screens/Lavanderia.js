import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const Lavanderia = ({ navigation }) => {
  const [lavanderiaValue, setLavanderiaValue] = useState(0);  // Número de lavagens por semana

  // Ajuste para cálculo do consumo semanal e diário:
  const consumoLavagem = lavanderiaValue * 150;  // 150 L por lavagem
  const consumoSemanal = consumoLavagem; // Consumo semanal baseado nas lavagens por semana
  const consumoDiario = (consumoSemanal / 7).toFixed(2); // Consumo diário (dividido por 7)
  const consumoMensal = (consumoLavagem * 4).toFixed(2); // 4 semanas por mês

  // Tarifa SABESP
  const tarifaSABESP = 0.006; // Tarifa por litro (R$ 6,00 por m³ = R$ 0,006 por litro)

  // Cálculo do custo estimado
  const custoEstimado = (consumoMensal * tarifaSABESP).toFixed(2); // Custo mensal estimado em R$

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Lavanderia!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardText}>{consumoDiario} L / por Dia</Text>
      </View>

      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Lavagens por Semana</Text>
          <Text style={styles.rangeValue}>{lavanderiaValue} por semana</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={7}
          step={1}
          value={lavanderiaValue}
          onValueChange={(value) => setLavanderiaValue(value)}
          minimumTrackTintColor="#00BFFF" 
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo: {consumoMensal} L/mês</Text>
      </View>

      {/* Exibindo o custo estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoEstimado}</Text>
      </View>

      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => 
          navigation.navigate('FinalLavanderia', { consumoDiario, consumoMensal, custoEstimado })
        } 
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  rangeContainer: {
    width: '80%',
    marginVertical: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  rangeLabel: {
    fontSize: 16,
  },
  rangeValue: {
    fontSize: 16,
  },
  slider: {
    width: '100%',
  },
  nextButton: {
    padding: 10,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Lavanderia;
