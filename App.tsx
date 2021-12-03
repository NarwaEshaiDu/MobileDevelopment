import React, {  } from 'react';
import { createStackNavigator } from '@react-navigation/stack' 
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from "./screens/details.screen";
import HomeScreen from "./screens/home.screen";

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:"red"}, headerTitleStyle:{fontWeight:"bold"}, headerTintColor:"white"
      }}>
        <Stack.Screen name="Home" component={ HomeScreen }></Stack.Screen>
        <Stack.Screen name="Detail" component={ DetailScreen }></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


