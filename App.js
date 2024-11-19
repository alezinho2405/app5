import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Certifique-se de que você tenha uma tela inicial
import Banheiro from './screens/Banheiro';
import Pia from './screens/Pia';
import Descarga from './screens/Descarga'; // Tela Descargar (Adicionada)
import FinalBanheiro from './screens/FinalBanheiro'; // Tela FinalBanheiro
import Cozinha from './screens/Cozinha'; // Tela Cozinha
import FinalCozinha from './screens/FinalCozinha'; // Tela FinalCozinha
import Lavanderia from './screens/Lavanderia'; // Caminho para a tela Lavanderia
import FinalLavanderia from './screens/FinalLavanderia'; // Tela FinalLavanderia
import AreaExterna from './screens/AreaExterna'; // Caminho para a tela AreaExterna
import FinalAreaExterna from './screens/FinalAreaExterna'; // Tela FinalExterna
import AguaVirtual from './screens/AguaVirtual'; // Tela FinalExterna
import alimentos from './screens/alimentos'; // Tela FinalExterna
import vestuario from './screens/vestuario'; // Tela FinalExterna
import acessorio from './screens/acessorio'; // Tela FinalExterna


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Banheiro" component={Banheiro} />
        <Stack.Screen name="Pia" component={Pia} />
        <Stack.Screen name="Descarga" component={Descarga} />
        <Stack.Screen name="FinalBanheiro" component={FinalBanheiro} />
        <Stack.Screen name="Cozinha" component={Cozinha} />
        <Stack.Screen name="FinalCozinha" component={FinalCozinha} />
        <Stack.Screen name="Lavanderia" component={Lavanderia} />
        <Stack.Screen name="FinalLavanderia" component={FinalLavanderia} />
        <Stack.Screen name="AreaExterna" component={AreaExterna} />
        <Stack.Screen name="FinalAreaExterna" component={FinalAreaExterna} />
        <Stack.Screen name="AguaVirtual" component={AguaVirtual} />
        <Stack.Screen name="alimentos" component={alimentos} />
        <Stack.Screen name="vestuario" component={vestuario} />
        <Stack.Screen name="acessorio" component={acessorio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}