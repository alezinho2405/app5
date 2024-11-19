import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';

const Pia = () => {
  const [usosPia, setUsosPia] = useState(0); // Usos da pia por dia
  const [duracaoUso, setDuracaoUso] = useState(10); // Duração de cada uso (em segundos)
  const navigation = useNavigation(); // Hook para navegação
  const route = useRoute(); // Hook para acessar parâmetros da rota

  // Extraindo banhoValue passado da tela anterior
  const { banhoValue } = route.params; 

  // Consumo por uso
  const litrosPorUso = 5; // Quantidade de água em litros por uso de pia

  // Cálculo do consumo diário e mensal
  const consumoDiario = (litrosPorUso * usosPia).toFixed(2); // Consumo diário em litros
  const consumoMensal = (litrosPorUso * usosPia * 30).toFixed(2); // Consumo mensal em litros

  // Cálculo do custo (SABESP) - Tarifas baseadas no consumo mensal
  const consumoEmM3 = consumoMensal / 1000; // Convertendo litros para metros cúbicos (1m³ = 1000L)

  // Calculando o custo com base nas faixas da SABESP
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
      {/* Título e subtítulo */}
      <Text style={styles.title}>Bem-vindo ao Banheiro!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>

      {/* Card de Consumo Diário */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {consumoDiario !== '0.00' ? `${consumoDiario} L / por Dia` : 'Consumo: 0.00 L / por Dia'}
        </Text>
      </View>

      {/* Slider para ajustes de usos e duração */}
      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Usos da Pia por Dia</Text>
          <Text style={styles.rangeValue}>{usosPia} vezes</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20} // Ajuste conforme necessário
          step={1}
          value={usosPia}
          onValueChange={(value) => setUsosPia(value)}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#2196F3"
        />
      </View>

      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Aberto por uso</Text>
          <Text style={styles.rangeValue}>{duracaoUso} seg</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={60} // 60 segundos = 1 minuto
          step={1}
          value={duracaoUso}
          onValueChange={(value) => setDuracaoUso(value)}
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
          navigation.navigate('Descarga', { banhoValue, usosPia, duracaoUso }) // Passando valores para a tela Descarga
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
    justifyContent: 'flex-start',  // Alterado para garantir que o conteúdo fique no topo
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

export default Pia;
