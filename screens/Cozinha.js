import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const Cozinha = ({ navigation }) => {
  const [CozinhaValue, setCozinhaValue] = useState(0); // Número de lavagens por dia
  const [usoValue, setUsoValue] = useState(0); // Tempo de uso da torneira em minutos por dia

  // Definindo o consumo de água por atividade
  const litrosPorLavagem = 10; // Litros por lavagem de louça
  const litrosPorMinuto = 0.08; // Litros consumidos por minuto de torneira aberta

  // Cálculo do consumo diário baseado nas lavagens de louça e no tempo de uso da torneira
  const consumoDiario = ((CozinhaValue * litrosPorLavagem) + (usoValue * litrosPorMinuto)); // Consumo diário considerando lavagens e tempo de uso

  const consumoMensal = (consumoDiario * 30).toFixed(2); // Consumo mensal multiplicando por 30 dias

  // Cálculo do custo estimado com base na tarifa da SABESP (R$ 6,00 por metro cúbico)
  const tarifaSABESP = 6.00; // Valor da tarifa da SABESP por m³ (em R$)
  const consumoMensalEmCubicos = consumoMensal / 1000; // Convertendo litros para metros cúbicos
  const custoEstimado = (consumoMensalEmCubicos * tarifaSABESP).toFixed(2); // Cálculo do custo estimado

  const handleConfirm = () => {
    // Passando os valores para a próxima tela
    navigation.navigate('FinalCozinha', {
      CozinhaValue,
      usoValue,
      consumoMensal,
      custoEstimado,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Cozinha!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardText}>{consumoDiario.toFixed(2)} L / por Dia</Text> {/* Consumo diário */}
      </View>

      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Lavagem de louça</Text>
          <Text style={styles.rangeValue}>{CozinhaValue} por dia</Text> {/* Exibindo "por dia" */}
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={CozinhaValue}
          onValueChange={(value) => setCozinhaValue(value)}
          minimumTrackTintColor="#00BFFF" // Cor da parte preenchida
          maximumTrackTintColor="#d3d3d3" // Cor da parte não preenchida
          thumbTintColor="#2196F3" // Cor da bolinha
        />
      </View>

      <View style={styles.rangeContainer}>
        <View style={styles.row}>
          <Text style={styles.rangeLabel}>Tempo aberto</Text>
          <Text style={styles.rangeValue}>{usoValue} min</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={120}
          step={1}
          value={usoValue}
          onValueChange={(value) => setUsoValue(value)}
          minimumTrackTintColor="#00BFFF" // Cor da parte preenchida
          maximumTrackTintColor="#d3d3d3" // Cor da parte não preenchida
          thumbTintColor="#2196F3" // Cor da bolinha
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo Mensal: {consumoMensal} L/mês</Text> {/* Consumo mensal */}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoEstimado} </Text> {/* Custo estimado */}
      </View>

      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleConfirm} // Navegando para a tela FinalCozinha
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centraliza o título
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Centraliza o subtítulo
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
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
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
    textAlign: 'center', // Centraliza o texto do card
  },
  rangeContainer: {
    width: '80%',
    marginVertical: 20,
    alignItems: 'center', // Centraliza os componentes do range
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%', // Garante que a linha ocupe toda a largura
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

export default Cozinha;
