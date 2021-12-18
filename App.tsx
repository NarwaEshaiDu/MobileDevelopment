import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "./screens/details.screen";
import HomeScreen from "./screens/home.screen";
import FavouriteScreen from "./screens/favorite.screen";
import { Pressable, StyleSheet, Text } from "react-native";
import { PussyContext } from "./interfaces/context.interface";
import { CatModel } from "./interfaces/cat-api.interface";
import axios from "axios";
import CameraScreen from "./screens/camera.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default () => {
  const [catsState, setCatsState] = useState<CatModel[]>([]);
  const [favoriteState, setFavoriteState] = useState<CatModel[]>([]);
  const loadCats = async () => {
    try {
      const { data } = await axios.get<CatModel[]>(
        "https://api.thecatapi.com/v1/images/search?limit=100",
        {
          headers: {
            ["x-api-key"]: "07b9d1ac-e5a5-41b8-a574-05803c333348"
          }
        }
      );

      let catsWithBreeds: CatModel[] = data.filter((cat: CatModel) => cat.breeds.length > 0);

      catsWithBreeds = catsWithBreeds.map(x => ({ ...x, isFavorite: false }));

      setCatsState(catsWithBreeds);
    } catch {}
  };

  const refresh = async (cat: CatModel, update: boolean = false) => {
    let item = await AsyncStorage.getItem("@favourite");
    let localStorageCats: CatModel[] = [];

    if (item) {
      localStorageCats = JSON.parse(item);
    }

    localStorageCats = [...parseLocalCats(localStorageCats, cat, update)];
    let catsTotalState = [...parseStateCats(catsState, cat, update)];

    setCatsState(catsTotalState);
    setFavoriteState(localStorageCats);

    await AsyncStorage.setItem("@favourite", JSON.stringify(localStorageCats));
  };

  const parseLocalCats = (cats: CatModel[], cat: CatModel, update: boolean) => {
    if (!cats.map(x => x.id).includes(cat.id)) {
      cat.isFavorite = true;
      cats.push(cat);
    } else {
      if (!update) {
        cat.isFavorite = false;
        cats = cats.filter(x => x.id !== cat.id);
      } else {
        let arrayCat = cats.find(x => x.id === cat.id);
        if (arrayCat) {
          arrayCat.soundurl = cat.soundurl;
        }
      }
    }
    return cats;
  };

  const parseStateCats = (cats: CatModel[], cat: CatModel, update: boolean) => {
    let pussy = cats.find(x => x.id === cat.id);
    if (pussy) {
      pussy.isFavorite = cat.isFavorite;

      if (update) {
        pussy.soundurl = cat.soundurl;
      }
    }
    return cats;
  };

  const loadFavorites = async () => {
    let item = await AsyncStorage.getItem("@favourite");

    if (item) {
      let cats = JSON.parse(item);
      setFavoriteState(cats);
    }
  };

  useEffect(() => {
    (async () => {
      await loadCats();
      await loadFavorites();
    })();
  }, []);

  return (
    <PussyContext.Provider
      value={{
        cats: catsState,
        favorites: favoriteState,
        refresh: async (cat: CatModel, update: boolean) => {
          await refresh(cat, update);
        },
        loading: false
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#BC1D1D" },
            headerTitleStyle: {
              fontWeight: "bold",
              textTransform: "uppercase"
            },
            headerTintColor: "white"
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Pressable
                  style={styles.pressableStyle}
                  onPress={() => navigation.navigate("Favourites")}>
                  <Text style={styles.textStyle}>Favorites</Text>
                </Pressable>
              )
            })}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Pressable
                  style={styles.pressableStyle}
                  onPress={() => navigation.navigate("Favourites")}>
                  <Text style={styles.textStyle}>Favorites</Text>
                </Pressable>
              )
            })}
          />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Favourites" component={FavouriteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PussyContext.Provider>
  );
};

const styles = StyleSheet.create({
  pressableStyle: {
    backgroundColor: "#BC1D1D",
    marginRight: 10
  },
  textStyle: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "700",
    color: "white"
    // fontFamily: "Roboto"
  }
});
