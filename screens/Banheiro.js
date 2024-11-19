import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const Banheiro = ({ navigation }) => {
  const [sliderValue, setSliderValue] = useState(0); // Banhos por dia
  const [usoValue, setUsoValue] = useState(0); // Duração do banho em minutos
  const [consumoSemanalLitros, setConsumoSemanalLitros] = useState(0);
  const [consumoMensalLitros, setConsumoMensalLitros] = useState(0);
  const [custoEstimado, setCustoEstimado] = useState(0);

  const litrosPorMinuto = 8; // Ajustado para 8 litros por minuto conforme a SABESP
  const tarifaSABESP = 6.00; // Valor da tarifa da SABESP por m³ (em R$)

  useEffect(() => {
    // Cálculo do consumo semanal e mensal
    const litrosSemanais = sliderValue * usoValue * litrosPorMinuto; // Consumo semanal em litros
    const litrosMensais = litrosSemanais * 4; // Cálculo mensal (aproximadamente 4 semanas no mês)

    // Cálculo do custo estimado (conversão de litros para m³)
    const metrosCubicosMensais = litrosMensais / 1000; // Convertendo litros para m³
    const custo = metrosCubicosMensais * tarifaSABESP; // Cálculo do custo mensal

    setConsumoSemanalLitros(litrosSemanais);
    setConsumoMensalLitros(litrosMensais);
    setCustoEstimado(custo);
  }, [sliderValue, usoValue]);

  const larguraBarra = (consumoSemanalLitros / 1050) * 100; // Percentual da barra (1050L é o consumo máximo recomendado por semana)

  return (
    <View style={styles.container}>
      {/* Título e subtítulo */}
      <Text style={styles.title}>Bem-vindo ao Banheiro!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>

      {/* Card de Consumo Semanal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>{consumoSemanalLitros.toFixed(2)} L / por Semana</Text>
        
      </View>

      {/* Slider para número de banhos por dia */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Banhos</Text>
          <Text style={styles.rangeValue}>{sliderValue} banhos por dia</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={7} // Máximo de 7 banhos por dia
          step={1}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      {/* Slider para duração do banho */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Duração do banho</Text>
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


      {/* Card de Consumo */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo: {consumoMensalLitros.toFixed(2)} L/mês</Text>
      </View>

      {/* Card de Custo Estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoEstimado.toFixed(2)}</Text>
      </View>

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate('Pia', { banhoValue: sliderValue })} // Passando sliderValue para a tela Pia
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Corrigido para permitir o preenchimento da tela de cima para baixo
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,  // Ajuste para garantir o espaçamento correto
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,  // Ajuste de margem
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
  confirmCard: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 10,
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

export default Banheiro;
