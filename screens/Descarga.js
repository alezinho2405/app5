import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';

const Descarga = () => {
  const [descargaValue, setDescargaValue] = useState(0); // Valor de descargas por dia
  const navigation = useNavigation();
  const route = useRoute();

  // Pegando os valores de Pia e Banho do route.params
  const { usosPia, banhoValue } = route.params;

  const litrosPorDescarga = 9; // Volume médio por descarga em litros

  // Cálculo do consumo diário e mensal
  const consumoDiario = (litrosPorDescarga * descargaValue).toFixed(2); // Consumo diário
  const consumoMensal = (consumoDiario * 30).toFixed(2); // Consumo mensal

  // Convertendo consumo para metros cúbicos (1 m³ = 1000 L)
  const consumoEmM3 = consumoMensal / 1000;

  // Calculando o custo com base nas faixas de tarifa da SABESP
  let custoMensal = 0;

  if (consumoEmM3 <= 10) {
    custoMensal = consumoEmM3 * 3.50; // Até 10m³, tarifa de R$ 3,50/m³
  } else if (consumoEmM3 <= 20) {
    custoMensal = consumoEmM3 * 4.50; // De 11 a 20m³, tarifa de R$ 4,50/m³
  } else {
    custoMensal = consumoEmM3 * 5.00; // Acima de 20m³, tarifa de R$ 5,00/m³
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Descarga!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>

      {/* Card de Consumo Diário */}
      <View style={styles.card}>
        <Text style={styles.cardText}>{consumoDiario} L / por Dia</Text>
      </View>

      {/* Slider para ajustar o número de descargas */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Descargas</Text>
          <Text style={styles.rangeValue}>{descargaValue} por Dia</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20} // Ajuste conforme necessário
          step={1}
          value={descargaValue}
          onValueChange={(value) => setDescargaValue(value)}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      {/* Card de Consumo Mensal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo: {consumoMensal} L/mês</Text>
      </View>

      {/* Card de Custo Estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoMensal.toFixed(2)}</Text>
      </View>

     

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => 
          navigation.navigate('FinalBanheiro', { banhoValue, usosPia, descargaValue }) // Passando valores
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
    justifyContent: 'flex-start', // Corrigido para permitir o preenchimento da tela de cima para baixo
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
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

export default Descarga;
