import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button,Image } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack' 
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { CatModel } from "./interfaces/cat-api.interface";
import { CatViewProps } from "./interfaces/props.interfaces";
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


