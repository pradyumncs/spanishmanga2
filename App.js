import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import React from 'react';
//import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';
import Buttons from './screens/Buttons';
import Pdfs from './screens/Pdfs';

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      border: "transparent"
  }
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded] = useFonts({
          "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
          "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
          "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
      })

  if(!loaded){
      return null;
  }
  return (
      <NavigationContainer theme={theme}>
          <Stack.Navigator
              screenOptions={{
                  headerShown: false
              }}
              initialRouteName={'Home'}
          >
              {/* Tabs */}
              <Stack.Screen name="Home" component={Tabs} />

              {/* Screens */}
              <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
              <Stack.Screen name="Buttons" component={Buttons} />
              <Stack.Screen name="Pdfs" component={Pdfs} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;