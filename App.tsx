import React, { createContext, useContext, useEffect, useState } from "react";
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
import { PussyContext } from "./interfaces/context.interface";
import { CatModel } from "./interfaces/cat-api.interface";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

export default () => {
  const [ catsState, setCatsState ] = useState<CatModel[]>([]);
  const [ favoriteState, setFavoriteState ] = useState<CatModel[]>([]);

  const loadCats = async()=>{
    try{
      const { data } = await axios.get<CatModel[]>('https://api.thecatapi.com/v1/images/search?limit=100',{
        headers:{
          ["x-api-key"]:"07b9d1ac-e5a5-41b8-a574-05803c333348"
        }
      });

      let catsWithBreeds: CatModel[] = data.filter((cat: CatModel) => cat.breeds.length > 0);

      catsWithBreeds = catsWithBreeds.map(x => ({...x, isFavorite: false}));

      setCatsState(catsWithBreeds);
      // <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={camera} />
      // {image && <Image source={{uri:image}} style={{width:200, height:200}}></Image> }
      // <Button title="Take Picture" onPress={takePicture }></Button>
    } catch{ } 
  };

  const refresh = async (cat: CatModel) => {
      let item = await AsyncStorage.getItem("@favourite");
      let localStorageCats: CatModel[] = [];

      if (item) {
        localStorageCats = JSON.parse(item);
      }

      localStorageCats = [... parseLocalCats(localStorageCats, cat)];
      let catsTotalState = [... parseStateCats(catsState, cat)];

      setCatsState(catsTotalState);
      setFavoriteState(localStorageCats);

      await AsyncStorage.setItem("@favourite", JSON.stringify(localStorageCats));
  }

  const parseLocalCats = (cats: CatModel[], cat: CatModel) => {
    if (!(cats.map((x) => x.id).includes(cat.id))) {
      cat.isFavorite = true;
      cats.push(cat);
    }
    else {
      cat.isFavorite = false;
      cats = cats.filter(x => x.id !== cat.id);
    }
    return cats;
  }

  const parseStateCats = (cats: CatModel[], cat: CatModel) => {
    let pussy = cats.find(x => x.id === cat.id)
    if (pussy) {
      pussy.isFavorite = cat.isFavorite;
    }
    return cats;
  }

  const loadFavorites = async () => {
    let item = await AsyncStorage.getItem("@favourite");

    if (item) {
        let cats = JSON.parse(item);
        setFavoriteState(cats);
    }
  };

  useEffect(()=>{
    (async() =>{
      await loadCats();
      await loadFavorites();
    })();
  },[]);
  
  return (
    <PussyContext.Provider value={{cats: catsState, favorites: favoriteState, refresh: async (cat: CatModel) => { await refresh(cat)}, loading: false}} >
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
    </PussyContext.Provider>
  );
};