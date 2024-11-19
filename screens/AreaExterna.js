import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const AreaExterna = ({ navigation }) => {
  const [areaExternaValue, setAreaExternaValue] = useState(0); // Número de vezes por semana
  const [usoValue, setUsoValue] = useState(0); // Tempo de uso por vez (em minutos)

  const tarifaSABESP = 6.00; // Valor da tarifa da SABESP por m³ (em R$)
  const litrosPorMinuto = 10; // Vamos considerar 10L por minuto de uso (valor hipotético)

  const [consumoMensal, setConsumoMensal] = useState(0.00);
  const [custoEstimado, setCustoEstimado] = useState(0.00);

  useEffect(() => {
    // Calcular o consumo mensal em litros
    const consumoSemanal = areaExternaValue * usoValue * litrosPorMinuto; // Consumo semanal em litros
    const consumoMensal = consumoSemanal * 4; // Aproximadamente 4 semanas por mês
    setConsumoMensal(consumoMensal);

    // Calcular o custo estimado
    const metrosCubicosMensais = consumoMensal / 1000; // Convertendo litros para m³
    const custo = metrosCubicosMensais * tarifaSABESP; // Cálculo do custo mensal
    setCustoEstimado(custo);
  }, [areaExternaValue, usoValue]);

  // Cálculo do consumo diário (consumo mensal dividido por 30 dias)
  const consumoDiario = (consumoMensal / 30).toFixed(2); // Aproximadamente 30 dias em um mês

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Área Externa!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>

      {/* Card de Consumo Diário */}
      <View style={styles.card}>
        <Text style={styles.cardText}>{consumoDiario} L / por Dia</Text>
      </View>

      {/* Slider para Área Externa */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Área Externa</Text>
          <Text style={styles.rangeValue}>{areaExternaValue} por semana</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={areaExternaValue}
          onValueChange={(value) => setAreaExternaValue(value)}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      {/* Slider para Tempo de Uso por vez */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Aberto por uso</Text>
          <Text style={styles.rangeValue}>{usoValue} min</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={120}
          step={1}
          value={usoValue}
          onValueChange={(value) => setUsoValue(value)}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      {/* Card de Consumo Mensal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo: {consumoMensal.toFixed(2)} L/mês</Text>
      </View>

      {/* Card de Custo Estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoEstimado.toFixed(2)}</Text>
      </View>

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => 
          navigation.navigate('FinalAreaExterna', {
            consumoMensal: consumoMensal, // Passando consumoMensal
            custoEstimado: custoEstimado, // Passando custoEstimado
          })
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
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

export default AreaExterna;
