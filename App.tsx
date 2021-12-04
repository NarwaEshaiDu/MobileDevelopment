import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import DetailScreen from "./screens/details.screen";
import HomeScreen from "./screens/home.screen";
import { Camera } from "expo-camera";
import FavouriteScreen from "./screens/favorite.screen";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "red" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Favourites"
                onPress={() => navigation.navigate("Favourites")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Favourites"
                onPress={() => navigation.navigate("Favourites")}
              />
            ),
          })}
        />
        <Stack.Screen name="Favourites" component={FavouriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
