import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { CatModel } from "../interfaces/cat-api.interface";
import AsyncStorage from "@react-native-community/async-storage";

export interface CatViewProps {
  cat: CatModel;
}

const CatView = ({ cat }: CatViewProps) => {
  const navigation: StackNavigationProp<any> = useNavigation();
  const [favorites, setFavorites] = useState<CatModel[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(true);

  const onPress = () => {
    navigation.navigate("Detail", { cat });
  };

  const setAsFavorite = async () => {
    let item = await AsyncStorage.getItem("@favourite");
    let cats: CatModel[] = [];
    if (item) {
      cats = JSON.parse(item);
    }
    if(!(cats.map((x) => x.id).includes(cat.id))){
      cats.push(cat);
    }
    else{
      cats = cats.filter(x => x.id !== cat.id);
    }

    await AsyncStorage.setItem("@favourite", JSON.stringify(cats));

    await loadFavorites();
  };

  const loadFavorites = async () => {
    let item = await AsyncStorage.getItem("@favourite");

    if (item) {
      let cats = JSON.parse(item);
      setFavorites(cats);
      setIsFavourite(await isFavorite());
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const isFavorite = async () => {
    return favorites.map((x) => x.id).includes(cat.id);
  };

  return (
    <View
      style={{
        backgroundColor: isFavourite ? "pink" : "blue",
        padding: 20,
        margin: 4,
        borderWidth: 2,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onLongPress={setAsFavorite}
        delayLongPress={3000}
      >
        <Image style={{ width: 100, height: 100 }} source={{ uri: cat.url }} />
      </TouchableOpacity>
    </View>
  );
};

export default CatView;
